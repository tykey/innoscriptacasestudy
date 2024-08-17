import { memo } from 'react'
import { DefaultButtonStyled } from './DefaultButton.styled'

type DefaultButtonProps = {
  text: string
  onClick: () => void
  fontSize?: string
  isDisabled?: boolean
}

const DefaultButton = ({
  text,
  onClick,
  fontSize,
  isDisabled,
}: DefaultButtonProps) => {
  return (
    <DefaultButtonStyled onClick={onClick} fontSize={fontSize}>
      {text}
    </DefaultButtonStyled>
  )
}

export default memo(DefaultButton)
