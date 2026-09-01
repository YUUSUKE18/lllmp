const input = process.stdin;

input.resume();

let target: bigint | undefined = undefined;
let pairsCount: bigint = 0n;

function readLine(): string | null {
	return input.read();
}

while (true) {
	const line = readLine();
	if (line === null || line.length === 0) break;

	const trimmed = line.trim();
	if (trimmed.length === 0) continue;

	if (target === undefined) {
		target = BigInt(trimmed);
		continue;
	}

	try {
		const num: bigint = BigInt(trimmed);
		pairsCount += countPairs(target, num, pairsCount);
	} catch {
		continue;
	}
}

process.stdout.write(`pairs=${pairsCount}\n`);

function countPairs(target: bigint, currentNum: bigint, acc: bigint): bigint {
	const complement = target - currentNum;
	if (complement < 0n) return acc;

	let i = 1;
	while (true) {
		const nextLine = readLine();
		if (nextLine === null || nextLine.length === 0) break;
		
		const trimmed = nextLine.trim();
		if (trimmed.length === 0) continue;

		try {
			const num: bigint = BigInt(trimmed);
			if (num === 0n) {
				const result = countPairs(target, currentNum, acc);
				pairsCount += result;
				return pairsCount;
			} else if (num > target) {
				const result = countPairs(target, currentNum, acc);
				pairsCount += result;
				return pairsCount;
			} else {
				const result = countPairs(target, currentNum, acc);
				pairsCount += result;
				return pairsCount;
			}
		} catch {
			continue;
		}
	}

	return acc;
}

input.resume();
