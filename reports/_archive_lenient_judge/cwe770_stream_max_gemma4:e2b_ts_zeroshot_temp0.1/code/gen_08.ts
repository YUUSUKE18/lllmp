import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log('count=0 max=0');
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity; // 64bit整数の範囲を考慮するため、初期値は非常に小さい値とする

    for (const part of parts) {
        // 前後の空白を除去
        const trimmedPart = part.trim();
        if (trimmedPart === '') {
            continue;
        }

        // 整数として解釈できるか試みる
        const num = Number(trimmedPart);

        // isFiniteで有限数であり、かつ整数であるかを確認する（浮動小数点数の問題も考慮）
        if (Number.isInteger(num)) {
            // 値が64bit整数の範囲内にあることを確認（Node.jsのNumberはIEEE 754倍精度だが、ここでは入力値がその範囲内と仮定して処理を進める）
            // 厳密な64bit整数チェックは、JavaScriptの安全性を考慮すると、通常は問題にならないことが多いが、仕様に従い数値として扱う。

            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 結果を出力
    console.log(`count=${count} max=${maxValue}`);
}

solve();
