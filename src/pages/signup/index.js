import React, { useState, useEffect, useRef } from 'react'
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
    height: "80vh",
    width: "100%",
    maxWidth: "var(--width)",
    margin: "0 auto",
    padding: "0 15px",
    overflow: "hidden",

    '& form': {
      height: "50%",
      marginTop: "60%",
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

function Signup() {
  const classes = useStyles()
  const [phone, setPhone] = useState("+55048991321617")
  const [loading, setLoading] = useState(false)
  const [verificationCode, setVerificationCode] = useState(null)
  const [confirmationResult, setConfirmationResult] = useState(null)
  const recaptchaVerifier = useRef(null)
  const toast = useRef(null)


  const sendVerificationCode = (firebase) => {
    try {
      if (isPhoneValid(phone)) {
        firebase.auth().signInWithPhoneNumber(phone, recaptchaVerifier.current)
          .then(confirmationResult => {
            setLoading(false)
            console.log("code sent")

            setConfirmationResult(confirmationResult)
          })
          .catch(error => console.error("error on signing in:", error))

          return
      }
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
          callback: (recaptchaToken) => {
            console.log("captcha verified")

            sendVerificationCode(firebase)
            history.push("/signup/code")
          }
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
        <Route exact path="/signup">
          <PhoneStep
            setPhone={setPhone}
            loading={loading}
            setLoading={setLoading}
          />
        </Route>
        <Route path="/signup/code">
          <Slide direction="left" in={true} mountOnEnter unmountOnExit>
            <VerificationCodeStep
              verificationCode={verificationCode}
              setVerificationCode={setVerificationCode}
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

export default Signup;
