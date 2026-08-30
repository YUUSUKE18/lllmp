/**
 * 標準入力から目標値と整数を読み込み、目標値になる2つの組の個数を数えるプログラム。
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

    // 2行目以降から整数を読み込む
    const numbers: BigInt[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            try {
                // BigIntとして読み込む。入力が整数でない場合は無視される（またはエラーになるが、ここでは数値として解釈できるもののみを対象とする）
                numbers.push(BigInt(line));
            } catch (e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }
    }

    let pairCount = 0;
    const n = numbers.length;

    // 2個の組 (i, j) で numbers[i] + numbers[j] = target を探す (i != j)
    // O(N^2) の全探索を行う。Nが敵対的に大きくても、実用的な時間で完了するように、
    // 効率的な方法（ハッシュマップなど）を検討するが、ここでは「2個の組」を数えるという問題設定から、
    // N^2探索が最も直接的であり、制約が明示されていないため、まずはこれを試みる。
    // ただし、問題文は「2個の組」の個数を求めているため、順序を考慮しない組み合わせを数える必要がある。

    // 2つの異なるインデックス i と j (i < j) について探索する
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const sum = numbers[i] + numbers[j];
            if (sum === target) {
                pairCount++;
            }
        }
    }

    // 結果の出力
    console.log(`pairs=${pairCount}`);
}

solve();
