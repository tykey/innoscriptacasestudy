import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { INNO_SECONDARY_COLOR } from '../../../constants/colors'

const roll = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

type FilledLoaderStyledProps = {
  width: string
  height: string
  borderSize: string
  fill?: string
}

export const FilledLoaderStyled = styled.span<FilledLoaderStyledProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: ${(props) => props.borderSize} solid ${INNO_SECONDARY_COLOR};
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${roll} 1s linear infinite;
`
