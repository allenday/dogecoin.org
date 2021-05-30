import React, { useState } from "react"
import Typewriter from "typewriter-effect"

import { useFormatMessages } from "../../utils/hooks"
import Rect from "../../assets/shapes/rect-text.svg"
import * as S from "./styled"

const wordsBottom = ["Doge", "Crypto", "Coin", "Hodl"]

const TypeWriter: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [doge, crypto, coin, hodl] = useFormatMessages([
      { id: "TYPEWRITER_DOGE" },
      { id: "TYPEWRITER_CRYPTO" },
      { id: "TYPEWRITER_COIN" },
      { id: "TYPEWRITER_HODL" },
    ])

  return (
    <S.Wrapper wordIndex={currentIndex}>
      <Rect />
      <S.Text>
        <Typewriter
          onInit={(typewriter) => {
            typewriter // TODO: simplify & refactor
              .callFunction(() => setCurrentIndex(0))
              .typeString(doge)
              .pauseFor(500)
              .deleteAll()
              .callFunction(() => setCurrentIndex(1))
              .typeString(crypto)
              .pauseFor(500)
              .deleteAll()
              .callFunction(() => setCurrentIndex(2))
              .typeString(coin)
              .pauseFor(500)
              .deleteAll()
              .callFunction(() => setCurrentIndex(3))
              .typeString(hodl)
              .pauseFor(500)
              .start()
          }}
          options={{
            autoStart: true,
            loop: true,
            cursor: "",
            delay: 220,
          }}
        />
      </S.Text>
    </S.Wrapper>
  )
}

export default TypeWriter
