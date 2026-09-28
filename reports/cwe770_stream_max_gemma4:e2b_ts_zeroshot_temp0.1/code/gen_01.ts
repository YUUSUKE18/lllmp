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

        // 整数に変換を試みる
        const num = parseInt(trimmedPart, 10);

        // 数値として有効であり、64bit整数の範囲内であるかを確認する（ここではJavaScriptのNumber型が十分に対応できると仮定し、一般的な安全性を確認）
        if (!isNaN(num)) {
            // 整数として解釈できた場合
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 最大値が設定されていない（入力がすべて無効だった、または空だった）場合の処理
    if (count === 0) {
        // 仕様上、要素数と最大値を求める必要がある。入力が空または無効な場合、0, 0とするのが妥当だが、
        // 最大値の初期値が-Infinityのため、もし count=0 なら max は定義されない。
        // ここでは、入力された有効な数値がない場合は count=0, max=0 とする。
        console.log('count=0 max=0');
    } else {
        console.log(`count=${count} max=${maxValue}`);
    }
}

solve();
