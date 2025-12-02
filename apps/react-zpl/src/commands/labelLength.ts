import { defineCommand } from './base';

export const labelLength = defineCommand((height: number) => `^LL${height}`);
