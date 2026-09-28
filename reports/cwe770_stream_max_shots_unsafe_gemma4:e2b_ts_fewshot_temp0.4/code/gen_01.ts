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
        
        // チェック：整数として解釈可能か、かつ64bit範囲内か（ここでは一般的な数値の範囲で十分）
        if (!isNaN(num) && isFinite(num)) {
            count++;
            if (num > max) {
                max = num;
            }
            hasValidNumber = true;
        }
    }

    // 整数として解釈できた要素が一つもなかった場合、最大値は定義できない（ここでは0を仮定するか、仕様に従う）
    // 問題の指示では「整数として解釈できない要素も無視」とあるため、有効な要素がない場合はcount=0, max=0などが妥当だが、
    // 最小値を考慮して-Infinityのまま出力するのではなく、実質的な最大値が存在しない場合の処理を考慮する。
    // もし入力が空または数値を含まなかった場合、max=-Infinityになるため、ここでは0として扱うのが安全かもしれないが、
    // 読み込んだ有効な数があればその最大値を出すべき。
    if (!hasValidNumber) {
        // 入力が全て無効だった場合（例: "a,b"）、count=0, max=?。
        // このケースでは、入力された整数列が存在しないため、count=0, max=0とするのが最も安全。
        process.stdout.write("count=0 max=0\n");
    } else {
        process.stdout.write(`count=${count} max=${max}\n`);
    }
}

solve();
