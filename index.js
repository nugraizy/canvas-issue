import CanvasRS from '@napi-rs/canvas';
import CanvasJS from 'canvas';
import Wrapper from 'canvas-text-wrapper';

import fs from 'fs-extra';

const {
	createCanvas: canvasRS,
	GlobalFonts: { registerFromPath: fontsRS },
} = CanvasRS;
const { createCanvas: canvasJS, registerFont: fontsJS } = CanvasJS;

const { CanvasTextWrapper: wrap } = Wrapper;

fontsRS('./Chevin Bold.ttf', 'Chevin');
fontsJS('./Chevin Bold.ttf', { family: 'Chevin' });

const canvasRust = canvasRS(512, 512);
const canvasJScript = canvasJS(512, 512);

const ctxRS = canvasRust.getContext('2d');
const ctxJS = canvasJScript.getContext('2d');

console.log(ctxRS.measureText('Hello World'), 'Rust');
console.log(ctxJS.measureText('Hello World'), 'JS');

ctxRS.fillStyle = 'white';
ctxJS.fillStyle = 'white';

wrap(canvasRust, 'Hello World', {
	font: '82px Chevin',
	textAlign: 'center',
	verticalAlign: 'middle',
	sizeToFill: true,
});

wrap(canvasJScript, 'Hello World', {
	font: '82px chevin',
	textAlign: 'center',
	verticalAlign: 'middle',
	sizeToFill: true,
});

await fs.writeFile('./canvas-rs-result.png', Buffer.from(canvasRust.toBuffer('image/png'), 'base64'));
await fs.writeFile('./canvas-js-result.png', Buffer.from(canvasJScript.toBuffer('image/png'), 'base64'));
