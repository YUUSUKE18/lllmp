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

    // 2つの組 (i, j) を探す。i != j
    // O(N^2) のアプローチ。Nが十分に大きくても、制約が不明なため、まずはこのアプローチで実装する。
    // 敵対的に大きな入力に対しても実用的な時間で完了するように、N^2が許容されると仮定する。
    // もしNが非常に大きい（例: 10^6以上）場合は、ハッシュマップやソートを用いたO(N log N)またはO(N)が必要になるが、
    // ここでは「2個の組」の数を求めるため、各要素のペアをチェックするO(N^2)が最も直接的。

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
