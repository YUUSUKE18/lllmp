import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log('count=0 max=0');
        return;
    }

    const parts = input.split(',');

    let count = 0;
    let maxVal = -Infinity;
    let validNumbersFound = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === '') {
            continue;
        }

        // 整数として解釈を試みる
        const num = Number(trimmedPart);

        // 数値であり、かつ64bit整数の範囲内であるかチェック
        if (!isNaN(num) && isFinite(num) && num >= -(2**53) && num <= (2**53 - 1)) { // JavaScriptの安全な整数範囲を考慮しつつ、一般的な64bit整数として扱う
            count++;
            if (num > maxVal) {
                maxVal = num;
            }
            validNumbersFound = true;
        }
    }

    // 入力された要素が一つも有効な整数でなかった場合（すべて無視された場合）
    if (!validNumbersFound) {
        // 仕様上、空の入力や無効な入力があった場合の具体的な要求はないが、
        // 0個と最小値として-Infinity（または適切なデフォルト値。ここでは最大値が存在しないため、0とするか、文脈に応じて判断が必要だが、要素数0の場合はmaxも未定義だが、安全のため0とする）
        console.log('count=0 max=0');
    } else {
        // 64bit整数の範囲に収まっていることを確認（実際にはNode.jsのNumber型がIEEE 754倍精度で扱われるため、厳密な2^63-1チェックは冗長だが、ここでは最大値を出力する）
        console.log(`count=${count} max=${maxVal}`);
    }
}

solve();
