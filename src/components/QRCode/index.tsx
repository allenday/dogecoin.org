import React from "react"
import QRCode from "qrcode.react"

import { useFormatMessages } from "../../utils/hooks"

import * as S from "./styled"

const ComponentQRCode: React.FC = ({
  color = 'gold',
  info,
  title,
  value,
}) => {
  const [infoText] = useFormatMessages([{ id: info }])

  return (
    <S.QRWrapper bgColor={color}>
      <S.QRInfo>{infoText}</S.QRInfo>
      <S.QRTitle>{title}</S.QRTitle>
      <QRCode
        imageSettings={{
          height: 90,
          src: '/images/dogecoin-icon.png',
          width: 90,
        }}
        level="H"
        size={256}
        value={value}
      />
    </S.QRWrapper>
  )
}

export default ComponentQRCode
