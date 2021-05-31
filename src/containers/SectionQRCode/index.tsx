import React, { useEffect, useState } from "react"
import axios from "axios"
import { Row, Col } from "react-styled-flexboxgrid"

import { useFormatMessages } from "../../utils/hooks"

import Button from "../../components/Button"
import Section from "../../components/Section"
import QRCode from "../../components/QRCode"
import * as S from "./styled"

const SectionQRCode: React.FC = ({ publicKey }) => {
  const [userInfo, setUserInfo] = useState(null)
  const [
    tweetLinkText,
  ] = useFormatMessages([
    { id: "TWEET_LINK" },
  ])

  useEffect(() => {
    axios.get(`http://registry.proofof.dog/api/addr/${publicKey}`)
      .then(({ data }) => {
        if ( !data.error ) {
          setUserInfo(data)
        } else {
          throw new Error(data.error)
        }
      })
      .catch(error => console.log('ERROR', error))
  }, [])

  return userInfo && (
    <S.SectionWrapper>
      <Section as={S.RadiusWrapper}>
        <Row center="xs">
          <QRCode            
            info="SEND_DOGECOIN"
            title={userInfo.dogname}
            value={userInfo.publicKey}
          />
        </Row>
        <Row center="xs">
          <S.TextRow>{userInfo.dogname} belongs to {userInfo.username}</S.TextRow>
        </Row>
        {userInfo.tweetUrl && (
          <Row center="xs">
            <Button
              text={tweetLinkText}
              backgroundColor="primary"
              href={userInfo.tweetUrl}
              gatsbyLink
            />
          </Row>
        )}
      </Section>
    </S.SectionWrapper>
  )
}

export default SectionQRCode
