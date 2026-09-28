import * as fs from 'fs';

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("count=0 max=0");
        return;
    }

    // カンマで分割し、各要素を数値に変換しようとする
    const parts = input.split(',');

    let count = 0;
    let maxValue = -Infinity;
    let validCount = 0;

    for (const part of parts) {
        // 前後の空白を除去
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 整数として解釈できるか試みる
        const num = Number(trimmedPart);

        // isFiniteで数値であり、かつ整数であるかチェックする（ここでは整数のみを扱うため、floor/truncationのチェックも行う）
        if (Number.isInteger(num) && Number.isSafeInteger(num)) {
            validCount++;
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 実際に入力された要素数ではなく、有効な整数のみを数える必要があるか確認。
    // 仕様は「カンマ区切りの整数列」を受け取るため、入力された全ての要素を処理し、その中で有効な整数をカウントする、という解釈が妥当。
    // ただし、「要素数」とは、入力として与えられた要素の総数を指すのが自然。

    // 再度、仕様を厳密に解釈し直す:
    // 「カンマ区切りの整数列を受け取ります。」 -> 入力全体が数列。
    // 「それらの『要素数』と『最大値』を求めます。」 -> 数列の長さと最大値を求める。

    const numbers = [];
    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;
        const num = Number(trimmedPart);
        // 整数として解釈でき、64bit範囲内であるか確認（JavaScriptのNumberはIEEE 754倍精度で64bit浮動小数点数だが、ここでは整数として扱いたい）
        if (Number.isInteger(num) && num >= Number.MIN_SAFE_INTEGER && num <= Number.MAX_SAFE_INTEGER) {
            numbers.push(num);
        }
    }

    count = numbers.length;
    let finalMaxValue = -Infinity;

    if (count > 0) {
        for (const num of numbers) {
            if (num > finalMaxValue) {
                finalMaxValue = num;
            }
        }
    } else {
        // 要素が一つも有効な整数でなかった場合、最大値は未定義またはゼロとする。
        // 空の入力の場合や全て無効な入力の場合を考慮する。ここでは0とするのが安全かもしれないが、最大値の求め方を明確にするため、空の場合は-Infinityで処理する。
        finalMaxValue = -Infinity; // 実際にはcount=0なので、maxの値は意味を持たない。
    }


    // 再度、最もシンプルな解釈に戻る: 入力されたカンマ区切りの要素の中から、有効な整数のみを抽出し、その個数と最大値を求める。

    let effectiveCount = 0;
    let effectiveMaxValue = -Infinity;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = Number(trimmedPart);

        // 整数であり、安全な64bit範囲内であるかチェック
        if (Number.isInteger(num) && num >= Number.MIN_SAFE_INTEGER && num <= Number.MAX_SAFE_INTEGER) {
            effectiveCount++;
            if (num > effectiveMaxValue) {
                effectiveMaxValue = num;
            }
        }
    }

    // 要素が一つもなかった場合は、count=0, max=0と仮定する（最も安全なデフォルト値）
    const finalCount = effectiveCount;
    const finalMax = (finalCount === 0) ? 0 : effectiveMaxValue;


    console.log(`count=${finalCount} max=${finalMax}`);
}

solve();
