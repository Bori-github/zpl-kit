import { defineCommand } from "./base";

import { COLOR } from "../constants";
import { ObjectValues } from "../types";

interface GraphicBoxParams {
  width: number;
  height: number;
  borderThickness?: number;
  lineColor?: ObjectValues<typeof COLOR>;
  radius?: number;
}

export const graphicBox = defineCommand<GraphicBoxParams>(
  ({ width, height, borderThickness = 1, lineColor = "B", radius = 0 }) =>
    `^GB${width},${height},${borderThickness},${lineColor},${radius}^FS`,
);
