declare module '*.svg' {
  import * as React from 'react'
  import { jsx } from '@emotion/react'

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      onClick?: () => void
    }
  >

  const src: string
  export default src
}

declare module '*.pdf'

declare module '*.png'
