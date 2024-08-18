import { FilledLoaderStyled } from './FilledLoader.styled'

type FilledLoaderProps = {
  width: string
  height: string
  borderSize: string
  fill?: string
  absolute?: boolean
}

const FilledLoader = ({
  width,
  height,
  borderSize,
  fill,
}: FilledLoaderProps) => {
  return (
    <FilledLoaderStyled
      width={width}
      height={height}
      borderSize={borderSize}
      fill={fill}
    />
  )
}

export default FilledLoader
