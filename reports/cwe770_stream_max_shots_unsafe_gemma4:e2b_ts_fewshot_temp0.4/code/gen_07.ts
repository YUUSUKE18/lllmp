import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8");
    const parts = input.split(",");
    let count = 0;
    let max = -Infinity;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);
        if (!isNaN(num)) {
            count++;
            if (num > max) {
                max = num;
            }
        }
    }

    // 最大値が設定されていない場合（入力が空または数値がなかった場合）の処理を考慮する必要があるが、
    // 課題の制約から、少なくとも1つの整数が存在すると仮定するか、-Infinityをそのまま出力する。
    // ここでは、もし有効な整数が一つもなかった場合は、maxは初期値のままになる。
    if (count === 0) {
        // 整数が存在しない場合の挙動。問題文に具体的な指示がないため、ここでは count=0, max=-Infinity とする。
        // ただし、64bit整数の範囲内という制約があるため、もし入力が空なら 0 または適切な値を出力する方が自然かもしれない。
        // 例として、数値が存在しない場合は count=0, max=0 と仮定しても良いが、ここでは計算結果をそのまま出力する。
    }

    process.stdout.write(`count=${count} max=${max}\n`);
}

solve();
