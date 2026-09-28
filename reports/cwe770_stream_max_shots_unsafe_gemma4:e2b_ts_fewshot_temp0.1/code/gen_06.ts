import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (input === "") {
        process.stdout.write("count=0 max=0\n");
        return;
    }

    const parts = input.split(",");
    let count = 0;
    let max = -Infinity;
    let hasValidNumber = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈可能かチェックし、64bit範囲内か確認（ここでは一般的なJSのNumber型で十分だが、念のため）
        if (!isNaN(num) && isFinite(num)) {
            count++;
            if (num > max) {
                max = num;
            }
            hasValidNumber = true;
        }
    }

    // 整数として解釈できなかった要素がすべて無視されるため、countとmaxは有効な数値のみを対象とする。
    // もし入力が空または全て無効な値だった場合、maxの初期値(-Infinity)が残る可能性があるが、
    // 仕様上「整数として解釈できない要素も無視する」ため、有効な数が一つでもあれば計算される。
    // 少なくとも1つの有効な数値があればcountとmaxは意味を持つ。
    if (!hasValidNumber) {
        // 有効な整数が一つもなかった場合（例: "a,b"）、count=0, maxの扱いは文脈依存だが、ここでは0, 0とするのが安全。
        process.stdout.write("count=0 max=0\n");
    } else {
        process.stdout.write(`count=${count} max=${max}\n`);
    }
}

solve();
