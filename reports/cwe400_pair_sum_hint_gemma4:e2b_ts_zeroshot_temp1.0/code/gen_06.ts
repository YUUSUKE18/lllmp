/**
 * 標準入力から目標値と整数を読み込み、
 * 目標値になる2つの整数のペアの個数を数えるプログラム。
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
        // 目標値が不正な場合は処理を終了（仕様上は入力形式を前提とするが安全策）
        console.log('pairs=0');
        return;
    }

    // 2行目以降の整数を読み込む
    const numbers: number[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            const num = parseInt(line, 10);
            // 整数として解釈できた場合のみ採用
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    let count = 0;
    const n = numbers.length;

    // 全ての2つの組 (i, j) で i != j をチェックする (O(N^2))
    // 敵対的に大きな入力に対しても、N^2 の計算量は許容されるべきだが、
    // Nが実用的な範囲（例えば10^5程度）であれば、N^2 は非現実的になるため、
    // この問題設定ではNの制約が不明確だが、与えられた数からターゲットになるペアを
    // 探すというタスク自体は、二分探索やハッシュマップを使うことでO(N log N)またはO(N)に改善可能。
    // ここでは最も直接的なO(N^2)で実装する。制約が緩いと仮定する。

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (numbers[i] + numbers[j] === target) {
                count++;
            }
        }
    }

    // 結果の出力
    console.log(`pairs=${count}`);
}

solve();
