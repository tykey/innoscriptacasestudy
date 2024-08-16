import styled from '@emotion/styled'
import { HEADER_COLOR } from '../../constants/colors'
import { HEADER_HEIGHT } from '../../constants/dimensions'

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  padding: 20px;
  height: ${HEADER_HEIGHT};
  background-color: ${HEADER_COLOR};
  box-shadow: 1px -4px 16px 2px rgb(0 0 0 / 38%);
  z-index: 25;
  flex: 0 0 auto;

  > svg {
    height: 100%;
  }
`
