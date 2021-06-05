import React, { useEffect, useRef, useState } from "react"
import Webcam from 'react-webcam';
import mergeImages from 'merge-images';
import { useMediaQuery } from "react-responsive"

import { useFormatMessages } from "../../../utils/hooks"

import Button from "../../../components/Button"

import * as S from "./styled"

const videoConstraints = { facingMode: 'environment' };

const MakePhoto: React.FC = ({ getProofOfDogQR }) => {
  const refDownload = useRef(null);
  const exampleRef = useRef(null)
  const webcamRef = useRef(null)
  const [camera, setCamera] = useState(false)
  const [proofOfDog, setProofOfDog] = useState(null)

  const [
    makePhotoText,
    useCameraText,
  ] = useFormatMessages([
    { id: "MAKE_PHOTO" },
    { id: "USE_CAMERA" },
  ])

  const enableCamera = () => setCamera(true)

  const makePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot()

    mergeImages([ imageSrc, proofOfDog ])
      .then(b64 => {
        refDownload.current.href = b64
        refDownload.current.click()
      })
  }

  useEffect(() => {
    if ( getProofOfDogQR ) {
      const resizedCanvas = document.createElement('canvas')
      const resizedContext = resizedCanvas.getContext('2d')

      resizedCanvas.height = 150
      resizedCanvas.width = 150
      resizedContext.drawImage(getProofOfDogQR(), 0, 0, 150, 150)

      setProofOfDog(resizedCanvas.toDataURL())
    }
  })

  return (
    <S.Wrapper>
      <S.Container>
        {!camera
          ? (<img alt="KYD Example" ref={exampleRef} src="/images/kyd-example2.jpg" />)
          : (
            <S.WebcamWrapper>
              <Webcam
                audio={false}
                height={525}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
              />
              {proofOfDog && (<S.ProofOfDog alt="Proof of Doge" src={proofOfDog} />)}
            </S.WebcamWrapper>
          )
        }
      </S.Container>

      {getProofOfDogQR && (
        <S.ButtonWrapper>
          {!camera && (
            <Button backgroundColor="primary" onClick={enableCamera} text={useCameraText} />
          )}
          {!!camera && (
            <Button backgroundColor="primary" onClick={makePhoto} text={makePhotoText} />
          )}
        </S.ButtonWrapper>
      )}

      <a download="proofofdog-photo.jpeg" ref={refDownload} />
    </S.Wrapper>
  )
}

export default MakePhoto
