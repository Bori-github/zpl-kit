import { defineCommand } from "./base";

import { ORIENTATION } from "../constants";
import { ObjectValues } from "../types";

type FieldOrientationParams = ObjectValues<typeof ORIENTATION>;

export const fieldOrientation = defineCommand<FieldOrientationParams>(
  (orientation = "N") => `^FW${orientation}`,
);
