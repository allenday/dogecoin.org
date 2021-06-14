import React, { useEffect, useRef } from "react"
import * as QRCode from 'easyqrcodejs';

import { useFormatMessages } from "../../utils/hooks"

import * as S from "./styled"

const ComponentQRCode: React.FC = ({
  color = 'gold',
  info,
  onRendered = () => {},
  title,
  value,
}) => {
  const refQR = useRef()
  const [infoText] = useFormatMessages([{ id: info }])

  const handleRendered = (_, data) => onRendered(data)

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
      onRenderingEnd: handleRendered,
    })
  }, [info, title, value])

  return (
    <S.QRWrapper ref={refQR} />
  )
}

export default ComponentQRCode
