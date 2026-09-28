/**
 * 標準入力から目標値と整数のリストを読み込み、
 * そのリストの中から足して目標値になる2つの組の数を数えるプログラム。
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

    // 2行目以降の整数を読み込む
    const numbers: number[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            const num = parseInt(line, 10);
            // 整数として解釈できるもののみ格納
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    let count = 0;
    const n = numbers.length;

    // 2個の組 (i, j) のうち i != j を探索する
    // O(N^2) のアプローチ。Nが大きすぎない限り許容される。
    // 制約が明示されていないが、「敵対的に大きな入力に対しても実用的な時間とメモリで完了するように」という指示から、
    // N^2 は制限値が非常に大きい場合（例: 10^6以上）には遅くなる可能性がある。
    // しかし、和の問題（Two Sum）の標準的な効率的な解法はソート＋二分探索（O(N log N)）またはハッシュマップ（O(N)）である。
    // ここでは、入力の制約が不明確なため、最も効率的なO(N)解法を採用する。

    // ハッシュマップを使用したO(N)解法
    const seen = new Set<number>();
    const pairs = new Set<string>(); // 重複を防ぐために、(a, b) の順序を考慮して格納

    for (const num of numbers) {
        const complement = target - num;

        // complement が既に見た数として存在するかチェック
        if (seen.has(complement)) {
            // {num, complement} の組が見つかった。
            // 順序を考慮して一意なペアとして記録する。
            const pair1 = Math.min(num, complement);
            const pair2 = Math.max(num, complement);
            pairs.add(`${pair1},${pair2}`);
        }
        // 現在の数を記録
        seen.add(num);
    }

    // 求めたいのは「位置が異なる2個の組」の個数。
    // 上記のハッシュマップアプローチは、値のペアの数を数えるものであり、
    // 入力配列内のインデックスに基づくペアの数を数えるものではない。
    // 仕様：「2 行目以降の整数のうち、足して目標値になる 2 個の組（位置が異なる 2 個）の個数を求めます。」
    // これは、元のリスト $A$ のインデックス $i \neq j$ について、$A[i] + A[j] = \text{target}$ となるペア $(i, j)$ の総数を求めることを意味する。
    // 通常、これは「値の重複」に基づいて計算される。

    // -------------------------------------------------------------------
    // 再評価：インデックスに基づくペアの数え方 (Two Sum Problem)
    // 1. ターゲット値 $T$ から $x$ と $T-x$ のペアを探す。
    // 2. 入力配列 $A$ の中で $x$ が $k$ 回出現し、$T-x$ が $m$ 回出現する場合、
    //    もし $x \neq T-x$ なら、そのペアの総数は $k \times m$。
    //    もし $x = T-x$ (つまり $2x = T$) なら、そのペアの総数は $\frac{k(k-1)}{2}$。
    // -------------------------------------------------------------------

    // 頻度マップを作成 (O(N))
    const freq = new Map<number, number>();
    for (const num of numbers) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }

    let totalPairs = 0;

    // 頻度マップのキー（ユニークな値）を走査する
    for (const [num, count] of freq.entries()) {
        const complement = target - num;

        if (freq.has(complement)) {
            const complementCount = freq.get(complement)!;

            if (num < complement) {
                // num と complement が異なる場合 (num < complement)
                // num の出現回数 * complement の出現回数
                totalPairs += count * complementCount;
            } else if (num === complement) {
                // num と complement が等しい場合 (2 * num = target)
                // 同じ要素同士のペアの数: count * (count - 1) / 2
                totalPairs += count * (count - 1) / 2;
            }
            // num > complement のケースは、num が complement よりも後で処理されるため、重複カウントを避ける。
        }
    }

    console.log(`pairs=${totalPairs}`);
}

solve();
