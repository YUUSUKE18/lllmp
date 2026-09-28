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

    // 最大値が設定されていない（入力がすべて無効だった）場合の処理。仕様上、空要素や不正な要素は無視されるため、少なくとも1つ以上の有効な要素があれば count と maxValue は計算される。
    if (count === 0) {
        // 入力が完全に空または無効な場合
        console.log('count=0 max=0');
    } else {
        // 結果を出力
        console.log(`count=${count} max=${maxValue}`);
    }
}

solve();
