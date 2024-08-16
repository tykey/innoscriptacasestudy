import {
  LoadingDiv,
  LoadingText,
  Roller,
  RollerWrapper,
} from './CircularLoader.styled'

type CircularLoaderProps = {
  loadingText: string
  color?: string
}

const CircularLoader = ({ loadingText, color }: CircularLoaderProps) => {
  return (
    <RollerWrapper>
      <LoadingDiv>
        <Roller color={color} />
        <LoadingText color={color}>{loadingText}</LoadingText>
      </LoadingDiv>
    </RollerWrapper>
  )
}

export default CircularLoader
