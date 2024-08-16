import styled from '@emotion/styled'
import { INNO_MAIN_COLOR, INNO_MAIN_TEXT_COLOR } from '../../constants/colors'

export const ContentWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  height: 100%;
  width: 100%;
  flex: 1 1 auto;
  background-color: ${INNO_MAIN_COLOR};
  z-index: 20;
  color: ${INNO_MAIN_TEXT_COLOR};
`
