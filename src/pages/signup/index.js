import React, { useState, useEffect, useRef } from 'react';
import { Slide } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
});

const isPhoneValid = (phone) => /\+\d{14}/i.test(phone)

function Signup() {
  const classes = useStyles()
  const [phone, setPhone] = useState("+55048991321617")
  const [loading, setLoading] = useState(false)
  const [verificationCode, setVerificationCode] = useState(null)
  const [confirmationResult, setConfirmationResult] = useState(null)
  const recaptchaVerifier = useRef(null)
  const toast = useRef(null)


  const sentVerificationCode = (firebase) => {
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

  const handleCodeSubmit = (e) => {
    e.preventDefault()

    confirmationResult.confirm(verificationCode).then(result => {
      toast.current.show()
      console.log("LOGOU CARALHOO", result)
    })
      .catch(error => console.error("error on confirm", error))
  }

  useEffect(() => {
    importFirebase().then(firebase => {
      recaptchaVerifier.current = new firebase.auth.RecaptchaVerifier('sign-in-button', {
        size: 'invisible',
        callback: (response) => {
          console.log("captcha verified", response)
          sentVerificationCode(firebase)
        }
      })

      recaptchaVerifier.current.render()
        .catch(error => console.error("error rendering recaptcha", error))
    })
  }, [])

  return (
    <section className={classes.root}>
      {confirmationResult ? (
        <Slide direction="left" in={confirmationResult} mountOnEnter unmountOnExit>
          <VerificationCodeStep
            verificationCode={verificationCode}
            setVerificationCode={setVerificationCode}
            onSubmit={handleCodeSubmit}
          />
        </Slide>
      ) : (
        <PhoneStep
          phone={phone}
          setPhone={setPhone}
          loading={loading}
          setLoading={setLoading}
        />
      )}

      <Toast message="Succesfully signed in!" ref={toast} />
    </section>
  );
}

export default Signup;
