export default (button) => {
  window.btn = button
  let deferredInstallPrompt = null
  button.addEventListener('click', installPWA)

  window.addEventListener('beforeinstallprompt', (e) => {
    deferredInstallPrompt = e
    button.style.display = 'block'
  })

  function installPWA(e) {
    deferredInstallPrompt.prompt()
    button.style.display = 'none'

    deferredInstallPrompt.userChoice.then(choice => {
      console.log("User choice:", choice.outcome)

      deferredInstallPrompt = null
    })
  }

  window.addEventListener('appinstalled', (e) => {
    console.log('The app was successfully installed', e)
  })
}
