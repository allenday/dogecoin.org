import styled, { css } from "styled-components"
import { rem, rgba } from "polished"

/**
 * Types
 */
export type Color = "primary" | "accent" | "white"
export type BgColor = "background" | "odd" | "white" | "mint" | "primary" | "black" | "transparent"
export type Layout = "initial" | "space-between" | "center"

interface ButtonProps {
  textColor: Color
  backgroundColor: BgColor
  layout: Layout
  $icon: boolean
  $textFirst: boolean
  $fullWidth: boolean
  $bordered: boolean
}

export const Icon = styled.img`
  &:only-child {
    margin-right: 0;
  }
`

export const Main = styled.button<ButtonProps>`
  --padding-horizontal: ${rem(40)};
  --padding-vertical: ${(props) => (props.$icon && props.$fullWidth ? rem(30) : rem(18))};

  font-size: ${(props) => (props.$icon && props.$fullWidth ? rem(31) : rem(25))};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  line-height: 1;
  letter-spacing: -0.5px;
  color: ${(props) => props.theme.colors.primary};

  padding: var(--padding-vertical) var(--padding-horizontal);
  border-radius: ${rem(32)};

  display: flex;
  align-items: center;

  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};
  outline: none !important;
  transition: all 0.3s ease;

  @media all and (max-width: ${(props) => `${props.theme.flexboxgrid.breakpoints.sm}em`}) {
    font-size: ${(props) => (props.$icon && props.$fullWidth ? "20px" : "16px")};
    padding: ${(props) => (props.$icon && props.$fullWidth ? "20px" : "14px")} 30px;
    border-radius: 100px;
  }

  &:is(button) {
    cursor: pointer;

    &:hover {
      transform: scale(1.01);
    }
  }

  svg path {
    fill: ${(props) => props.theme.colors.primary};
  }

  // bg and text colors
  ${(props) =>
    props.backgroundColor === "white" &&
    css`
      background-color: ${props.theme.colors.white};
    `}

  ${(props) =>
    props.backgroundColor === "black" &&
    css`
      background-color: ${props.theme.colors.dark};
      color: ${props.theme.colors.white};
    `}

  ${(props) =>
    props.backgroundColor === "mint" &&
    css`
      background-color: ${props.theme.colors.mint};
    `}

  ${(props) =>
    props.backgroundColor === "background" &&
    props.textColor !== "accent" &&
    css`
      background-color: ${props.theme.colors.background};
    `}

  ${(props) =>
    props.backgroundColor === "background" &&
    css`
      background-color: ${props.theme.colors.background};
    `}

  ${(props) =>
    props.textColor === "accent" &&
    css`
      color: ${props.theme.colors.accent};

      svg path {
        fill: ${(props) => props.theme.colors.accent};
      }
    `}


  ${(props) =>
    props.$bordered &&
    css`
      color: ${props.theme.colors.white} !important;
      box-shadow: inset 0 0 0 2px ${rgba("#979797", 0.2)};
      border-radius: ${rem(32)};

      &:hover {
        box-shadow: inset 0 0 0 2px ${rgba("#979797", 1)};
      }

      svg {
        margin-right: 0;

        path {
          fill: ${(props) => props.theme.colors.white};
        }
      }
    `}

  ${(props) =>
    props.$bordered &&
    props.$icon &&
    css`
      padding: ${rem(16)};
      font-size: 0;
      width: ${rem(96)};
      height: ${rem(96)};

      svg {
        width: ${rem(64)};
      }

      @media all and (max-width: ${(props) => `${props.theme.flexboxgrid.breakpoints.sm}em`}) {
        padding: 8px;
        border-radius: 16px;
      }
    `}

  ${(props) =>
    props.backgroundColor === "odd" &&
    css`
      color: ${props.theme.colors.accent};
      background-color: ${props.theme.colors.odd};

      svg path {
        fill: ${(props) => props.theme.colors.accent};
      }
    `}

  ${(props) =>
    props.backgroundColor === "primary" &&
    css`
      color: ${props.theme.colors.white};
      background-color: ${props.theme.colors.primary};
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);

      &:active {
        background-color: ${props.theme.colors.primaryActive};
      }
    `}

  // icons
  ${(props) =>
    props.$icon &&
    css`
      svg:not(:only-child),
      img:not(:only-child) {
        margin-right: ${rem(16)};
      }
    `}

  // layouts
  ${(props) =>
    props.$fullWidth &&
    props.layout === "center" &&
    css`
      justify-content: center;
      position: relative;
      padding-left: ${rem(100)};
      padding-right: ${rem(100)};

      svg {
        width: ${rem(40)};
      }

      svg,
      img {
        position: absolute;
        left: var(--padding-vertical);
      }

      @media all and (max-width: ${(props) => `${props.theme.flexboxgrid.breakpoints.sm}em`}) {
        border-radius: 24px;
        padding: 22px 40px;

        svg {
          width: 30px;
        }

        img {
          width: 40px;
        }
      }
    `}

  ${(props) =>
    props.layout === "space-between" &&
    css`
      justify-content: space-between;
    `}

  ${(props) =>
    props.$textFirst &&
    props.$icon &&
    css`
      flex-direction: row-reverse;
    `}
`
