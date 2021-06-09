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
  const [state, setState] = useState({
    cameraEnabled: false,
    loading: false,
    proofOfDog: null,
    sizes: {
      videoHeight: null,
      videoWidth: null,
      windowHeight: null,
      windowWidth: null,
    }
  })
  const { cameraEnabled, loading, proofOfDog, sizes } = state

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
          loading,
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
      loading,
      proofOfDog,
      sizes: {
        ...sizes,
        windowHeight: refVideo.current.clientHeight,
      }
    })
  }

  const handleMakePhoto = () => {
    setState({ ...state, loading: true })

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
    canvas.toBlob(() => setState({ ...state, loading: false }))
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
            <Button backgroundColor="primary" onClick={handleEnableCamera} text="Use Camera" />
          )}
          {cameraEnabled && (
            <Button
              backgroundColor="primary"
              loading={loading}
              onClick={handleMakePhoto}
              text="Make Photo"
            />
          )}
        </S.ButtonWrapper>
      )}
      <a download="proofofdog-photo.jpeg" ref={refDownload} />
    </div>
  )
}

export default MakePhoto
