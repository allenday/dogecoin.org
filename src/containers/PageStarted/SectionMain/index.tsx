import React, { useState } from "react"
import { useMediaQuery } from "react-responsive"
import { Row, Col } from "react-styled-flexboxgrid"
import { StaticImage } from "gatsby-plugin-image"
import { TwitterFollowButton } from 'react-twitter-embed';

import { useFormatMessages } from "../../../utils/hooks"

import PublicKeyTweet from "../../../components/PublicKeyTweet"
import GenerateToken from "../../GenerateToken"
import PathLine from "../../../assets/shapes/path-line"
import Section from "../../../components/Section"
import CardBoxLink from "../../../components/CardBoxLink"
import CardSocial from "../../../components/CardSocial/index"
import BlockStepLead from "../../../components/BlockStepLead"
import { stepOneButtons, stepTwoButtons, stepFourLinks } from "./data"
import * as S from "./styled"

interface TabsGroupBase {
  title?: string
  subtitle?: string
  buttonGroup: JSX.Element[]
}
interface TabsGroupProps {
  groups: TabsGroupBase[]
}
const TabsGroup: React.FC<TabsGroupProps> = ({ groups }) => {
  return (
    <Row center="xs">
      {groups.map((group, index) => (
        <S.TabsCol xs={12} md={6} lg={4} key={index}>
          {group.title && group.subtitle && (
            <S.TabsTitles>
              <h4>{group.title}</h4>
              <p>{group.subtitle}</p>
            </S.TabsTitles>
          )}
          <S.TabsButtons>{group.buttonGroup}</S.TabsButtons>
        </S.TabsCol>
      ))}
    </Row>
  )
}

const SectionMain: React.FC = () => {
  const [userInfo, setUserInfo] = useState(null)
  const isMobile = useMediaQuery({ maxWidth: 767 })

  const [
    titleOne,
    titleTwo,
    titleThree,
    titleFour,
    cardOnePk,
    cardOneSk,
    cardTwoKYD,
    cardThreeFollow,
    cardFourVerify,
  ] = useFormatMessages([
    { id: "GUIDE_STEP_1_SECTION_TITLE" },
    { id: "GUIDE_STEP_2_SECTION_TITLE" },
    { id: "GUIDE_STEP_3_SECTION_TITLE" },
    { id: "GUIDE_STEP_4_SECTION_TITLE" },
    { id: "GUIDE_STEP_1_CARD_PK" },
    { id: "GUIDE_STEP_1_CARD_SK" },
    { id: "GUIDE_STEP_2_CARD_KYD" },
    { id: "GUIDE_STEP_3_CARD_FOLLOW" },
    { id: "GUIDE_STEP_4_CARD_VERIFY" },
  ])

  return (
    <S.SectionWrapper>

      <Section as={S.Wrapper}>
        {!isMobile && (
          <S.DecorWrapper>
            <PathLine $type={2} />
          </S.DecorWrapper>
        )}

        <BlockStepLead step={1} title={titleOne} />
        <GenerateToken onGenerated={setUserInfo} />
      </Section>

      <Section as={S.Wrapper}>
        {!isMobile && (
          <S.DecorWrapper>
            <PathLine $type={3} />
          </S.DecorWrapper>
        )}

        <BlockStepLead step={2} title={titleTwo} />
        <Row center="xs">
          <S.CardsContainerCol md={12}>
            <S.CardsRow>
              <Col xs={12}>
                <S.Text center>
                  <img src="/images/kyd-example.jpg" alt="KYD Example" />
                </S.Text>
              </Col>
            </S.CardsRow>
          </S.CardsContainerCol>
        </Row>
      </Section>

      <Section as={S.Wrapper}>
        {!isMobile && (
          <S.DecorWrapper>
            <PathLine $type={4} />
          </S.DecorWrapper>
        )}
        <BlockStepLead step={3} title={titleThree} />
        <Row center="xs">
          <S.CardsContainerCol md={12}>
            <S.CardsRow>
              <Col xs={12}>
                <S.Div textCenter>
                  <TwitterFollowButton
                    screenName={'proofOfDog'}
                    options={{ size: 'large', showCount: false }}
                  />
                </S.Div>
              </Col>
            </S.CardsRow>
          </S.CardsContainerCol>
        </Row>
      </Section>

      <Section as={S.Wrapper}>
        {!isMobile && (
          <S.DecorWrapper>
            <PathLine $type={4} />
          </S.DecorWrapper>
        )}

        <BlockStepLead step={4} title={titleFour} />
        <Row center="xs">
          <S.CardsContainerCol md={12} lg={8}>
            <S.CardsRow>
              <Col xs={12} md={6}>
                <S.Div textCenter>
                  {userInfo && (<PublicKeyTweet {...userInfo} />)}
                </S.Div>
              </Col>
            </S.CardsRow>
          </S.CardsContainerCol>
        </Row>
      </Section>

    </S.SectionWrapper>
  )
}

export default SectionMain
