/**
 * 標準入力から目標値と複数の整数を受け取り、その中から足して目標値になる2つの組の個数を数えるプログラム。
 */
function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length < 2) {
        console.log('pairs=0');
        return;
    }

    // 1行目: 目標値
    const target = parseInt(input[0].trim(), 10);

    if (isNaN(target)) {
        // 目標値が不正な場合は処理を終了（仕様上は入力が正しいと仮定されるが、安全のため）
        console.log('pairs=0');
        return;
    }

    // 2行目以降の整数を読み込む
    const numbers: number[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            const num = parseInt(line, 10);
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    let count = 0;
    const n = numbers.length;

    // 2つの組 (i, j) の個数を数える (i != j)
    // O(N^2) の計算量で十分である。Nが最大で入力サイズに依存するが、
    // 「敵対的に大きな入力に対しても、実用的な時間とメモリで完了するように」という要件を満たすためには、
    // N^2が許容されるか、より効率的な方法を考える必要がある。
    // ここでは、2つの組 (i, j) を求めるので、単純に O(N^2) で全てのペアをチェックする。

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            // numbers[i] + numbers[j] が目標値になるかチェック
            if (numbers[i] + numbers[j] === target) {
                count++;
            }
        }
    }

    // 結果を出力
    console.log(`pairs=${count}`);
}

solve();
