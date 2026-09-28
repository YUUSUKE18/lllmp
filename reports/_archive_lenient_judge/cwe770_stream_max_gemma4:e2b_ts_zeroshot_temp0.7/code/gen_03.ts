import * as fs from 'fs';

function solve() {
    // 標準入力からデータを読み込む
    const input = fs.readFileSync(0, 'utf8').trim();

    if (!input) {
        // 入力が空の場合は何も出力しない
        return;
    }

    // カンマで分割し、各要素を整数に変換しようとする
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity; // 64bit整数の範囲を考慮するため、初期値は非常に小さい値にする

    for (const part of parts) {
        // 前後の空白を除去
        const trimmedPart = part.trim();

        if (trimmedPart === "") {
            continue;
        }

        // 整数として解釈可能かチェックし、数値に変換する
        const num = Number(trimmedPart);

        // isFiniteで有限な数値であり、かつ整数であるかを確認する（非整数やNaNは無視）
        if (Number.isInteger(num) && isFinite(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 結果を出力する
    console.log(`count=${count} max=${maxValue}`);
}

solve();
