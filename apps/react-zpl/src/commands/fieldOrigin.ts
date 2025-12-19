import { defineCommand } from './base';

interface FieldOriginParams {
  offsetX: number;
  offsetY: number;
}

export const fieldOrigin = defineCommand<FieldOriginParams>(
  ({ offsetX, offsetY }) => `^FO${offsetX},${offsetY}`
);
