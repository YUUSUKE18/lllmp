/**
 * 標準入力から目標値と整数列を読み込み、目標値になる2つの組の数を計算する。
 */
function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length < 2) {
        console.log('pairs=0');
        return;
    }

    // 1行目が目標値
    const target = parseInt(input[0].trim());
    if (isNaN(target)) {
        // 目標値が不正な場合は処理を終了（仕様上は入力が保証されているが念のため）
        console.log('pairs=0');
        return;
    }

    // 2行目以降の整数を読み込む
    const numbers: number[] = [];
    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line) {
            const num = parseInt(line);
            // 整数として解釈できるか確認し、読み込んだ値が有効な整数か確認（ここでは読み込んだ値のみを格納）
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    // 2つ以上の要素があるか確認
    if (numbers.length < 2) {
        console.log('pairs=0');
        return;
    }

    // 2つの組の数を数える（二重ループでO(N^2)）
    let count = 0;
    const n = numbers.length;

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (numbers[i] + numbers[j] === target) {
                count++;
            }
        }
    }

    // 結果を出力
    console.log(`pairs=${count}`);
}

solve();
