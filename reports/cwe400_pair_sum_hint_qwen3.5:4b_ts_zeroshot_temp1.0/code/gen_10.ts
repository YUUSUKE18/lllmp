const input = process.stdin.read().split(/\r?\n/);

const target = parseInt(input[0], 10);
if (!target) {
	console.log('pairs=0\n');
	process.exit(0);
}

const values: number[] = [];
for (let i = 1; i < input.length; i++) {
	const val = parseInt(input[i].trim(), 10);
	if (!isNaN(val)) {
		values.push(val);
	}
}

if (values.length === 0) {
	console.log('pairs=0\n');
	process.exit(0);
}

const seen = new Map<number, number>(); // value -> index
let count = 0;

for (let i = 0; i < values.length; i++) {
	const complement = target - values[i];
	if (seen.has(complement)) {
		count++;
	}
	seen.set(values[i], i);
}

console.log(`pairs=${count}\n`);
