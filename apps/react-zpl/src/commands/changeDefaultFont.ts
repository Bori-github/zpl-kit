import { defineCommand } from "./base";

interface ChangeDefaultFontParams {
  fontName?: string; // A-Z, 0-9
  height: number;
  width: number;
}

export const changeDefaultFont = defineCommand<ChangeDefaultFontParams>(
  ({
    fontName = "J", // default korean
    height,
    width,
  }) => `^CF${fontName},${height},${width}`,
);
