/**
 * 標準入力から目標値と整数を受け取り、目標値になる2つの組の個数を数えるプログラム。
 */
function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length < 2) {
        // 入力が不足している場合は何も出力しない
        return;
    }

    // 1行目が目標値
    const target = BigInt(input[0].trim());

    // 2行目以降の整数のリスト
    const numbers: BigInt[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            try {
                // BigIntとしてパース
                numbers.push(BigInt(line));
            } catch (e) {
                // 整数として解釈できない行は無視（仕様上、ここでは入力の構造を厳密に守る必要はあるが、
                // 後の処理で数値として扱えるものだけを採用する）
                continue;
            }
        }
    }

    let pairCount = 0;
    const n = numbers.length;

    // すべての2つの組 (i, j) と i != j についてチェックする
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            // numbers[i] + numbers[j] が目標値になるかチェック
            const sum = numbers[i] + numbers[j];
            if (sum === target) {
                pairCount++;
            }
        }
    }

    // 結果を出力
    console.log(`pairs=${pairCount}`);
}

solve();
