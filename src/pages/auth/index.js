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
      height: "80%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
    },

    '& input': {
      width: "100%"
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
  const [phone, setPhone] = useState(null)
  const [loading, setLoading] = useState(false)
  const [verificationCode, setVerificationCode] = useState(null)
  const [confirmationResult, setConfirmationResult] = useState(null)
  const [phoneError, setPhoneError] = useState(false)
  const recaptchaVerifier = useRef(null)
  const toast = useRef(null)


  useEffect(() => {
    console.log(phone)
  }, [phone])

  const sendVerificationCode = (firebase) => {
    console.log("PHONE: ", phone)
    if (!isPhoneValid(phone)) {
      console.log(phone)
      setLoading(false)
      setPhoneError(true)
      return
    }

    history.push("/auth/code")

    try {
      firebase.auth().signInWithPhoneNumber(phone, recaptchaVerifier.current)
        .then(confirmationResult => {
          setLoading(false)
          console.log("code sent")

          setConfirmationResult(confirmationResult)
        })
        .catch(error => console.error("error on signing in:", error))
      // display error
    }
    catch (e) {
      console.error(e)
    }
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
    try {
      importFirebase().then(firebase => {
        recaptchaVerifier.current = new firebase.auth.RecaptchaVerifier('sign-in-button', {
          size: 'invisible',
          callback: useCallback((recaptchaToken) => {
            console.log("captcha verified")

            sendVerificationCode(firebase)
          }, [phone])
        })

        recaptchaVerifier.current.render()
          .catch(error => console.error("error rendering recaptcha", error))
      })
    }
    catch (e) {
      console.error(e)
    }
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
              phone={phone}
              onUnmount={initRecaptcha}
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
