import { createInterface } from 'readline';

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

let targetValue: number | null = null;
let numbers: number[] = [];

rl.on('line', (line) => {
	if (!targetValue && line.trim() !== '') {
		targetValue = parseInt(line.trim(), 10);
	} else if (targetValue !== null && line.trim() !== '' && !isNaN(parseInt(line.trim(), 10))) {
		const num = parseInt(line.trim(), 10);
		if (!isNaN(num)) {
			numbers.push(num);
		}
	}
});

rl.on('close', () => {
	let count = 0;
	for (let i = 0; i < numbers.length; i++) {
		for (let j = i + 1; j < numbers.length; j++) {
			if (numbers[i] + numbers[j] === targetValue) {
				count++;
			}
		}
	}
	process.stdout.write(`pairs=${count}\n`);
});
