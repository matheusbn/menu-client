class History {
  constructor() {
    console.log('History constructed')
    this.locationChangeEvent = new CustomEvent("locationchange")
    window.addEventListener('popstate',
      () => window.dispatchEvent(this.locationChangeEvent)
    )
  }

  push(url) {
    window.history.pushState({}, "", url)

    window.dispatchEvent(this.locationChangeEvent)
  }

  replace(url) {
    window.history.replaceState({}, "", url)

    window.dispatchEvent(this.locationChangeEvent)
  }

  back() {
    window.history.back()
  }

  forward() {
    window.history.forward()
  }

  get location () {
    return window.location.pathname
  }

  get length() {
    return window.length
  }
}

const history = new History()
export default history
