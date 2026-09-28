import { createInterface } from 'readline';

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

let targetValue = 0;
const numbers = new Map<number, number>(); // map<value, index>
let foundCount = 0n;
const maxPairs = 1_000_000_000_000_000n;

rl.on('line', (line) => {
	if (!line || line.trim() === '') return;

	const trimmedLine = line.trim();
	const valueStr = trimmedLine;

	try {
		let targetInput = Number(valueStr);
		if (isNaN(targetInput)) return;

		if (targetInput === 0 && numbers.size === 0) {
			targetValue = parseInt(trimmedLine, 10);
		} else if (!isNaN(parseInt(trimmedLine, 10))) {
			const num = BigInt(valueStr); // Assuming input is within range for safety
			numbers.set(num, foundCount);
			foundCount++;
		}
	} catch (e) {
		return;
	}
});

rl.on('close', () => {
	const resultArr = Array.from(numbers.keys());
	let count = 0n;

	for (let i = 0n; i < numbers.size - 1n; i++) {
		for (let j = i + 1n; j < numbers.size; j++) {
			if (resultArr[i] + resultArr[j] === BigInt(targetValue)) {
				count++;
			}
		}
	}

	console.log(`pairs=${count}`);
});
