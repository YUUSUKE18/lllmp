import { createInterface } from 'readline';

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

let validCount = 0;

rl.on('line', (line) => {
	const trimmedLine = line.trim();
	
	// 空行は妥当ではない（1 個以上の数字列が必要）
	if (trimmedLine.length === 0) {
		return;
	}
	
	// 正規表現: 空白をスキップして、少なくとも 1 つの整数列があり、その後カンマで区切られた整数列が続くこと。
	// 末尾のカンマは許容するため、最後の要素の後にカンマがあることも可能。
	// 数式: (?:\s*\d+(?:,\s*\d+)*)+
	const regex = /(?:\s*\d+(?:,\s*\d+)*)+/;
	
	if (regex.test(trimmedLine)) {
		validCount++;
	}
});

rl.on('close', () => {
	process.stdout.write(`valid=${validCount}\n`);
});
