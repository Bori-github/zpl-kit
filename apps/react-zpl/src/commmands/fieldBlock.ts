import { defineCommand } from "./base";

import { ALIGN } from "../constants";
import { ObjectValues } from "../types";

interface FieldBlockParams {
  blockWidth?: number;
  maxLine?: number;
  lineSpacing?: number;
  align?: ObjectValues<typeof ALIGN>;
  indent?: number;
}

export const fieldBlock = defineCommand<FieldBlockParams>(
  ({ blockWidth = 0, maxLine = 1, lineSpacing = 0, align = "L", indent = 0 }) =>
    `^FB${blockWidth},${maxLine},${lineSpacing},${align},${indent}`,
);
