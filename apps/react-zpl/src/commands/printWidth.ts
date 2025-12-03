import { defineCommand } from './base';

export const printWidth = defineCommand((width: number) => `^PW${width}`);
