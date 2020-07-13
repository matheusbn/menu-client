class PwaInstaller {
  deferredInstallPrompt
  handlerInstaller = false
  private _button

  captureInstallEvent() {
    window.addEventListener('beforeinstallprompt', e => {
      console.log('%c beforeinstallprompt event fired', 'color: #bd8e00')
      this.deferredInstallPrompt = e

      if (this._button) {
        this.addInstallHandler()
      }
    })
  }

  set button(button) {
    this._button = button //document.querySelector(`#${buttonId}`)

    if (this.deferredInstallPrompt) {
      this.addInstallHandler()
    }
  }

  private addInstallHandler() {
    const btn = this._button

    btn.style.display = 'flex'

    const installPWA = () => {
      this.deferredInstallPrompt.prompt()
      btn.style.display = 'none'

      this.deferredInstallPrompt.userChoice.then(choice => {
        console.log('User choice:', choice.outcome)

        this.deferredInstallPrompt = null
      })
    }

    btn.addEventListener('click', installPWA)
    this.handlerInstaller = true

    window.addEventListener('appinstalled', e => {
      console.log('The app was successfully installed', e)
    })
  }
}

export default new PwaInstaller()
