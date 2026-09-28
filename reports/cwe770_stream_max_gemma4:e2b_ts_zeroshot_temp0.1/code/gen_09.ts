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

        // 数値として有効であり、64bit整数の範囲内であるかを確認する（ここではJavaScriptのNumber型で十分だが、仕様に従う）
        if (!isNaN(num) && isFinite(num)) {
            // 値が64bit整数に収まることを確認（通常JSのNumberはIEEE 754倍精度であり、安全な整数範囲は2^53程度。ここでは入力値がその範囲内と仮定する）
            if (num >= -(2**63) && num <= (2**63 - 1)) {
                count++;
                if (num > maxValue) {
                    maxValue = num;
                }
            }
        }
    }

    // 最大値が設定されていない場合（入力が全て無効だった場合）、最大値を0とするか、あるいは仕様に従って-Infinityを扱うか。
    // 整数列が存在しない場合は count=0, max=0 が妥当だが、ここでは見つかった最大値を出力する。
    if (count === 0) {
        // 入力が空または無効な場合、count=0, max=0とする（最も安全なデフォルト）
        console.log('count=0 max=0');
    } else {
        console.log(`count=${count} max=${maxValue}`);
    }
}

solve();
