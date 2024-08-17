import styled from '@emotion/styled'
import { INNO_MAIN_COLOR, INNO_MAIN_TEXT_COLOR } from '../constants/colors'

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
}

export const DefaultSpan = styled.span<SpanProps>`
  font-size: ${(props) => props.fontSize ?? '1em'};
  color: ${(props) => props.color ?? 'inherit'};
  cursor: ${(props) => props.cursor ?? 'inherit'};
  font-weight: 400;
`

export const BoldSpan = styled.span<SpanProps>`
  font-size: ${(props) => props.fontSize ?? '1em'};
  color: ${(props) => props.color ?? 'inherit'};
  cursor: ${(props) => props.cursor ?? 'inherit'};
  font-weight: 600;
`
export const LoaderWrapperCentered = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1 0 auto;
`
