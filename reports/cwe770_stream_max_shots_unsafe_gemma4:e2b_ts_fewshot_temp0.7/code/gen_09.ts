import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (!input) {
        process.stdout.write("count=0 max=0\n");
        return;
    }

    const parts = input.split(",");
    let count = 0;
    let max = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        // 空白をトリムして整数に変換を試みる
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈できるか確認し、64bit範囲内か（ここでは一般的なJS Numberの範囲で十分と仮定）
        if (!Number.isNaN(num)) {
            count++;
            if (num > max) {
                max = num;
            }
            hasValidNumber = true;
        }
    }

    // 整数として解釈できなかった要素があった場合でも、カウントと最大値は有効な数値のみに基づいて計算する。
    // ただし、仕様に従い「空でない語の数」をカウントする。
    // 再確認：仕様は「空でない語の数」と「最大値」を求める。
    // 整数として解釈できない要素も無視するという指示があるため、countには有効な整数のみを含めるべき。

    if (count === 0) {
        // 有効な整数が一つもなかった場合、maxは定義できないが、安全のため0または適切な値を出力する。
        // 問題文の例示がないため、入力が空または非数値のみの場合の挙動を想定し、もし有効な数がゼロ個なら max は不定だが、ここでは最大値を求めるため、-Infinityのまま出力するか、あるいは最初の要素が存在しない場合は0とするのが自然。
        // ただし、"要素数と最大値"を要求されているため、入力に数値が一つもなければ count=0, max=?となる。
        // 数値が存在しない場合の一般的なケースとして、count=0, max=0と仮定する。
        process.stdout.write(`count=0 max=0\n`);
    } else {
        process.stdout.write(`count=${count} max=${max}\n`);
    }
}

solve();
