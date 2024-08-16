import styled from '@emotion/styled'
import { FLAGS_HEIGHT } from '../../shared/constants/dimensions'
import { HOVER_TRANSITION } from '../../shared/constants/transitions'

export const LandingPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`
export const FlagsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
  margin-top: 10px;

  > svg {
    cursor: pointer;
    height: ${FLAGS_HEIGHT};
    transform: scale(1);
    transition: ${HOVER_TRANSITION};

    &:hover {
      transform: scale(1.2);
    }
  }
`
