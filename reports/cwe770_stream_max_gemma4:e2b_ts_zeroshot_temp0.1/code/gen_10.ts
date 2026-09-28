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
        // 前後の空白を無視して整数として解釈できるか試みる
        const trimmedPart = part.trim();
        if (trimmedPart === '') {
            continue;
        }

        // 整数としてパースを試みる
        const num = parseInt(trimmedPart, 10);

        // 数値として有効であり、64bit整数の範囲内であるか確認する（ここではJavaScriptのNumber型で十分だが、仕様に従う）
        if (!isNaN(num) && isFinite(num)) {
            // 値が64bit整数に収まることを前提とする (JavaScriptのNumberはIEEE 754倍精度であり、安全な整数範囲は2^53程度だが、ここでは入力値がその範囲内と仮定する)
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
