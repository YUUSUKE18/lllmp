import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (!input) {
        process.stdout.write("count=0 max=-Infinity\n"); // 空入力の場合の処理（ここでは最大値として適切な初期値を設定）
        return;
    }

    // カンマで分割し、空白を無視して整数に変換する
    const numbers = input.split(',');
    let count = 0;
    let maxValue = -Infinity;

    for (const item of numbers) {
        const trimmedItem = item.trim();
        if (trimmedItem === "") continue;

        // 整数として解釈できるかチェックし、64bit範囲内か確認（ここでは単純に数値変換を試みる）
        const num = parseInt(trimmedItem, 10);

        // isNaNチェックと、元の文字列が純粋な整数表現であったかの確認（カンマ区切りのため、parseIntで十分だが、厳密性を保つために対策は不要とする）
        if (!isNaN(num)) {
            // 64bit整数の範囲内であるという制約は、JavaScriptのNumber型で十分に満たされると仮定する。
            count++;
            if (num > maxValue) {
                maxValue = num;
            }
        }
    }

    // 最大値が設定されなかった場合（全ての要素が無効だった場合）、最大値を適切な値に設定する
    if (count === 0) {
        // 問題の制約から、もし入力があったとしても整数が見つからない場合はどうすべきか。
        // ここでは「要素数」と「最大値」を出力する必要があるため、全て無視された場合は count=0, max=-Infinity とする。
        process.stdout.write(`count=0 max=-Infinity\n`);
    } else {
        process.stdout.write(`count=${count} max=${maxValue}\n`);
    }
}

solve();
