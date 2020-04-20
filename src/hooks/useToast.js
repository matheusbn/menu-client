import { useContext } from 'react'
import ToastContext from 'contexts/toast'

export default () => {
  const toastRef = useContext(ToastContext)
  const toast = toastRef.current

  if (toast === null) return

  return (message, options) => {
    toast.props.message = message
    // map options to props
    Object.keys(options).forEach(key => (toast.props[key] = options[key]))

    console.log(toast.props)

    toast.show()
  }
}
