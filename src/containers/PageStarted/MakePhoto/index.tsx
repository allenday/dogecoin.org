import React, { useRef, useState } from "react"
import { useFormatMessages } from "../../../utils/hooks"

import Button from "../../../components/Button"

import * as S from "./styled"

const videoConstraints = {
  audio: false,
  video: {
    facingMode: 'environment',
    height: { ideal: 2024 },
    width: { ideal: 2024 },
  },
}

const MakePhoto: React.FC = ({ getProofOfDogQR }) => {
  const refDownload = useRef(null)
  const refVideo = useRef(null)
  const refWrapper = useRef(null)
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState({
    cameraEnabled: false,
    proofOfDog: null,
    sizes: {
      videoHeight: null,
      videoWidth: null,
      windowHeight: null,
      windowWidth: null,
    }
  })
  const { cameraEnabled, proofOfDog, sizes } = state

  const [
    makePhotoText,
    useCameraText,
  ] = useFormatMessages([
    { id: "MAKE_PHOTO" },
    { id: "USE_CAMERA" },
  ])

  const handleEnableCamera = () => {
    const canvas = getProofOfDogQR()
    const resizedCanvas = document.createElement('canvas')
    const resizedContext = resizedCanvas.getContext('2d')
    const windowWidth = window.innerWidth

    resizedCanvas.height = 75
    resizedCanvas.width = 61
    resizedContext.drawImage(canvas, 0, 0, 61, 75)

    navigator.mediaDevices.getUserMedia(videoConstraints)
      .then(stream => {
        const { height, width } = stream.getVideoTracks()[0].getSettings()

        setState({
          cameraEnabled: true,
          proofOfDog: {
            canvas,
            resized: resizedCanvas.toDataURL('image/jpeg', 1.0),
          },
          sizes: {
            videoHeight: height,
            videoWidth: width,
            windowHeight: null,
            windowWidth: windowWidth - Math.floor(windowWidth * 0.1),
          },
        })

        refVideo.current.srcObject = stream
      })
  }

  const handleLoadedData = () => {
    setState({
      cameraEnabled,
      proofOfDog,
      sizes: {
        ...sizes,
        windowHeight: refVideo.current.clientHeight,
      }
    })
  }

  const handleMakePhoto = () => {
    setLoading(true)

    // With hight load, need to update state and after download photo
    setTimeout(() => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      canvas.height = sizes.videoHeight
      canvas.width = sizes.videoWidth
      ctx.drawImage(refVideo.current, 0, 0)
      ctx.drawImage(
        proofOfDog.canvas,
        sizes.videoWidth - proofOfDog.canvas.clientWidth,
        sizes.videoHeight - proofOfDog.canvas.clientHeight,
      )

      refDownload.current.href = canvas.toDataURL()
      refDownload.current.click()

      // We can't catch event when file is loaded, so read the file and then disable loading
      canvas.toBlob(() => setLoading(false))
    }, 500);
  }

  return (
    <div>
      {!cameraEnabled
        ? (
            <S.ExampleWrapper>
              <img alt="KYD Example" src="/images/kyd-example2.jpg" />
            </S.ExampleWrapper>
          )
        : (
          <S.VideoWrapper ref={refWrapper} width={sizes.windowWidth}>
            {sizes.windowWidth && (
              <video
                autoPlay
                playsInline
                ref={refVideo}
                onLoadedData={handleLoadedData}
              />
            )}
            {proofOfDog && !!sizes.windowHeight && (
              <S.ProofOfDog src={proofOfDog.resized} top={sizes.windowHeight - 75} />
            )}
          </S.VideoWrapper>
        )
      }
      {getProofOfDogQR && (
        <S.ButtonWrapper>
          {!cameraEnabled && (
            <Button backgroundColor="primary" onClick={handleEnableCamera} text={useCameraText} />
          )}
          {cameraEnabled && (
            <Button
              backgroundColor="primary"
              loading={loading}
              onClick={handleMakePhoto}
              text={makePhotoText}
            />
          )}
        </S.ButtonWrapper>
      )}
      <a download="proofofdog-photo.jpeg" ref={refDownload} />
    </div>
  )
}

export default MakePhoto
