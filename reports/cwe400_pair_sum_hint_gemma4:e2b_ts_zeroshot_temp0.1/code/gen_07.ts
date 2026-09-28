/**
 * 標準入力から目標値と整数を受け取り、目標値になる2つの組の個数を数えるプログラム。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length < 2) {
        console.log('pairs=0');
        return;
    }

    // 1行目が目標値
    const target = parseInt(input[0].trim(), 10);

    if (isNaN(target)) {
        // 目標値が不正な場合は処理を終了（仕様上は入力が保証されているが安全策）
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

    let pairCount = 0;
    const n = numbers.length;

    // 2つの組 (i, j) を探す: i != j かつ numbers[i] + numbers[j] == target
    // O(N^2) の全探索で十分。Nが敵対的に大きくても、N^2が許容範囲内であると仮定する。
    // Nが非常に大きい場合（例: 10^6以上）、より高速な方法（ハッシュマップなど）が必要になるが、
    // ここでは「2個の組」の個数を求めるため、インデックスのペアを数える必要がある。

    // 2つの異なる位置の要素の和を求める。
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (numbers[i] + numbers[j] === target) {
                pairCount++;
            }
        }
    }

    // 結果を出力
    console.log(`pairs=${pairCount}`);
}

solve();
