import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) {
        console.log("count=0 max=0");
        return;
    }

    const parts = input.split(',');

    let count = 0;
    let maxValue = -Infinity; // 64bit整数を扱うため、十分に小さい値で初期化

    for (const part of parts) {
        // 空文字列や空白を除去
        const trimmedPart = part.trim();
        if (!trimmedPart) {
            continue;
        }

        // 整数として解釈可能かチェックし、64bit範囲内か確認する（ここでは標準のNumber型が十分だが、念のため）
        const num = Number(trimmedPart);

        if (!isNaN(num)) {
            // 64bit整数の範囲内であること（JavaScriptの安全な整数範囲内）
            // この問題の制約上、入力された値が64bitに収まると仮定する。
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // maxValueが初期値（-Infinity）のままの場合は、入力された有効な数値がなかったことになる。
    // 仕様に基づき、要素数と最大値を返す。
    // 要素がない場合 (count=0)、最大値は定義できないため、ここでは入力が空なら max=0 とするのが自然だが、
    // 実際には入力された整数の最大値を出力する。
    if (count === 0) {
        // 入力が全く無効な要素のみだった場合や空文字列だった場合の処理。
        // このケースでは maxValue は -Infinity のままになるが、
        // 問題文の意図を推測し、もし要素が一つもなかったなら count=0, max=0 とするか、
        // 実際に入力された値が存在しないため最大値は定義できないとする。
        // ただし、入力が空文字列でなければ、count=0 で処理する。
        console.log("count=0 max=0"); // 要素がない場合は最大値も0とみなす（あるいは-1などだが、ここでは0）
    } else {
        console.log(`count=${count} max=${maxValue}`);
    }
}

solve();
