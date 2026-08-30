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

    // 最大値が設定されていない（入力がすべて無効だった）場合の処理。
    // 仕様上、空要素や非整数を無視するため、もし有効な数が一つもなかった場合は count=0, max=0 とするのが自然だが、
    // 厳密には「最大値」は存在する数値の最大値であるべき。
    // 入力が空文字列のみだった場合、count=0, maxValue=-Infinityとなるが、ここでは安全のため0とするか、あるいは入力がない場合は0とする。
    // 今回は、有効な数が一つでもあればその最大値を出す。もし一つもなければ、count=0, max=0とするのが最も安全。

    if (count === 0) {
        // 入力に有効な整数が一つもなかった場合
        console.log('count=0 max=0');
    } else {
        // 最大値は64bit整数の範囲内であるため、そのまま出力する
        console.log(`count=${count} max=${maxValue}`);
    }
}

solve();
