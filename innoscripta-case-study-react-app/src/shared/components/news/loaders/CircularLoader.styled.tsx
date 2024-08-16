import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

const roll = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

type RollerProps = {
  color?: string
}

const RollerParent = styled.div<RollerProps>`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  div {
    animation: ${roll} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 40px 40px;
    &:after {
      content: ' ';
      display: block;
      position: absolute;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: ${(props) => props.color ?? 'white'};
      margin: -4px 0 0 -4px;
    }
    &:nth-of-type(1) {
      animation-delay: -0.036s;
      &:after {
        top: 63px;
        left: 63px;
      }
    }
    &:nth-of-type(2) {
      animation-delay: -0.072s;
      &:after {
        top: 68px;
        left: 56px;
      }
    }
    &:nth-of-type(3) {
      animation-delay: -0.108s;
      &:after {
        top: 71px;
        left: 48px;
      }
    }
    &:nth-of-type(4) {
      animation-delay: -0.144s;
      &:after {
        top: 72px;
        left: 40px;
      }
    }
    &:nth-of-type(5) {
      animation-delay: -0.18s;
      &:after {
        top: 71px;
        left: 32px;
      }
    }
    &:nth-of-type(6) {
      animation-delay: -0.216s;
      &:after {
        top: 68px;
        left: 24px;
      }
    }
    &:nth-of-type(7) {
      animation-delay: -0.252s;
      &:after {
        top: 63px;
        left: 17px;
      }
    }
    &:nth-of-type(8) {
      animation-delay: -0.288s;
      &:after {
        top: 56px;
        left: 12px;
      }
    }
  }
`

export const Roller = ({ color }: RollerProps) => {
  return (
    <RollerParent color={color}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </RollerParent>
  )
}

export const RollerWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 130px;
  align-items: center;
  justify-content: center;
`

export const LoadingDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`

export const LoadingText = styled.span<RollerProps>`
  color: ${(props) => props.color ?? 'white'};
  font-size: 12px;
`
