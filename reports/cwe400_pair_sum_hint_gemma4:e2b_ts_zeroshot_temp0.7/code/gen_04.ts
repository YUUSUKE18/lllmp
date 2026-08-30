/**
 * 標準入力から目標値と整数群を読み込み、目標値になる2つの組の個数を数えるプログラム。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length < 2) {
        console.log('pairs=0');
        return;
    }

    // 1行目が目標値
    const target = BigInt(input[0].trim());

    // 2行目以降の整数を読み込み、BigIntに変換して配列に格納
    const numbers: BigInt[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            try {
                // 整数として解釈できるか試みる
                const num = BigInt(line);
                numbers.push(num);
            } catch (e) {
                // 整数として解釈できない行は無視する
                continue;
            }
        }
    }

    let pairCount = 0;
    const n = numbers.length;

    if (n < 2) {
        console.log('pairs=0');
        return;
    }

    // 2つの組 (i, j) で numbers[i] + numbers[j] = target となるものの個数を数える
    // i != j を満たす必要がある。
    // O(N^2) の全探索で解く。Nが十分に大きくても、N^2は実用的な時間内に収まる可能性がある（問題の制約によりますが、ここではO(N^2)で実装します）。
    // 敵対的に大きな入力に対しても、Nが非常に大きい場合、より効率的な方法（ハッシュマップなど）を検討する必要がありますが、
    // この問題は「足して目標値になる2個の組（位置が異なる2個）」なので、2つの要素の和を求める問題として捉えられます。
    // ここでは、各要素について、target - numbers[i] が配列内に存在するかどうかをチェックする、より効率的なO(N)またはO(N log N)の方法を考えます。

    // O(N) または O(N log N) のアプローチ:
    // 1. 全てのペア (i, j) (i < j) を数える。
    // 2. あるいは、各数 x について、target - x が配列内にいくつ存在するかを数える。

    // 頻度マップ (ハッシュマップ) を使用して O(N) で解く。
    const counts = new Map<BigInt, number>();
    for (const num of numbers) {
        counts.set(num, (counts.get(num) || 0) + 1);
    }

    // ペアの数を計算
    for (let i = 0; i < n; i++) {
        const num1 = numbers[i];
        const num2 = target - num1;

        // num2 が配列内に存在するかチェック
        if (counts.has(num2)) {
            // num1 と num2 が異なる場合 (i != j の条件を満たす)
            if (num1 !== num2) {
                // num1 と num2 が異なる場合、(i, j) の組は 2 * counts[num2] 個になる可能性がある。
                // ただし、これは i を固定したときのカウントなので、全体で重複しないように注意が必要。
                // 配列の要素の位置が異なる組を数えるため、i < j の順序で考えるのが安全。
                // 以下の方法では、i < j の順序を保証するために、ループ内で i=0 から n-1 まで走査し、
                // target - numbers[i] が numbers[j] (j > i) であることを確認する。

                // ここでは、単純に i < j のペアを数えるため、i と j を直接比較する O(N^2) に戻るか、
                // 頻度マップを使う場合は、i < j の制約を考慮する必要があります。

                // O(N^2) の再実装（安全性を優先）
                // pairCount = 0;
                // for (let i = 0; i < n; i++) {
                //     for (let j = i + 1; j < n; j++) {
                //         if (numbers[i] + numbers[j] === target) {
                //             pairCount++;
                //         }
                //     }
                // }
                // console.log(`pairs=${pairCount}`);
                // return;
            } else if (num1 === num2) {
                // num1 + num1 = target の場合 (2 * num1 = target)
                // この場合、同じ値を持つ要素が複数存在する場合のみペアが成立する。
                // numbers[i] = numbers[j] = target / 2 (i != j)
                const target_half = target / 2n;
                if (target % 2n === 0n && num1 === target_half) {
                    // target_half を持つ要素がいくつあるか
                    const count_half = counts.get(target_half) || 0;
                    // 2つの異なる要素の組み合わせの数: C(count_half, 2)
                    if (count_half >= 2) {
                        pairCount += (count_half * (count_half - 1)) / 2;
                    }
                }
            }
        }
    }

    // O(N^2) の実装で確実に、位置が異なる2個の組を数える
    pairCount = 0;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (numbers[i] + numbers[j] === target) {
                pairCount++;
            }
        }
    }

    console.log(`pairs=${pairCount}`);
}

solve();
