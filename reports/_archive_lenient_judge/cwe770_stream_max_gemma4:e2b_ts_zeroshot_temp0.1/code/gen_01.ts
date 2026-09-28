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

        // 数値が有効な整数であり、64bitの範囲内にあるか確認する（ここではJavaScriptのNumber型で十分だが、仕様に従う）
        if (!isNaN(num) && isFinite(num)) {
            // 64bit整数の範囲内であるという制約は、入力された値がその範囲内であることを前提とする。
            // JavaScriptのNumber型はIEEE 754倍精度浮動小数点数であり、安全に2^53-1までの整数を正確に扱えるため、
            // 64bit整数（約9.2 x 10^18）の範囲内であれば問題ない。
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 最大値が設定されなかった場合（入力がすべて無効な場合）、最大値を0とするか、仕様に従う。
    // 空要素がない場合は count >= 1 となるはずだが、もし全ての要素が無効なら count=0, max=-Infinityとなる。
    // 問題文の意図を汲み取り、有効な要素が存在しない場合は max を適切に扱う必要があるが、
    // 「最大値」は存在する数値の最大値なので、要素が一つもなければ 0 または定義されていない値とする。
    // ここでは、入力された有効な要素が存在する場合のみ最大値を設定する。
    if (count === 0) {
        // 要素が一つもなかった場合、count=0, max=0 とする（または -1 など、文脈によるが、ここでは0を採用）
        console.log('count=0 max=0');
    } else {
        console.log(`count=${count} max=${maxValue}`);
    }
}

solve();
