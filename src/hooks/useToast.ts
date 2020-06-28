import { useContext } from 'react'
import ToastContext from 'contexts/toast'

export default () => {
  const toastRef = useContext(ToastContext)
  const toast = toastRef.current

  if (toast === null) return

  return (message, options = {}) => {
    toast.props.message = message

    // map options to props
    Object.entries(options).forEach(
      ([key, value]) => (toast.props[key] = value)
    )

    toast.show()
  }
}
