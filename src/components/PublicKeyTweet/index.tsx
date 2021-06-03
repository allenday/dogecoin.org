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
  const publicKeyUrl = `https://proofof.dog/addr?dogecoin=${publicKey}`
  const tweetBaseUrl = `https://twitter.com/intent/tweet?tw_p=tweetbutton&ref_src=twsrc%5Etfw&text=`
  const tweetMessage = tweetBaseUrl + `.%40proofofdog+Here's+a+%23KYD+for+` + dogname + `%0a%0a` + encodeURIComponent(message) + `%0a%0a%23proofofdog+%40elonmusk+%24DOGE`;
//  const tweetMessage = `https://twitter.com/intent/tweet?tw_p=tweetbutton&ref_src=twsrc%5Etfw&text=.@proofofdog Here's a #KYD for ${dogname}\n\n${message}\n\n#proofofdog @elonmusk $DOGE`;
  const [
    rememberAttachText,
    tweetMessageText,
  ] = useFormatMessages([
    { id: "REMEMBER_ATTACH_PIC" },
    { id: "TWEET_MESSAGE" },
  ])

  return (
    <>
      <Row center="xs">
        <S.Div textCenter>
          <S.TextRow bold color="#00a000" mTop={60}>{rememberAttachText}</S.TextRow>
        </S.Div>
      </Row>
      <Row center="xs">
        <S.Div textCenter>
          <a target="_blank" href={tweetMessage}><img src="/images/tweet.png" width="320"/></a>
        </S.Div>
      </Row>
    </>
  )
}

export default PublicKeyTweet
