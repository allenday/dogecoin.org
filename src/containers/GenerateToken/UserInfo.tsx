import React, { useRef } from "react"
import { Row } from "react-styled-flexboxgrid"
import { useFormatMessages } from "../../utils/hooks"

import Button from "../../components/Button"
import QRCode from "../../components/QRCode"

import * as S from "./styled"

const UserInfo: React.FC = ({
  dogname,
  message,
  publicKey,
  secretKey,
  twitter,
}) => {
  const pbKeyRef = useRef()
  const scKeyRef = useRef()
  const publicKeyUrl = `https://proofof.dog/addr?dogecoin=${publicKey}`
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

  const handleDownload = (ref, fileName) => async () => {
    const expLib = await require('react-component-export-image')
    expLib.exportComponentAsJPEG(ref, { fileName })
  }

  return (
    <>
      <S.ShapesRow center="xs">
        <S.StepCol xs={12} sm={6}>
          <S.QRWrapper ref={pbKeyRef}>
            <QRCode
              info="USER_CARD"
              title={dogname}
              value={publicKeyUrl}
            />
          </S.QRWrapper>
          <Button
            backgroundColor="primary"
            onClick={handleDownload(pbKeyRef, 'UserCard')}
            text={saveText}
          />
          <S.TextRow bold color="#00a000" mTop={5}>{takePictureText}</S.TextRow>
        </S.StepCol>
        <S.StepCol xs={12} sm={6}>
          <S.QRWrapper ref={scKeyRef}>
            <QRCode
              color="crimson"
              info="SECRET_KEY"
              title={dogname}
              value={secretKey}
            />
          </S.QRWrapper>
          <Button
            backgroundColor="primary"
            onClick={handleDownload(scKeyRef, 'SecretKey')}
            text={saveText}
          />
          <S.TextRow bold color="#DD0000" mTop={5}>{saveSecretText}</S.TextRow>
        </S.StepCol>
      </S.ShapesRow>
    </>
  )
}

export default UserInfo
