declare module "*.svg" {
  import * as React from "react";
  import { jsx } from "@emotion/react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
      onClick?: () => void;
    }
  >;

  const src: string;
  export default src;
}

declare module "*.pdf";

declare module "*.png";
