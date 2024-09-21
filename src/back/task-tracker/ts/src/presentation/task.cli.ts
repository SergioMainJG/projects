import { styleText } from 'node:util';

const Undone = styleText("bgGrey", "undone...");
const InProgress = styleText("yellowBright", "in progress~");
const Done = styleText("greenBright", "done!");