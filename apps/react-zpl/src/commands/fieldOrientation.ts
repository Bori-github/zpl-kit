import { defineCommand } from './base';

import { ORIENTATION } from '../constants';
import { ObjectValues } from '../types';

interface FieldOrientationParams {
  orientation?: ObjectValues<typeof ORIENTATION>;
}

export const fieldOrientation = defineCommand<FieldOrientationParams>(
  ({ orientation = ORIENTATION.NO_ROTATION }) => `^FW${orientation}`
);
