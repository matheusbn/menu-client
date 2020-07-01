import { useEffect } from 'react'
import isFunction from 'lodash/isFunction'
import jsQR from 'jsqr-es6'
// import QrScanner from '../../node_modules/qr-scanner/qr-scanner-worker.min.js'

export default function useQRScannerEffect(videoRef, handler, deps = []) {
  useEffect(() => {
    if (!videoRef.current) return

    const video = videoRef.current
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    let intervalID
    const canPlayHandler = () => {
      try {
        intervalID = setInterval(() => {
          if (video.readyState === video.HAVE_ENOUGH_DATA) {
            const width = video.videoWidth
            const height = video.videoHeight

            canvas.width = width
            canvas.height = height

            ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
            const imageData = ctx.getImageData(
              0,
              0,
              canvas.width,
              canvas.height
            )
            const code = jsQR(imageData.data, imageData.width, imageData.height)

            if (isFunction(handler)) handler(code?.data)
          }
        }, 200)
      } catch (error) {
        console.error('Error interpreting QR Code:', error)
      }
    }

    video.addEventListener('canplay', canPlayHandler)
    return () => {
      video.removeEventListener('canplay', canPlayHandler)
      clearInterval(intervalID)
    }
  }, [videoRef, handler, ...deps])
}
