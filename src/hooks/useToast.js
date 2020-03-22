import { useContext } from "react";
import ToastContext from 'src/toast-context'

export default () => {
  const toastRef = useContext(ToastContext)
  const toast = toastRef.current

  if (toast === null) return

  return (message, props) => {
    toast.props.message = message

    toast.show()
  }
};
