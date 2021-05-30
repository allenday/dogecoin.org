import React from "react"
import styled from "styled-components"

import Layout from "../../core/Layout"
import Main from "../../components/Main"
import SectionQRCode from "../../containers/SectionQRCode"

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.accent};
`

const EmptyRow = styled.div`
  height: 114px;
`

const Addr: React.FC = ({ publicKey }) => {
  return (
    <Layout isSecondaryHeader>
      <Main>
        <Wrapper>
          <EmptyRow />
          <SectionQRCode publicKey={publicKey} />
        </Wrapper>
      </Main>
    </Layout>
  )
}

export default Addr
