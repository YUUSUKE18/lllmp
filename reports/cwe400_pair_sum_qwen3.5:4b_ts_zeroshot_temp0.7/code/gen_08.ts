import * as readline from 'readline';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

let targetValue: number | null = null;
let lineNumber = 0;

rl.on('line', (line) => {
	lineNumber++;
	const trimmedLine = line.trim();
	if (trimmedLine === '') return;
	
	const parsedValue = parseInt(trimmedLine, 10);
	if (isNaN(parsedValue)) return;

	if (lineNumber === 1 && targetValue === null) {
		targetValue = parsedValue;
		return;
	}

	if (targetValue !== null) {
		const nums: number[] = [];
		nums.push(targetValue);
		targetValue = parsedValue;
		for (const val of nums) {
			for (const otherVal of nums.slice(1)) {
				if (val + otherVal === targetValue) {
					count++;
				}
			}
		}
		console.log(`pairs=${count}`);
		process.exit(0);
	}
});

let count = 0;
