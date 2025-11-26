import { defineCommand } from "./base";

import { ORIENTATION } from "../constants";
import { ObjectValues } from "../types";

interface FieldFontParams {
  fontName?: string; // A-Z, 0-9, downloaded font
  fieldOrientation?: ObjectValues<typeof ORIENTATION>;
  height: number; // scalable: 10 - 32000
  width: number; // scalable: 10 - 32000
}

export const fieldFont = defineCommand<FieldFontParams>(
  ({ fontName = "0", fieldOrientation = "N", height, width }) =>
    `^A${fontName}${fieldOrientation},${height},${width}`,
);
