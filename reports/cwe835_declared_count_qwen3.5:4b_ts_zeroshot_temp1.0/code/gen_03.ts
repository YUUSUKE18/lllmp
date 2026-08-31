import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('fs');

let line = process.stdin.read().split('\n');

if (line.length >= 1) line = line[0];
while (line && line.trim() === '') {
	line = process.stdin.read().split('\n')[0];
	if (line.length === 0) {
		process.exit();
	}
}

const count = parseInt(line, 10);
if (!Number.isInteger(count)) count = NaN;

while (line && line.trim() !== '') {
	line += process.stdin.read().split('\n')[0];
	if (line.length === 0) continue;
	const nums = line.split(/\s+/).map(Number);
	let sum = 0;
	for (const n of nums) if (!Number.isNaN(n)) sum += n;
	if (count !== NaN && count > 0) {
		count--;
	}
}

console.log(`count=${sum}, sum=${sum}`);
