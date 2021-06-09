import styled from "styled-components"

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`

export const ExampleWrapper = styled.div`
  text-align: center;
`

export const ProofOfDog = styled.img`
  position: absolute;
  right: 0px;
  top: ${({ top }) => top}px;
`

export const VideoWrapper = styled.div`
  width:  ${({ width }) => width || 0}px;
  margin: 0 auto;
  position: relative;

  & video {
    width: ${({ width }) => width}px;
  }
`
