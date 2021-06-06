import styled from "styled-components"

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`

export const Container = styled.div`
  display: flex;
  justify-content: center;
`

export const ProofOfDog = styled.img`
  position: absolute;
  right: 0px;
  top: ${({ top }) => top}px;
`

export const WebcamWrapper = styled.div`
  position: relative;
`

export const Wrapper = styled.div`
  min-height: 700px;
`
