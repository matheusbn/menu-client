import React, { useState, useEffect, useRef } from 'react'
import { Switch, history, Route, SlideRoute } from 'router'
import { makeStyles } from '@material-ui/core/styles'
import importFirebase from 'services/firebase'
import PhoneStep from './PhoneStep'
import VerificationCodeStep from './VerificationCodeStep'

const useStyles = makeStyles({
  root: {
    '--width': '400px',
    height: '90vh',
    width: '100%',
    maxWidth: 'var(--width)',
    margin: '0 auto',
    padding: '0 15px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',

    '& form': {
      position: 'relative',
      height: '80%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    '& title': {
      fontWeight: 300,
    },

    '& input': {
      width: '100%',
    },

    '& .instructions': {
      position: 'absolute',
      top: '25%',
    },
    '& .phone-input': {
      position: 'absolute',
      top: '60%',
    },

    '& .submit-button': {
      paddingLeft: '35px',
      paddingRight: '35px',
      position: 'absolute',
      top: '90%',
    },
  },
})

const isPhoneValid = phone => /^\+\d{14}$/i.test(phone)

function Auth() {
  const classes = useStyles()
  const [verificationStepLoading, setVerificationStepLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [verificationCode, setVerificationCode] = useState(null)
  const confirmationResult = useRef(null)
  const [phoneError, setPhoneError] = useState(false)
  const [codeError, setCodeError] = useState(false)
  const phoneE164 = useRef(null) // it's a ref to avoid a stale closures in the mount only setEffect
  const recaptchaVerifier = useRef(null)

  const setPhone = phone => (phoneE164.current = phone)

  const sendVerificationCode = () => {
    if (!isPhoneValid(phoneE164.current)) {
      recaptchaVerifier.current.reset()
      setLoading(false)
      setPhoneError(true)
      return
    }

    setLoading(false)
    importFirebase().then(firebase => {
      firebase
        .auth()
        .signInWithPhoneNumber(phoneE164.current, recaptchaVerifier.current)
        .then(result => (confirmationResult.current = result))
        .catch(error => console.error('Error on code send', error))
      // display error
      history.push('/auth/code')
    })
  }

  const handleCodeSubmit = e => {
    e.preventDefault()

    setVerificationStepLoading(true)
    confirmationResult.current
      .confirm(verificationCode)
      .then(async result => {
        // a logica de roteamento ta no App.js
      })
      .catch(error => {
        console.error('Error on confirm', error)
        setCodeError(true)
        setVerificationStepLoading(false)
      })
  }

  const initRecaptcha = () => {
    importFirebase().then(firebase => {
      recaptchaVerifier.current = new firebase.auth.RecaptchaVerifier(
        'sign-in-button',
        {
          size: 'invisible',
          callback: recaptchaToken => {
            console.log('captcha verified')
            sendVerificationCode()
          },
        }
      )

      recaptchaVerifier.current
        .render()
        .catch(error => console.error('error rendering recaptcha', error))
    })
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
            onSubmit={sendVerificationCode}
          />
        </Route>
        <Route path="/auth/code">
          <VerificationCodeStep
            verificationCode={verificationCode}
            setVerificationCode={setVerificationCode}
            phone={phoneE164.current}
            onUnmount={initRecaptcha}
            onSubmit={handleCodeSubmit}
            error={codeError}
            loading={verificationStepLoading}
          />
        </Route>
      </Switch>
    </section>
  )
}

export default Auth
