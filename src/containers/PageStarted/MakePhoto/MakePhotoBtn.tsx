import React, { useEffect, useState } from "react"
import { useFormatMessages } from "../../../utils/hooks"

import Button from "../../../components/Button"

const MakePhotoButton: React.FC = ({ forwardRed, onClick }) => {
  const [makePhotoText] = useFormatMessages([{ id: "MAKE_PHOTO" }])
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    onClick()
  }

  useEffect(() => {
    forwardRed.current = { setEnabled: () => setLoading(false) }
  }, [])

  return (
    <Button
      backgroundColor="primary"
      loading={loading}
      onClick={handleClick}
      text={makePhotoText}
    />
  )
}

export default MakePhotoButton
