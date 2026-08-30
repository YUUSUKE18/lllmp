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
        // 前後の空白を無視して整数として解釈できるか試みる
        const trimmedPart = part.trim();
        if (trimmedPart === '') {
            continue;
        }

        // 整数としてパースを試みる
        const num = parseInt(trimmedPart, 10);

        // isNaNチェックと、元の文字列が完全に数字のみで構成されているか（つまり、非整数文字が含まれていないか）を確認する
        if (!isNaN(num) && String(num) === trimmedPart) {
            // 値が64bit整数の範囲内であることを確認（JavaScriptのNumber型はIEEE 754倍精度であり、安全に扱える範囲だが、ここでは入力された値がその範囲内であるという前提で処理を進める）

            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 空の要素や非整数要素を無視した結果を出力
    console.log(`count=${count} max=${maxValue}`);
}

solve();
