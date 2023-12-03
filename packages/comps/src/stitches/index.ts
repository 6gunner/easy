import { createStitches } from '@stitches/react';
import config from './config';
// 用来设置默认theme，设置一些方法别名等等
const stiches = createStitches(config);

export const { styled, css } = stiches;

export default stiches;
