import styled from "styled-components"
import { rem } from "polished"

export const QRWrapper = styled.div`
  background-color: ${({ bgColor }) => bgColor};
  height: 355px;
  margin: 0 0 ${rem(20)};
  padding: 20px;
  width: fit-content;
`

export const QRInfo = styled.p`
  background-color: #fff;
  font-size: 12px;
  margin: 0;
  padding-top: 5px;
  text-align: center;
  width: 100%;
`

export const QRTitle = styled.p`
  background-color: #fff;
  font-size: 29px;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 0;
  margin-top: -10px;
  text-align: center;
  width: 100%;
`
