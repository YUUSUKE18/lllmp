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

        // 数値として有効であり、64bit整数の範囲内であるかを確認する（ここではJavaScriptのNumber型が十分に対応できると仮定し、大きな数値エラーは無視する）
        if (!isNaN(num)) {
            // 整数として解釈できた場合
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 最大値が設定されていない（入力がすべて無効だった）場合の処理。仕様上、空要素は無視されるため、もし有効な要素が一つもなかった場合は count=0, max=0 とするのが自然だが、
    // 最小値の制約がないため、ここでは最大値を -Infinity のままにするか、あるいは入力が空の場合は 0 を返すように調整する。
    // 仕様に基づき、要素が存在すればその最大値を求める。もし要素が一つもなかった場合、count=0, max=0 とする。

    if (count === 0) {
        console.log('count=0 max=0');
    } else {
        // maxValueは初期値 -Infinity から更新されているはず
        console.log(`count=${count} max=${maxValue}`);
    }
}

solve();
