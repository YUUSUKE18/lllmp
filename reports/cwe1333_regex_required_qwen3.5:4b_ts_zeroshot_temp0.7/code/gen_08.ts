import * as readline from 'readline';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

function isCommaSeparatedIntegers(line: string): boolean {
	const trimmedLine = line.trim();
	if (!trimmedLine) return false;

	const regex = /^\s*(\d+(?:,\d+)*)?\s*$/;
	return regex.test(trimmedLine);
}

let validCount = 0;

rl.on('line', (line) => {
	if (isCommaSeparatedIntegers(line)) {
		validCount++;
	}
});

rl.on('close', () => {
	console.log(`valid=${validCount}`);
});
