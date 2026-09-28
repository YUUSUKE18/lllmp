const input = process.stdin.read();
if (!input) {
    console.log('count=0 max=0');
    return;
}

// 入力文字列をカンマで分割
const parts = input.split(',');
const nums: bigint[] = [];

for (const part of parts) {
    const trimmed = part.trim();
    // 空要素は無視
    if (trimmed.length === 0) continue;

    try {
        // 整数として解釈できない要素は無視 (BigInt 構築失敗をキャッチ)
        const n = BigInt(trimmed);
        nums.push(n);
    } catch (e) {
        // 無効な文字列はスキップ
    }
}

let count = nums.length;
let max: bigint | undefined = undefined;

if (count > 0) {
    max = nums[0];
    for (let i = 1; i < count; i++) {
        if (nums[i] > max) {
            max = nums[i];
        }
    }
} else {
    // 要素がない場合、max を 0 と出力 (仕様上定義されていないが、形式を満たすため)
    max = BigInt(0);
}

console.log(`count=${count} max=${max}`);
