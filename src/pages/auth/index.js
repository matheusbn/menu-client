import React, { useState, useEffect, useRef } from 'react'
import { Switch, history, Route, SlideRoute } from "router"
import { makeStyles } from '@material-ui/core/styles'
import importFirebase from 'services/firebase'
import PhoneStep from "./PhoneStep"
import VerificationCodeStep from "./VerificationCodeStep"
import useToast from 'hooks/useToast'

const useStyles = makeStyles({
  root: {
    "--width": "400px",
    height: "90vh",
    width: "100%",
    maxWidth: "var(--width)",
    margin: "0 auto",
    padding: "0 15px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",

    '& form': {
      position: 'relative',
      height: "80%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
    },

    '& input': {
      width: "100%",
    },

    '& .phone-input': {
      position: "absolute",
      top: "40%",
    },

    '& .submit-button': {
      paddingLeft: "35px",
      paddingRight: "35px",
    },
  }
})

const isPhoneValid = (phone) => /\+\d{14}/i.test(phone)

function Auth() {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [verificationCode, setVerificationCode] = useState(null)
  const confirmationResult = useRef(null)
  const [phoneError, setPhoneError] = useState(false)
  const [codeError, setCodeError] = useState(false)
  const phoneE164 = useRef(null) // it's a ref to avoid a stale closures in the mount only setEffect
  const recaptchaVerifier = useRef(null)
  const showToast = useToast()

  const setPhone = (phone) => {
    phoneE164.current = phone
  }

  const sendVerificationCode = (firebase) => {
    console.log("PHONE: ", phoneE164.current)
    if (!isPhoneValid(phoneE164.current)) {
      setLoading(false)
      setPhoneError(true)
      return
    }

    firebase.auth().signInWithPhoneNumber(phoneE164.current, recaptchaVerifier.current)
      .then(result => {
        setLoading(false)
        console.log("code sent")

        confirmationResult.current = result
      })
        .catch(error => console.error("Error on code send", error))
      // display error
      console.log('pushing auth/code')
      history.push("/auth/code")
  }

  const handleCodeSubmit = (e) => {
    try {
      e.preventDefault()

      confirmationResult.current.confirm(verificationCode).then(result => {
        showToast("Succesfully signed in!", { severity: "success" })
        history.push("/")
      })
        .catch(error => {
          console.error("Error on confirm", error)
          setCodeError(true)
        })
    }
    catch (e) {
      console.error(e)
    }
  }

  const initRecaptcha = () => {
      importFirebase().then(firebase => {
        recaptchaVerifier.current = new firebase.auth.RecaptchaVerifier('sign-in-button', {
          size: 'invisible',
          callback: (recaptchaToken) => {
            console.log("captcha verified")
            sendVerificationCode(firebase)
          }
        })

        recaptchaVerifier.current.render()
          .catch(error => console.error("error rendering recaptcha", error))
      })
  }

  const resetRecaptcha = () => {
    initRecaptcha()
    setLoading(false)
  }

  useEffect(() => {
    initRecaptcha()
  }, [])

  return (
    <section className={classes.root}>
      <Switch>
        <Route exact path="/auth">
          <PhoneStep
            setPhone={setPhone}
            loading={loading}
            setLoading={setLoading}
            error={phoneError}
          />
        </Route>
        <Route path="/auth/code">
          <VerificationCodeStep
            verificationCode={verificationCode}
            setVerificationCode={setVerificationCode}
            phone={phoneE164.current}
            onUnmount={resetRecaptcha}
            onSubmit={handleCodeSubmit}
            error={codeError}
          />
        </Route>
      </Switch>
    </section>
  );
}

export default Auth;
