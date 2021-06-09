import React from "react"
import styled from "styled-components"

import * as S from "./styled"

const Spinner: React.FC = (props) => (
  <S.Spinner {...props}>
    <div />
    <div />
    <div />
    <div />
  </S.Spinner>
)

export default Spinner
