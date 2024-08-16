import { CircleWrapper, ProgressDiv } from './Progress.styled'
import Circle from '../../../assets/icons/circle.svg'
import { memo } from 'react'

type ProgressProps = {
  numberOfElements: number
  selectedIndex: number
  onClick: (clickedIndex: number) => void
}

const Progress = ({
  numberOfElements,
  selectedIndex,
  onClick,
}: ProgressProps) => {
  return (
    <ProgressDiv>
      {[...new Array(numberOfElements)].map((_section: any, index: number) => {
        return (
          <CircleWrapper
            key={`circle_${index}`}
            isSelected={index === selectedIndex}
            onClick={() => {
              onClick(index)
            }}
            width="1.1em"
          >
            <Circle />
          </CircleWrapper>
        )
      })}
    </ProgressDiv>
  )
}

export default memo(Progress)
