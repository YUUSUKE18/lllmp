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
    let maxValue = -Infinity; // 64bit整数の範囲内なので、非常に小さな値で初期化

    for (const part of parts) {
        // 前後の空白を無視して整数として解釈できるか試みる
        const trimmedPart = part.trim();
        if (trimmedPart === "") {
            continue;
        }

        // 整数としてパースを試みる
        const num = parseInt(trimmedPart, 10);

        // 数値として有効であり、64bitの範囲内であるかを確認する（ここではJavaScriptのNumber型で十分だが、仕様に厳密に従う）
        if (!isNaN(num) && isFinite(num)) {
            // 64bit整数の範囲内 (2^63 - 1, 2^63) に収まることを確認。
            // JavaScriptのNumberはIEEE 754倍精度であり、安全に大きな整数を扱えるが、ここでは入力された値がその範囲内であることを前提とする。
            // parseIntの結果が安全な数値であれば採用する。
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 最終結果を出力
    console.log(`count=${count} max=${maxValue}`);
}

solve();
