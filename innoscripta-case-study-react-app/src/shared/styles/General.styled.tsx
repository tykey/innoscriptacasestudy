import styled from '@emotion/styled'
import { INNO_MAIN_COLOR, INNO_MAIN_TEXT_COLOR } from '../constants/colors'
import { HOVER_TRANSITION } from '../constants/transitions'

export const GeneralWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  background-color: ${INNO_MAIN_COLOR};
  color: ${INNO_MAIN_TEXT_COLOR};
`

type SpanProps = {
  fontSize?: string
  color?: string
  cursor?: string
  noWrap?: boolean
}

export const DefaultSpan = styled.span<SpanProps>`
  font-size: ${(props) => props.fontSize ?? '1em'};
  color: ${(props) => props.color ?? 'inherit'};
  cursor: ${(props) => props.cursor ?? 'inherit'};
  font-weight: 400;
  white-space: ${(props) => (props.noWrap ? 'nowrap' : 'inherit')};
`

export const BoldSpan = styled.span<SpanProps>`
  font-size: ${(props) => props.fontSize ?? '1em'};
  color: ${(props) => props.color ?? 'inherit'};
  cursor: ${(props) => props.cursor ?? 'inherit'};
  font-weight: 600;
  white-space: ${(props) => (props.noWrap ? 'nowrap' : 'inherit')};
`
export const LoaderWrapperCentered = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex: 1 0 auto;
  position: absolute;
`

type ClickableSpanWrapperProps = {
  isDisabled?: boolean
  color?: string
  isHidden?: boolean
}

export const ClickableSpanWrapper = styled.div<ClickableSpanWrapperProps>`
  opacity: ${(props) => (props.isDisabled ? 0.5 : 1)};
  transition: ${HOVER_TRANSITION};
  pointer-events: ${(props) => (props.isDisabled ? 'none' : 'all')};
  cursor: ${(props) => (props.isDisabled ? 'default' : 'pointer')};
  user-select: none;
  color: ${(props) => props.color ?? 'inherit'};
  visibility: ${(props) => (props.isHidden ? 'hidden' : 'none')};
`
