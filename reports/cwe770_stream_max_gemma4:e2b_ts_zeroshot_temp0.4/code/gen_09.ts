import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log("count=0 max=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換しようとする
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity; // 64bit整数の範囲を考慮するため、初期値を非常に小さい値に設定

    for (const part of parts) {
        // 前後の空白を無視して整数として解釈できるかチェック
        const trimmedPart = part.trim();
        if (trimmedPart === "") {
            continue;
        }

        // 整数としてパースを試みる
        const num = parseInt(trimmedPart, 10);

        // isNaNチェックと、元の文字列が完全に数字のみで構成されているか（浮動小数点やその他の文字が含まれていないか）を確認する
        if (!isNaN(num) && String(num) === trimmedPart) {
            // 値が64bit整数の範囲内にあることを確認 (JavaScriptのNumber型はIEEE 754倍精度だが、ここでは入力値がその範囲内と仮定する)
            // 厳密に64bit整数として扱うため、安全のため数値として保持
            const intValue = Number(trimmedPart);

            count++;
            if (intValue > maxValue) {
                maxValue = intValue;
            }
        }
    }

    // 最大値が設定されていない場合（入力がすべて無効だった場合）、最大値を0とするか、仕様に従う。
    // 入力が空または無効な要素のみの場合、count=0, max=0 とするのが自然だが、ここでは見つかった最大値を出力する。
    if (count === 0) {
        // 要素が一つも有効でなかった場合、count=0, max=0 とする（あるいは仕様に依存するが、ここでは-Infinityを避けるため0とする）
        console.log("count=0 max=0");
    } else {
        console.log(`count=${count} max=${maxValue}`);
    }
}

solve();
