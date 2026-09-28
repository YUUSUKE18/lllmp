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

        // 数値として有効であり、64bit整数の範囲内であるかを確認する（ここではJavaScriptのNumber型で十分だが、仕様に従う）
        if (!isNaN(num)) {
            // 整数として解釈できた場合
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 最大値が設定されなかった場合（入力が全て無効な要素のみだった場合）、最大値を0とするか、あるいは仕様に従って適切な処理を行う。
    // 入力が空または無効な要素のみの場合、count=0, max=0とするのが自然だが、ここでは見つかった最大値を出力する。
    // もし入力が一つも有効な整数を含まなかった場合、maxValueは-Infinityのままになるため、count=0, max=0とするのが安全かもしれない。
    if (count === 0) {
        console.log('count=0 max=0');
    } else {
        // maxValueが-Infinityでなければ、それを出力する
        console.log(`count=${count} max=${maxValue}`);
    }
}

solve();
