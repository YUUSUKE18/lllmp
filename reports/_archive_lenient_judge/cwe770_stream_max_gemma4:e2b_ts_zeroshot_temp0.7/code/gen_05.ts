/**
 * 標準入力からカンマ区切りの整数列を受け取り、要素数と最大値を計算して出力するプログラム。
 */

function solve() {
    const input = require('fs').readFileSync(0, 'utf8').trim();

    if (input === "") {
        console.log("count=0 max=0");
        return;
    }

    // カンマで分割し、各要素を整数に変換しようと試みる
    const parts = input.split(',');
    let count = 0;
    let maxValue = -Infinity;
    let validNumbersFound = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") {
            continue; // 空の要素は無視
        }

        // 整数として解釈できるか試みる
        const num = parseInt(trimmedPart, 10);

        // isNaNチェックと、元の文字列が完全に数字のみで構成されているかを確認する（.trim()で前後の空白を処理済み）
        if (!isNaN(num) && String(num) === trimmedPart) {
            // 64bit整数範囲内であるかどうかの確認（TypeScriptのnumber型はIEEE 754倍精度だが、ここでは入力値がその範囲内と仮定する）
            // parseIntの結果をそのまま利用
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
            validNumbersFound = true;
        }
    }

    // 処理した要素が一つも有効でなかった場合（全て無視された場合）の処理。
    // 仕様上、入力があった場合は少なくとも0個の要素と、最大値は適切な値（ここでは-Infinityを扱うため特殊対応が必要だが、
    // 入力に整数のみが含まれていると仮定すれば、要素数0、最大値0などで良いが、
    // 厳密には「存在する数値」に対する処理なので、入力が空文字列や無効な文字のみだった場合はcount=0, max=0とするのが安全か。
    // 今回は「整数として解釈できない要素も無視する」ため、有効な数が一つもなかった場合は count=0, max=0 とする）

    if (!validNumbersFound) {
        console.log("count=0 max=0");
    } else {
        console.log(`count=${count} max=${maxValue}`);
    }
}

solve();
