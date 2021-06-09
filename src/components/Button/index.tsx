import React from "react"
import { Link } from "gatsby"
import Spinner from "./../Spinner"

import * as S from "./styled"

/**
 * Types
 */
interface ButtonProps {
  text?: React.ReactNode | string
  textColor?: S.Color
  icon?: React.ReactNode | string | null
  textFirst?: boolean
  backgroundColor?: S.BgColor
  layout?: S.Layout
  loading?: boolean
  href?: string | null
  gatsbyLink?: boolean
  fullWidth?: boolean
  onClick?: Function | null
  anchor?: boolean
  bordered?: boolean
  as?: any // TODO // Need additional details
}

const Button: React.FC<ButtonProps> = ({
  text,
  textColor = "primary",
  icon = null,
  textFirst = false,
  backgroundColor = "transparent",
  bordered = false,
  layout = "initial",
  loading = false,
  href = null,
  gatsbyLink = false,
  fullWidth = false,
  onClick = null,
  anchor = false,
  as = "button",
}: ButtonProps) => {
  const handleOnClick = (): void => {
    if (!onClick) return
    onClick()
  }

  if (gatsbyLink && href) {
    return (
      <S.Main
        textColor={textColor}
        backgroundColor={backgroundColor}
        layout={layout}
        $icon={icon !== null}
        $textFirst={textFirst}
        $fullWidth={fullWidth}
        $bordered={bordered}
        onClick={handleOnClick}
      >
        <Link to={href}>
          {icon}
          {text && <span>{text}</span>}
        </Link>
      </S.Main>
    )
  }

  return (
    <S.Main
      textColor={textColor}
      backgroundColor={backgroundColor}
      layout={layout}
      $icon={icon !== null}
      $textFirst={textFirst}
      $bordered={bordered}
      $fullWidth={fullWidth}
      {...(href && {
        as: "a",
        href: href,
      })}
      {...(href &&
        !anchor && {
          target: "_blank",
          rel: "noopener noreferrer",
        })}
      onClick={handleOnClick}
      as={!href ? as : "a"}
    >
      {icon}
      {text && <span>{text}</span>}
      {loading && <Spinner marginLeft={20} />}
    </S.Main>
  )
}

export default Button
