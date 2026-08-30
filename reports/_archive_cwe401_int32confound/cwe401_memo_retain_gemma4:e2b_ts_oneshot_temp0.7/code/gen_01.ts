let input = "";
const fs = require('fs');

// 標準入力全体を読み込む
try {
    input = fs.readFileSync(0, 'utf8');
} catch (e) {
    // 標準入力がない場合は処理を終了
    process.exit(0);
}

const lines = input.trim().split('\n').map(line => line.trim()).filter(line => line.length > 0);

// メモ化テーブル
const memo: Map<number, number> = new Map();
let totalSteps = 0;

/**
 * 繰り返し操作の手数（ステップ数）を計算する関数（メモ化付き）
 * @param n 初期値
 * @returns 1 に到達するまでの手数
 */
function calculateSteps(n: number): number {
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

    // 計算結果をメモ化
    memo.set(n, steps);
    return steps;
}

// すべてのクエリを処理し、合計を計算する
for (const line of lines) {
    const n = parseInt(line, 10);
    if (!isNaN(n) && n >= 1) {
        const steps = calculateSteps(n);
        totalSteps += steps;
    }
}

// 結果を出力
console.log(`total=${totalSteps}`);
