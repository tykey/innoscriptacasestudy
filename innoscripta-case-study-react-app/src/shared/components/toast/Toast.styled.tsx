import styled from '@emotion/styled'
import { ToastType } from './Toast'
import {
  TOAST_WHITE_COLOR,
  TOAST_BLUE_DARK_COLOR,
  TOAST_GREEN_LIGHT_COLOR,
  TOAST_RED_FADED_COLOR,
  TOAST_GREY_COLOR,
  TOAST_GREEN_COLOR,
  TOAST_RED_COLOR,
  TOAST_BLUE_COLOR,
} from '../../constants/colors'

type ToastWrapperProps = {
  type: ToastType
  isVisible: boolean
}

export const ToastWrapper = styled.div<ToastWrapperProps>`
  position: absolute;
  top: ${(props) => (props.isVisible ? '20px' : '0')};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  margin: 0 auto;
  right: 0;
  left: 0;
  width: fit-content;
  border-radius: 10px;
  max-width: 100%;
  z-index: 800;
  transition-property: top, opacity;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
  font-size: 0.9em;
`

type ToastBackgroundWrapperProps = {
  type: ToastType
}

export const ToastBackgroundWrapper = styled.div<ToastBackgroundWrapperProps>`
  width: fit-content;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  color: ${(props) => {
    switch (props.type) {
      case ToastType.Success:
        return TOAST_WHITE_COLOR
      case ToastType.Error:
        return TOAST_WHITE_COLOR
      case ToastType.Information:
        return TOAST_BLUE_DARK_COLOR
    }
  }};
  padding: 12px 30px;
  border-radius: 3px;
  box-shadow: 2px 2px 2px 2px #00000050;
  background-color: ${(props) => {
    switch (props.type) {
      case ToastType.Success:
        return TOAST_GREEN_LIGHT_COLOR
      case ToastType.Error:
        return TOAST_RED_FADED_COLOR
      case ToastType.Information:
        return TOAST_GREY_COLOR
    }
  }};

  > span {
    z-index: 820;
  }
`

type MovableBackgroundProps = {
  type: ToastType
  delaySeconds: number
}

export const MovableBackground = styled.div<MovableBackgroundProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 3px;
  background-color: ${(props) => {
    switch (props.type) {
      case ToastType.Success:
        return TOAST_GREEN_COLOR
      case ToastType.Error:
        return TOAST_RED_COLOR
      case ToastType.Information:
        return TOAST_WHITE_COLOR
    }
  }};
  z-index: 810;
  animation-duration: ${(props) => `${props.delaySeconds}s`};
  animation-name: toastBackground;
  animation-iteration-count: 1;
  animation-timing-function: linear;
`

export const CloseIconDiv = styled.div<ToastBackgroundWrapperProps>`
  position: absolute;
  top: 3px;
  right: 6px;
  z-index: 830;
  cursor: pointer;

  > svg {
    width: 0.8em;
    fill: ${(props) =>
      props.type === ToastType.Information
        ? TOAST_BLUE_COLOR
        : TOAST_WHITE_COLOR};
  }
`
