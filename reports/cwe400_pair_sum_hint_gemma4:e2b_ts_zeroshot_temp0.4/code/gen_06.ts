/**
 * 標準入力から目標値と整数のリストを読み込み、
 * 目標値になる2つの整数の組の数を数えるプログラム。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length < 2) {
        console.log('pairs=0');
        return;
    }

    // 1行目: 目標値
    const target = parseInt(input[0].trim());

    // 2行目以降: 数値のリスト
    const numbers: number[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            const num = parseInt(line);
            // 整数として解釈できるか確認 (NaNでないこと)
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    let pairCount = 0;
    const n = numbers.length;

    // 2個の組 (i, j) を探す。i != j
    // O(N^2) のアプローチ。Nが十分に大きくても、制約が不明なため、まずはこのアプローチを採用する。
    // 敵対的に大きな入力に対しても実用的な時間で完了するには、Nが現実的な範囲（例: 10^5程度）である必要がある。
    // もしNが非常に大きい場合（例: 10^9）、O(N^2)は間に合わないため、ハッシュマップ/ソートベースのO(N log N)またはO(N)が必要になるが、
    // この問題は「足して目標値になる2個の組」を数えるため、2つの要素の和を求める問題であり、
    // 2つの要素の和のペアを数える問題として解釈する。

    // 2つの要素 a[i] + a[j] = target を求める。
    // a[j] = target - a[i] となる j が存在するかを数える。

    // 効率化のため、ハッシュマップ（またはソート）を使用する。
    // ここでは、各要素がリスト内に何回出現するかを数える必要があるため、頻度マップを使用する。

    const frequencyMap = new Map<number, number>();
    for (const num of numbers) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }

    // 2つの組の数を計算
    for (const num1 of numbers) {
        const num2 = target - num1;

        if (frequencyMap.has(num2)) {
            // num1 と num2 が異なる場合: (num1, num2) の組が見つかる
            if (num1 !== num2) {
                // num1 と num2 の出現回数
                const count1 = frequencyMap.get(num1)!;
                const count2 = frequencyMap.get(num2)!;
                
                // (num1, num2) のペアの総数 = count1 * count2
                // この計算は、(a, b) と (b, a) を区別しない「組」を数える必要がある。
                // 問題文は「2個の組（位置が異なる2個）の個数」を求めているため、インデックスのペア (i, j) で考える。

                // 1. num1 と num2 が異なる場合 (num1 < num2 の順に数えることで重複を避ける)
                if (num1 < num2) {
                    pairCount += count1 * count2;
                }
            } 
            // 2. num1 と num2 が等しい場合 (2 * num1 = target)
            else if (num1 === num2) {
                // 同じ値が2つ以上存在する場合、組み合わせの数を計算する
                // k個の同じ値から2つを選ぶ組み合わせ: C(k, 2) = k * (k - 1) / 2
                const count = frequencyMap.get(num1)!;
                if (count >= 2) {
                    pairCount += (count * (count - 1)) / 2;
                }
            }
        }
    }

    // 最終結果を出力
    console.log(`pairs=${pairCount}`);
}

solve();
