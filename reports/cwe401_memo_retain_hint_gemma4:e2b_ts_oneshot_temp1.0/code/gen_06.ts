let input = "";
const fs = require('fs');

// 標準入力全体を読み込む
try {
  input = fs.readFileSync(0, 'utf8');
} catch (e) {
  // 標準入力が空の場合など、エラーを無視
}

const lines = input.trim().split('\n').filter(line => line.length > 0);

// メモ化テーブル
const memo = new Map<number, number>();

/**
 * 繰り返し操作の回数を計算する関数（メモ化付き）
 * @param n 初期値
 * @returns 1 に到達するまでの手数
 */
function countSteps(n: number): number {
    if (n === 1) {
        return 0;
    }
    if (memo.has(n)) {
        return memo.get(n)!;
    }

    let steps = 1;
    let current = n;

    while (current !== 1) {
        if (current % 2 === 0) {
            current = current / 2;
        } else {
            current = 3 * current + 1;
        }
        steps++;
    }

    memo.set(n, steps);
    return steps;
}

let totalSteps = 0;

for (const line of lines) {
    const n = parseInt(line.trim(), 10);
    if (!isNaN(n) && n >= 1) {
        const steps = countSteps(n);
        totalSteps += steps;
    }
}

console.log(`total=${totalSteps}`);
