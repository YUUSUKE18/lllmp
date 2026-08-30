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

    // 1行目から目標値を取得
    const targetLine = input[0].trim();
    if (!targetLine) {
        console.log('pairs=0');
        return;
    }
    const target = parseInt(targetLine, 10);

    // 2行目以降から整数を読み込む
    const numbers: number[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            const num = parseInt(line, 10);
            // 整数として解釈できる行のみを収集
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    let pairCount = 0;
    const n = numbers.length;

    // 2個の組 (i, j) を探す。i != j
    // O(N^2) のアプローチ（制約が緩い場合）
    // ただし、より効率的な O(N) のアプローチを採用する。

    // 2つの要素の和が target になるペアを探す。
    // ターゲット値が与えられたとき、リスト内の要素 a, b について a + b = target となるペア (a, b) の数を数える。
    // リストが重複を許容する場合、インデックスが異なるペアを数える必要がある。

    // 2つの要素 a と b が存在し a + b = target となることを考える。
    // 1. a と b がリスト内の異なる位置にある場合 (i != j)
    // 2. a と b がリスト内の同じ値だが異なる位置にある場合 (例: [1, 5, 1], target=6 の場合 (1, 5) の2組)

    // 単純な O(N^2) で解く（N^2 は許容される可能性が高いが、敵対的入力対策として O(N log N) または O(N) を目指す）
    // ここでは O(N) または O(N log N) を目指す。

    // ハッシュマップ/セットを使用して、各要素の出現回数を数える
    const counts = new Map<number, number>();
    for (const num of numbers) {
        counts.set(num, (counts.get(num) || 0) + 1);
    }

    // ペアの数を数える
    for (let i = 0; i < n; i++) {
        const a = numbers[i];
        const b = target - a;

        // b がリスト内に存在するか確認
        if (counts.has(b)) {
            // ケース 1: a と b が異なる値の場合 (a != b)
            if (a !== b) {
                // a と b のペアを数える。
                // a が i 番目にある。b がリスト内のどこにあるか。
                // 既にすべての要素を走査しているため、重複カウントを避けるために注意が必要。

                // 簡略化のため、元のリスト上で i と j (j > i) のペアを数える O(N^2) に戻るか、
                // または、出現回数に基づいて数える O(N) にする。

                // O(N) のアプローチ（インデックスのペアを数える）
                // 各要素 a について、target - a が存在するペアの数を計算する。
                // この方法では、リスト内の要素の順序と重複を考慮する必要があるため、
                // 最初の O(N^2) の考え方が最も直感的で間違いが少ない。

                // 敵対的入力対策として、N^2 が許容されると仮定し、まずは O(N^2) で実装する。
                // N は通常、数百万オーダーでない限り許容される。

                // -----------------------------------------------------------------
                // O(N^2) 実装に戻る（より安全）
                // -----------------------------------------------------------------
            } else {
                // ケース 2: a と b が同じ値の場合 (a == b, つまり 2*a = target)
                // この場合、a と a のペアを数える。
                // a が出現する回数が counts.get(a) なら、その中から 2 つを選ぶ組み合わせは C(count, 2)
                const countA = counts.get(a)!;
                if (countA >= 2) {
                    // a と a のペア (異なる位置) の数を加算
                    pairCount += (countA * (countA - 1)) / 2;
                }
            }
        }
    }

    // O(N^2) の実装を再実行（上記ロジックは複雑になりすぎたため、シンプルに N^2 を採用）
    pairCount = 0;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (numbers[i] + numbers[j] === target) {
                pairCount++;
            }
        }
    }


    // 最終結果の出力
    console.log(`pairs=${pairCount}`);
}

solve();
