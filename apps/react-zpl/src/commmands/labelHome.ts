import { defineCommand } from "./base";

interface LabelHomeParams {
  offsetX: number;
  offsetY: number;
}

export const labelHome = defineCommand<LabelHomeParams>(
  ({ offsetX, offsetY }) => `^LH${offsetX},${offsetY}`,
);
