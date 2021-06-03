import styled from "styled-components"
import { Row } from "react-styled-flexboxgrid"

export const TextRow = styled.p`
  ${({ bold }) => bold && `font-weight: bold;`}
  ${({ color }) => color && `color: ${color};`}
  ${({ fontSize }) => fontSize && `font-size: ${fontSize}px;`}
  ${({ fontStyle }) => fontStyle && `font-style: ${fontStyle};`}
  ${({ lSpacing }) => lSpacing && `letter-spacing: ${lSpacing}px;`}
  ${({ mTop }) => mTop && `margin-top: ${mTop}px;`}
  ${({ tTransform }) => tTransform && `text-transform: ${tTransform};`}
`

export const RowTweet = styled(Row)`
  margin-top: 50px;
`

export const RowTweetMessage = styled(Row)`
  border-left: solid 4px #c9c9c9;
  padding: 8px 0 8px 30px;
  margin: 0;

  & > p {
    margin: 5px 0;
  }
`

export const Text = styled.p`
  ${({ center }) => center && `text-align: center;`}
`

export const Div = styled.div`
  ${({ textCenter }) => textCenter && `text-align: center;`}
`
