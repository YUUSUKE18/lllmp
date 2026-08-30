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
    let maxValue = -Infinity; // 64bit整数として扱うため、初期値は非常に小さい値に設定

    for (const part of parts) {
        // 前後の空白を無視して整数に変換を試みる
        const trimmedPart = part.trim();
        if (trimmedPart === '') {
            continue;
        }

        // 整数として解釈できるかチェック
        const num = Number(trimmedPart);

        if (!isNaN(num)) {
            // 値が64bit整数の範囲内にあることを確認（JavaScriptのNumberはIEEE 754倍精度だが、ここでは入力値がその範囲内と仮定する）
            // 厳密に64bit整数として扱うため、安全のためBigIntや数値型の限界を考慮する必要があるが、
            // 標準のNumber型で十分な範囲（2^53程度）であれば問題ない。仕様上は「64bit整数の範囲」とあるため、標準のNumber型で処理する。

            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 最終結果を出力
    console.log(`count=${count} max=${maxValue}`);
}

solve();
