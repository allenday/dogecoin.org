import React, { useEffect, useState } from "react"
import { Col } from "react-styled-flexboxgrid"

import { useFormatMessages } from "../../utils/hooks"

import Button from "../../components/Button"

import * as S from "./styled"

const TokenForm: React.FC = ({ onSubmit }) => {
  const [values, setValues] = useState({ dogname: '', twitter: '' })
  const [
    inputUsernameText,
    inputDognameText,
    submitText,
    resetText,
  ] = useFormatMessages([
    { id: "INPUT_USERNAME" },
    { id: "INPUT_DOGNAME" },
    { id: "SUBMIT" },
    { id: "RESET" },
  ])

  const handleInput = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value })
  }

  const handleKeyDown = (event) => event.keyCode === 32 && event.preventDefault()

  const handleReset = () => setValues({ twitter: '', dogname: '' })

  const handleSubmit = () => onSubmit(values)

  useEffect(() => {
    const dogname = localStorage.getItem('dogname')
    const twitter = localStorage.getItem('twitter')

    if ( !!dogname && !!twitter ) {
      localStorage.removeItem('dogname')
      localStorage.removeItem('twitter')

      setValues({ dogname, twitter })
      onSubmit({ dogname, twitter })
    }
  }, [])

  return (
    <>
      <S.InputWrapper center="xs">
        <S.StepCol xs={12} sm={6}>
          <S.InputText
            name="twitter"
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={inputUsernameText}
            value={values.twitter}
          />
        </S.StepCol>
        <S.StepCol xs={12} sm={6}>
          <S.InputText
            name="dogname"
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={inputDognameText}
            value={values.dogname}
          />
        </S.StepCol>
      </S.InputWrapper>
      <S.ActionsWrapper>
        <Col xs={12} sm={6}>
          <Button
            backgroundColor="primary"
            gatsbyLink
            onClick={handleSubmit}
            text={submitText}
          />
        </Col>
        <Col xs={12} sm={6}>
          <Button
            backgroundColor="secondary"
            gatsbyLink
            onClick={handleReset}
            text={resetText}
          />
        </Col>
      </S.ActionsWrapper>
    </>
  )
}

export default TokenForm
