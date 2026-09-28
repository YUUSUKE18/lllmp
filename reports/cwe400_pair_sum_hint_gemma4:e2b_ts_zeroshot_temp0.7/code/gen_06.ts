/**
 * 標準入力から目標値と整数を読み込み、目標値になる2つの組の数を数えるプログラム。
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
        console.log('pairs=0');
        return;
    }

    // 2行目以降の整数を読み込む
    const numbers: number[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line.length > 0) {
            const num = parseInt(line, 10);
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    // 2個の組の数を数えるためのハッシュマップ（またはセット）
    // ここでは、出現回数を数えるためのマップを使用する。
    // 2つの要素 a と b があって a + b = target となるペア (a, b) を数える。
    // 入力された数列から、各数値が何回出現したかを数える。
    const counts = new Map<number, number>();
    for (const num of numbers) {
        counts.set(num, (counts.get(num) || 0) + 1);
    }

    let pairCount = 0;
    const uniqueNumbers = Array.from(counts.keys());

    // 2つの組 (a, b) があって a + b = target となるものを探す。
    // a と b は入力された数列の要素である必要があり、位置が異なる必要がある。
    // これは、(a, b) の組の数を数えることを意味する。

    // 1. すべての可能なペア (a, b) を試す。
    // a と b は入力された数列の要素である。
    for (let i = 0; i < uniqueNumbers.length; i++) {
        const a = uniqueNumbers[i];

        // a + b = target より、b = target - a
        const b = target - a;

        // b が入力された数列に含まれているか確認する。
        if (counts.has(b)) {
            // a と b が同じ値の場合 (a == b)、
            // a が少なくとも2回出現していれば、その中で選べるペアの数は a * (a - 1) / 2 になる。
            // しかし、問題の要求は「2個の組（位置が異なる2個）の個数」なので、
            // 入力された数列全体から選ぶ必要がある。

            // 別の解釈: 数列のインデックス i と j (i != j) について、numbers[i] + numbers[j] = target となる組の数を数える。
            // これは、各値 a が i 回、値 b が j 回出現する場合、a*b 個の組ができる。

            // 2. すべてのインデックスペア (i, j) についてチェックする (O(N^2) は非現実的)。
            // 効率的に数えるには、各値の出現回数を利用する。

            if (a < b) {
                // a != b の場合: a と b の出現回数の積がペアの総数となる。
                // a が counts.get(a) 回、b が counts.get(b) 回出現する。
                pairCount += counts.get(a)! * counts.get(b)!;
            } else if (a === b) {
                // a == b の場合: a + a = target (つまり 2a = target)
                // この場合、a が counts.get(a) 回出現する。
                // a と同じ値の2つの異なる位置を選ぶ組の数は counts.get(a) * (counts.get(a) - 1) / 2。
                if (2 * a === target) {
                    const countA = counts.get(a)!;
                    if (countA >= 2) {
                        // 組み合わせの数: C(countA, 2)
                        pairCount += (countA * (countA - 1)) / 2;
                    }
                }
            }
        }
    }

    // 最終的な結果を出力
    console.log(`pairs=${pairCount}`);
}

solve();
