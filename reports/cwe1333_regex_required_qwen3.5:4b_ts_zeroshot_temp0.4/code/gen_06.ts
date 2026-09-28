import { createInterface } from 'readline';

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

let validCount = 0;

rl.on('line', (line) => {
	const trimmed = line.trim();
	if (!trimmed) return; // 空行は無視（ただし仕様では「妥当ではありません」とありますが、出力行数に影響しないため処理なし）
	
	// 正規表現：1 個以上の数字列がカンマで区切られており、末尾のカンマも許容
	const regex = /^\s*(\d+(?:,\d+)*)?\s*$/;
	if (regex.test(trimmed)) {
		validCount++;
	}
});

rl.on('close', () => {
	process.stdout.write(`valid=${validCount}\n`);
});
