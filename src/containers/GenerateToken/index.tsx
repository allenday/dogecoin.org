import React, { useState } from "react"

import TokenForm from "../../components/TokenForm"
import UserInfo from "./UserInfo"

import * as S from "./styled"

const twitterFormat = (str) => str.toLowerCase().replace('@', '')

const GenerateToken: React.FC = ({
  onGenerated = () => {},
}) => {
  const [userInfo, setUserInfo] = useState(null)

  const handleSubmit = ({ dogname, twitter }) => {
    const twitterFormated = twitterFormat(twitter)
    const key = new window.Bitcoin.ECKey(false)
    const publicKey = key.getBitcoinAddress()
    const secretKey = key.getBitcoinWalletImportFormat()
    const message = window.signMessage(twitterFormated, secretKey)
    const info = {
      dogname,
      message,
      publicKey,
      secretKey,
      twitter: twitterFormated,
    }

    setUserInfo(info)
  }

  return (
    <>
      <TokenForm onSubmit={handleSubmit} />
      {userInfo && (<UserInfo onGenerated={onGenerated} userInfo={userInfo} />)}
    </>
  )
}

export default GenerateToken
