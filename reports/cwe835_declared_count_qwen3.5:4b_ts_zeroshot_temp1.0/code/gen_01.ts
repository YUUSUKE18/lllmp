import { stdin, stdout } from 'node:process';

const lines = stdin.on('data', (chunk) => chunk.toString().trim());
if (!lines || !stdin.readable) process.exit(0);

let n = 0;
let values: bigint[] = [];

try {
	n = parseInt(lines.trim(), 10);
} catch {}

const data = stdin.setEncoding('utf8');
data.on('data', (chunk) => {
	const line = chunk.toString().trim();
	if (!line) return;
	const token = BigInt(line);
	values.push(token);
});

// Ensure all data is read before outputting
data.on('end', () => {
	const count = values.length;
	let sum: bigint = 0n;
	for (const v of values) {
		sum += v;
	}
	stdout.write(`count=${count} sum=${sum}\n`);
});
