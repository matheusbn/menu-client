import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Switch, Route } from "router"
import history from 'router/history'
import { Slide } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import importFirebase from 'services/firebase'
import Toast from 'components/Toast'
import PhoneStep from "./PhoneStep"
import VerificationCodeStep from "./VerificationCodeStep"

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
  const [confirmationResult, setConfirmationResult] = useState(null)
  const [phoneError, setPhoneError] = useState(false)
  const phoneE164 = useRef(null) // it's a ref to avoid a stale closures in the mount only setEffect
  const recaptchaVerifier = useRef(null)
  const toast = useRef(null)

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
      .then(confirmationResult => {
        setLoading(false)
        console.log("code sent")

        setConfirmationResult(confirmationResult)
      })
      .catch(error => console.error("error on signing in:", error))
    // display error

      history.push("/auth/code")
  }

  const handleCodeSubmit = (e) => {
    try {
      e.preventDefault()

      confirmationResult.confirm(verificationCode).then(result => {
        toast.current.show()
        console.log("LOGOU CARALHOO", result)
      })
        .catch(error => console.error("error on confirm", error))
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
          <Slide direction="left" in={true} mountOnEnter unmountOnExit>
            <VerificationCodeStep
              verificationCode={verificationCode}
              setVerificationCode={setVerificationCode}
              phone={phoneE164.current}
              onUnmount={resetRecaptcha}
              onSubmit={handleCodeSubmit}
            />
          </Slide>
        </Route>
      </Switch>

      <Toast message="Succesfully signed in!" ref={toast} />
    </section>
  );
}

export default Auth;
