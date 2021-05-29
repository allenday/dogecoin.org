import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Row, Col } from "react-styled-flexboxgrid"

import Section from "../../components/Section"
import Carousel from "../../components/Carousel"
import Banner from "../../components/Banner"

import { useFormatMessages } from "../../utils/hooks"

import * as S from "./styled"

const hashtags = [
  { text: "doge", color: "#232D91", bg: "#FFF" },
  { text: "muchfunny", color: "#00665E", bg: "#FFD203" },
  { text: "dogecoinarmy", color: "#FFF", bg: "#00BEB5" },
  { text: "cryptocurrency", color: "#232D91", bg: "#C3F1FF" },
  { text: "shiba", color: "#00665E", bg: "#FFD203" },
  { text: "suchmemes", color: "#00665E", bg: "#FFF" },
]

const SectionAbout: React.FC = () => {
  const [title, lead, text, wow, random] = useFormatMessages([
    { id: "ABOUT_TITLE" },
    { id: "ABOUT_TEXT_LEAD" },
    { id: "ABOUT_TEXT" },
    { id: "BANNER_WOW" },
    { id: "BANNER_RANDOM" },
  ])

  return (
    <>
      <Section as={S.WrapperFirst} id="about">
        <Row center="xs">
          <Col xs={12} sm={8} md={7}>
            <S.Title dangerouslySetInnerHTML={{ __html: title }} />
            <S.Media>
              <StaticImage src={"../../assets/images/doge-main.jpg"} alt="Doge" width={683} height={396} />
            </S.Media>
            <S.LeadText dangerouslySetInnerHTML={{ __html: lead }} />
            <S.Text dangerouslySetInnerHTML={{ __html: text }} />
          </Col>
        </Row>
      </Section>

      <S.BannerContainer>
        <Banner texts={[wow, random]} />
      </S.BannerContainer>

      <Section as={S.WrapperLast}>
        <Row center="xs">
          <Col xs={12} sm={8}>
            <S.HashtagStack>
              {hashtags.map((item, i) => (
                <S.Hashtag key={i} style={{ backgroundColor: item.bg, color: item.color }}>
                  #{item.text}
                </S.Hashtag>
              ))}
            </S.HashtagStack>
          </Col>
        </Row>
      </Section>

      <S.ImageStack>
        <Carousel />
      </S.ImageStack>
    </>
  )
}

export default SectionAbout
