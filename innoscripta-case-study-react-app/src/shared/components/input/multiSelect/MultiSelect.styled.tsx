import styled from '@emotion/styled'
import { forwardRef } from 'react'
import { INNO_SECONDARY_COLOR } from '../../../constants/colors'

type MultiSelectWrapperProps = {
  noGap?: boolean
  width?: string
}

export const MultiSelectWrapper = styled.div<MultiSelectWrapperProps>`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  flex: 1 1 auto;
  position: relative;
  gap: ${(props) => (props.noGap ? 0 : '8px')};
  width: ${(props) => props.width ?? '100%'};
`

export const ViewsDiv = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`
type ClosedViewProps = {
  isDisabled?: boolean
  hasError?: boolean
  hasValue?: boolean
}

export const ClosedView = styled.div<ClosedViewProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 1 1 auto;
  font-size: 1em;
  padding: 0.7em;
  gap: 2px;
  color: #666666;
  background-color: white;
  border-radius: 10px;
  border: solid 2px ${(props) => (props.hasError ? 'red' : '#BDBDBD')};
  cursor: ${(props) => (props.isDisabled ? 'default' : 'pointer')};
  z-index: 5;
  opacity: ${(props) => (props.isDisabled && !props.hasValue ? 0.5 : 1)};

  > svg {
    width: 1.5em;
    fill: ${INNO_SECONDARY_COLOR};
    transform: rotate(0);
    transition: transform 0.2s ease-in-out;
    opacity: ${(props) => (props.isDisabled && props.hasValue ? 0.3 : 1)};
  }
`

type CustomInputProps = {
  textAlign?: string
}

export const CustomInput = styled.input<CustomInputProps>`
  appearance: none;
  width: 100%;
  border: none;
  background-color: white;
  cursor: inherit;
  flex-grow: 0;
  font-size: 1em;
  text-align: ${(props) => props.textAlign ?? 'start'};

  &:focus {
    outline: none;
  }
`

export const OpenViewDiv = styled(
  forwardRef((props: any, ref) => <div {...props} ref={ref} />)
)`
  position: absolute;
  top: calc(100% + 5px);
  width: 100%;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow-y: auto;
  z-index: 500;
  border: solid 1px #d3d3d3;
  border-radius: 5px;

  &.toTop {
    top: initial;
    bottom: calc(100% + 5px);
    flex-direction: column-reverse;
  }
`

type CustomOptionProps = {
  isselected?: boolean
  isDisabled?: boolean
  isPreSelected?: boolean
  visibleIcon?: boolean
  isLast?: boolean
}

export const CustomOption = styled.div<CustomOptionProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 5px;
  color: ${(props) => (props.isselected ? 'white' : '#666666')};
  background-color: ${(props) =>
    props.isselected
      ? INNO_SECONDARY_COLOR
      : props.isPreSelected
        ? 'white'
        : '#F4F4F4'};
  padding: 0.5em;
  font-size: 1em;
  cursor: ${(props) => (props.isDisabled ? 'default' : 'pointer')};
  z-index: inherit;
  border-bottom: ${(props) => (props.isLast ? 'none' : 'solid 1px #a1a1a1')};
  &:hover {
    background-color: ${(props) =>
      props.isselected
        ? INNO_SECONDARY_COLOR
        : props.isDisabled
          ? '#F4F4F4'
          : 'white'};
  }

  > svg {
    width: 1em;
    fill: ${(props) => (props.visibleIcon ? INNO_SECONDARY_COLOR : 'white')};
    visibility: ${(props) =>
      props.isselected || props.visibleIcon ? 'visible' : 'hidden'};
  }
`

export const MultipleOptionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  gap: 8px;
  flex-wrap: wrap;
`

export const MultipleOption = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 20px 6px 8px;
  cursor: pointer;
  border: solid 1px #666666;
  border-radius: 14px;
`

export const RemoveIconDiv = styled.div`
  position: absolute;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 4px;

  > svg {
    width: 1em;
    fill: #666666;
    transition: fill 0.1s ease-out;

    &:hover {
      fill: #121212;
    }
  }
`

export const HiddenInput = styled.input`
  appearance: none;
  border: none;
  height: 0;
  width: 0;
  position: absolute;
  opacity: 0;

  &:focus {
    outline: none;
  }
`
