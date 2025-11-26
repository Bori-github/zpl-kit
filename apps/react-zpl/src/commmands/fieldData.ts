import { defineCommand } from "./base";
import { newLine } from "./newLine";

export const fieldData = defineCommand((text: string) => {
  return `^FD${text}${newLine()}^FS`;
});
