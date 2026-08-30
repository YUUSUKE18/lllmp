const input = process.stdin.read();
if (!input) return;

let tokens: string[] | null = null;
try {
	tokens = input.trim().split(/[,\s]+/);
} catch (e) {}

// 有効な整数をフィルタリング（空文字や非数値は除外）
const nums = tokens?.filter(t => /^-?\d+$/.test(t)) || [];

if (nums.length === 0) {
	console.log(`count=0 sum=0`);
	return;
}

// 重複除去してセットにまとめる（個数はユニーク要素の数）
const uniqueSet = new Set<number>();
for (let n of nums) {
	uniqueSet.add(n);
}

const count = uniqueSet.size;
let sum: number | bigint = BigInt(0n); // 64bit 範囲確保のため BigUintInt を用いる（負数も考慮するため signed）
// Node.js の Number は 32 bit なものもあるが、BigInt で安全に計算する。
for (const n of nums) {
	sum += BigInt(n as number);
}

console.log(`count=${count.toString()} sum=${sum}`);
