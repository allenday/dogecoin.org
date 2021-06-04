import React, { useEffect, useRef } from "react"
import html2canvas from "html2canvas"
import { Row } from "react-styled-flexboxgrid"
import { useFormatMessages } from "../../utils/hooks"

import Button from "../../components/Button"
import QRCode from "../../components/QRCode"

import * as S from "./styled"

const UserInfo: React.FC = ({ onGenerated, userInfo }) => {
  const { dogname, publicKey, secretKey, twitter } = userInfo
  const refsQR = {
    proofOfDog: useRef(),
    secretKey: useRef(),
  }
  const refDownload = useRef()
  const publicKeyUrl = `https://proofof.dog/addr?dogecoin=${publicKey}&twitter=${twitter}&dogname=${dogname}`
  const [
    saveText,
    downloadText,
    takePictureText,
    saveSecretText,
    publicKeyText,
    secretKeyText,
  ] = useFormatMessages([
    { id: "SAVE" },
    { id: "DOWNLOAD" },
    { id: "TAKE_PICTURE" },
    { id: "SAVE_KEEP_SECRET" },
    { id: "PUBLIC_KEY" },
    { id: "SECRET_KEY" },
  ])

  const getCanvasQR = (key) => {
    return refsQR[key].current.querySelector('canvas')
  }

  const getSrcQR = async (key, scale = 2) => {
    return getCanvasQR(key).toDataURL('image/jpeg', 1.0)
  }

  const handleDownload = (key) => async () => {
    refDownload.current.setAttribute('download', key)
    refDownload.current.href = await getSrcQR(key)
    refDownload.current.click()
  }

  useEffect(() => {
    onGenerated({
      ...userInfo,
      proofOfDogQR: () => getCanvasQR('proofOfDog'),
    })
  }, [dogname, publicKey, secretKey, twitter])

  return (
    <>
      <S.ShapesRow center="xs">
        <S.StepCol xs={12} sm={6}>
          <S.QRWrapper ref={refsQR.proofOfDog}>
            <QRCode
              info="PROOF_OF_DOGE"
              title={dogname}
              value={publicKeyUrl}
            />
          </S.QRWrapper>
          <Button
            backgroundColor="primary"
            onClick={handleDownload('proofOfDog')}
            text={saveText}
          />
          <S.TextRow bold color="#00a000" mTop={5}>{takePictureText}</S.TextRow>
        </S.StepCol>
        <S.StepCol xs={12} sm={6}>
          <S.QRWrapper ref={refsQR.secretKey}>
            <QRCode
              color="crimson"
              info="SECRET_KEY"
              title={dogname}
              value={secretKey}
            />
          </S.QRWrapper>
          <Button
            backgroundColor="primary"
            onClick={handleDownload('secretKey')}
            text={saveText}
          />
          <S.TextRow bold color="#DD0000" mTop={5}>{saveSecretText}</S.TextRow>
        </S.StepCol>
      </S.ShapesRow>
      <Row>
        <S.TextRow fontSize={18} fontStyle="italic">{`${publicKeyText}: ${publicKey}`}</S.TextRow>
      </Row>
      <Row>
        <S.TextRow fontSize={18} fontStyle="italic">{`${secretKeyText}: ${secretKey}`}</S.TextRow>
      </Row>
      <a download ref={refDownload} />
    </>
  )
}

export default UserInfo
