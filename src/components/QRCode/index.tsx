import React, { useEffect, useRef } from "react"
// import QRCode from "qrcode.react"
import * as QRCode from 'easyqrcodejs';

import { useFormatMessages } from "../../utils/hooks"

import * as S from "./styled"

const ComponentQRCode: React.FC = ({
  color = 'gold',
  info,
  title,
  value,
}) => {
  const refQR = useRef()
  const [infoText] = useFormatMessages([{ id: info }])

  useEffect(() => {
    refQR.current.innerHTML = ''

    new QRCode(refQR.current, {
      correctLevel: QRCode.CorrectLevel.H,
      logo: '/images/proofofdog-icon.png',
      quietZone: 20,
      quietZoneColor: color,
      subTitle: infoText,
      subTitleFont: '14px Arial',
      subTitleTop: 25,
      text: value,
      title,
      titleFont: 'bold 24px Arial',
      titleHeight: 70,
      titleTop: 55,
    })
  }, [info, title, value])

  return (
    <S.QRWrapper ref={refQR} />
  )
}

export default ComponentQRCode
