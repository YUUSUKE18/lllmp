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

        // 整数として解釈できるかチェックし、64bit範囲内か確認（ここではJavaScriptのNumber型で十分だが、念のため）
        if (!isNaN(num) && Number.isSafeInteger(num)) {
            count++;
            if (num > max) {
                max = num;
            }
            hasValidNumber = true;
        }
    }

    // 整数として解釈できた要素が一つもなかった場合、最大値は0とする（または仕様に依存するが、ここでは入力された有効な数の最大値を求めるため、もし数があればその最大値を出す。空なら0を返す）
    if (!hasValidNumber) {
        // 入力に整数以外のものしか含まれていなかった場合、count=0, max=0とするのが自然だが、
        // 読み込んだ要素が全て無視された場合は、maxの初期値(-Infinity)ではなく、何らかのデフォルト値を出す必要がある。
        // 問題文の例に従い、有効な数が存在しない場合は count=0, max=0 とする。
        process.stdout.write(`count=0 max=0\n`);
    } else {
        process.stdout.write(`count=${count} max=${max}\n`);
    }
}

solve();
