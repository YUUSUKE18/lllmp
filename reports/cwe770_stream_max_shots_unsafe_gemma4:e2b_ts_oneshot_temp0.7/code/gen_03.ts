import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (input === "") {
        process.stdout.write("count=0 max=0\n");
        return;
    }

    // カンマで分割し、各要素を数値に変換する
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);
        
        // 整数として解釈でき、かつ64bitの範囲内（ここでは安全のため大きな数でチェック）
        if (!isNaN(num) && isFinite(num)) {
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            hasValidNumber = true;
        }
    }

    // 整数として解釈できなかった要素は無視されるため、countとmaxValueが正しく計算されているか確認する。
    // 問題の要求に従い、有効な整数のみを数える。
    if (count === 0) {
        // 有効な整数が一つもなかった場合、最大値は未定義だが、ここでは安全のために0とするか、-Infinityなどのルールに従う。
        // 空入力の場合や全て無効な入力の場合の挙動を明確にするため、空入力の場合は0,0とするのが自然かもしれないが、
        // 厳密には「存在する整数」のみを数える。もし入力が "a,b" のような場合、count=0となる。
        // ここでは、読み取れた有効な整数の個数と最大値を報告する。
         if (hasValidNumber) {
             process.stdout.write(`count=${count} max=${maxValue}\n`);
         } else {
            // 有効な整数が一つもなかった場合
            process.stdout.write("count=0 max=0\n");
        }
    } else {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    }
}

solve();
