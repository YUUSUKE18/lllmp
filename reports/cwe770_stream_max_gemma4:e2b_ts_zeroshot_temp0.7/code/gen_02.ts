/**
 * 標準入力からカンマ区切りの整数列を受け取り、要素数と最大値を計算して出力するプログラム。
 */

function solve() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("count=0 max=-Infinity"); // 空入力の場合の処理（最大値として-Infinityを仮定）
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.split(',');

    let count = 0;
    let maxValue = -Infinity; // 64bitの範囲を考慮するため、初期値は非常に小さい値に設定

    for (const part of parts) {
        // 前後の空白を除去
        const trimmedPart = part.trim();
        if (trimmedPart === "") {
            continue; // 空要素は無視
        }

        // 整数として解釈可能かチェックし、変換を試みる
        const num = Number(trimmedPart);

        // isFiniteで有限数であること（NaN, Infinityなどを除く）と、整数であること（小数点以下がないこと）をチェックする。
        // 仕様では「整数として解釈できない要素も無視」とあるため、Number()が整数に変換できるかを確認する。
        if (Number.isInteger(num)) {
            // 64bitの範囲内にあるか確認（Node.jsのNumber型はIEEE 754倍精度で安全だが、ここでは明示的なチェックを念のため）
            // 実際にはJavaScriptのNumber型は安全に扱うが、制約を満たしていることを前提とする。
            
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 結果を出力
    console.log(`count=${count} max=${maxValue}`);
}

solve();
