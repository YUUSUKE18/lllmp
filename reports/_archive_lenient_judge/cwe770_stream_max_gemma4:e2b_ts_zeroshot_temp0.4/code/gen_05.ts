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
    let maxValue = -Infinity; // 64bitの範囲内に収まることを考慮して初期値を設定

    for (const part of parts) {
        // 前後の空白を無視して整数に変換を試みる
        const trimmedPart = part.trim();
        if (trimmedPart === '') {
            continue;
        }

        // 整数として解釈可能かチェックし、64bitの範囲内か確認する（ここではJavaScriptのNumber型で十分だが、仕様に従う）
        const num = Number(trimmedPart);

        // isFiniteで数値であることを確認し、整数であるかを確認する（小数点を含む場合は無視）
        if (Number.isInteger(num) && Number.isFinite(num)) {
            // 64bitの範囲内（JavaScriptの安全な整数範囲内）を想定
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 最大値が設定されていない場合（入力がすべて無効だった場合）、最大値を0とするか、仕様に従って適切な値を設定する。
    // 入力が空または無効な要素のみの場合、count=0, max=0 とするのが自然だが、ここでは読み取れた最大値を出力する。
    if (count === 0) {
        // 要素が一つも有効でなかった場合
        console.log('count=0 max=0');
    } else {
        // 最大値が-Infinityのままの場合（これはありえないはずだが念のため）
        const finalMaxValue = maxValue === -Infinity ? 0 : maxValue;
        console.log(`count=${count} max=${finalMaxValue}`);
    }
}

solve();
