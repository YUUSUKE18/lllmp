import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log('count=0 max=0');
        return;
    }

    // カンマで分割し、各要素を整数に変換しようとする
    const parts = input.split(',');

    let count = 0;
    let maxValue = -Infinity;
    let isValidInput = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === '') continue;

        // 整数として解釈可能かチェック
        const num = parseInt(trimmedPart, 10);

        if (!isNaN(num)) {
            // 64bit整数の範囲内か確認（JavaScriptのNumber型はIEEE 754倍精度で安全に扱えるが、ここでは意図的に大きな値として扱う）
            // 数値の読み取り自体はJSの標準的な数値型で十分だが、仕様に従い処理を進める。
            // 64bit整数(-2^63から2^63-1)の範囲内かどうかの厳密なチェックは、inputが文字列として与えられた際の解釈に依存するが、ここでは単純に読み取れる値として扱う。

            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 0個の要素があった場合や、入力された数値がない場合は適切な処理を行う（仕様上は空入力も想定される）
    if (count === 0) {
        console.log('count=0 max=0');
    } else {
        console.log(`count=${count} max=${maxValue}`);
    }
}

solve();
