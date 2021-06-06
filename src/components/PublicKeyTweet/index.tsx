import React from "react"
import { Row } from "react-styled-flexboxgrid"
import { useFormatMessages } from "../../utils/hooks"

import * as S from "./styled"

const PublicKeyTweet: React.FC = ({
  dogname,
  message,
}) => {
  const tweetBaseUrl = `https://twitter.com/intent/tweet?tw_p=tweetbutton&ref_src=twsrc%5Etfw&text=`
  const tweetMessage = `${tweetBaseUrl}.%40proofofdog+Here's+a+%23KYD+for+${dogname}%0a%0a${encodeURIComponent(message)}%0a%0a%23proofofdog+%40elonmusk+%24DOGE`
  const [rememberAttachText] = useFormatMessages([{ id: "REMEMBER_ATTACH_PIC" }])

  return (
    <>
      <Row center="xs">
        <S.Div textCenter>
          <S.TextRow bold color="#00a000" mTop={60}>{rememberAttachText}</S.TextRow>
        </S.Div>
      </Row>
      <Row center="xs">
        <S.Div textCenter>
          {dogname && (
            <a target="_blank" href={tweetMessage}><img src="/images/tweet.png" width="320"/></a>
          )}
        </S.Div>
      </Row>
    </>
  )
}

export default PublicKeyTweet
