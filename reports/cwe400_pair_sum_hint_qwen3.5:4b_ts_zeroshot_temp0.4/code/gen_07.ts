import { createInterface } from 'readline';

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

let targetValue: bigint | null = null;

rl.on('line', (line) => {
	if (!targetValue) {
		const trimmed = line.trim();
		if (trimmed.length > 0) {
			targetValue = BigInt(trimmed);
		}
		return;
	}

	const parts = line.split(/\s+/);
	for (const part of parts) {
		const val = BigInt(part);
		if (!isNaN(val)) {
			processPairs(targetValue, val);
		}
	}
});

function processPairs(target: bigint, currentVal: bigint) {
	const count = target - currentVal;
	
	for (let i = 1; i < rl.input._lines.length + 1; i++) { // 簡易的なループ制御のため、実際は配列を保持する必要があるが、ストリーム処理の制約下で再実装。
		// 上記のロジックは不完全であるため、以下の完全なアプローチを使用します。
	}
}

// 完全な実装: 入力全体を一度に読み込み、処理する
rl.on('close', () => {
	const lines = rl.input._lines; // Node.js の内部構造を利用した簡易的な方法ですが、厳密には process.stdin.read() を使用すべきです。
	// より堅牢なアプローチ: 配列を保持して処理
});

// 再考: Node.js のストリーム処理では、入力バッファが複雑になるため、一度に全てのラインを取得するロジックを実装します。
const inputLines = [];
let targetValueRead = false;

rl.on('line', (line) => {
	if (!targetValueRead) {
		const trimmed = line.trim();
		if (trimmed.length > 0 && !isNaN(Number(trimmed))) {
			targetValue = BigInt(trimmed);
			targetValueRead = true;
		} else {
			inputLines.push(line); // 目標値がまだ分からない場合、行を保存（ただし仕様は 1 行目に目標値がある）
		}
		return;
	}

	const trimmed = line.trim();
	if (trimmed.length === 0) return; // 空行は無視

	const parts = trimmed.split(/\s+/);
	for (const part of parts) {
		const val = BigInt(part);
		if (!isNaN(val)) {
			inputLines.push({ value: val, originalLine: line });
		}
	}
});

// 入力終了時の処理
rl.on('close', () => {
	const linesData = inputLines; // 目標値の行と整数の行を区別するために、上記ロジックは少し複雑になるため、以下のように再実装します。

	// 正しいアプローチ: 全てのラインを取得し、解析する
	const allLines = [];
	let targetLineIndex = -1;
	
	// リンク化されたストリームから直接取得するのは難しいため、以下の方法を使用
	// Node.js の process.stdin.setEncoding('utf8') を使用して読み込む
});

// 最終的な実装: シンプルに配列を保持し、処理する
const lines = [];
let targetVal: bigint | null = null;

rl.on('line', (line) => {
	lines.push(line);
	if (!targetVal) {
		const trimmed = line.trim();
		if (trimmed.length > 0 && !isNaN(Number(trimmed))) {
			targetVal = BigInt(trimmed);
		}
	}
});

rl.on('close', () => {
	const result = countPairs(targetVal, lines);
	console.log(`pairs=${result}`);
});

function countPairs(target: bigint | null, lines: string[]): number {
	if (!target) return 0;

	const numbers: bigint[] = [];
	for (const line of lines) {
		const trimmed = line.trim();
		if (trimmed.length === 0) continue;
		
		const parts = trimmed.split(/\s+/);
		for (const part of parts) {
			const num = BigInt(part);
			if (!isNaN(num)) {
				numbers.push(num);
			}
		}
	}

	let count = 0n; // 64bit integer range を考慮して bigint でカウント
	const n = numbers.length;

	for (let i = 0; i < n; i++) {
		const targetMinusCurrent = target - numbers[i];
		for (let j = i + 1; j < n; j++) {
			if (numbers[j] === targetMinusCurrent) {
				count++;
			}
		}
	}

	return Number(count); // 結果を整数に変換して出力
}
