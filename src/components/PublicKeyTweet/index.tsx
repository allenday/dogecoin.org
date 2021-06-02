import React from "react"
import { Row } from "react-styled-flexboxgrid"
import { TwitterShareButton } from 'react-twitter-embed';
import { useFormatMessages } from "../../utils/hooks"

import * as S from "./styled"

const PublicKeyTweet: React.FC = ({
  dogname,
  message,
  publicKey,
}) => {
  const publicKeyUrl = `https://proofof.dog/addr?dogname=${dogname}&dogecoin=${publicKey}`
  const tweetMessage = `.@proofofdog Here's a #KYD for ${dogname}\n\n${message}\n\n#proofofdog @elonmusk $DOGE`
  const [
    rememberAttachText,
    tweetMessageText,
  ] = useFormatMessages([
    { id: "REMEMBER_ATTACH_PIC" },
    { id: "TWEET_MESSAGE" },
  ])

  return (
    <>
      <Row>
        <S.TextRow bold color="#00a000" mTop={5}>{rememberAttachText}</S.TextRow>
      </Row>
      <S.RowTweet>
        <TwitterShareButton
          url={' '}
          options={{ text: tweetMessage, size: 'large' }}
        />
      </S.RowTweet>
    </>
  )
}

export default PublicKeyTweet
