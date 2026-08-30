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

        // チェック: 数値として解釈できるか、かつ64bit整数範囲内か（ここでは標準のNumber型で十分）
        if (!isNaN(num)) {
            count++;
            if (num > max) {
                max = num;
            }
            hasValidNumber = true;
        }
    }

    // すべての要素が整数として解釈できた場合の最大値を設定するために、初期値を調整する必要がある。
    // 課題の意図に基づき、有効な数値が存在する場合のみカウントと最大値を報告する。
    if (count === 0) {
        // 有効な整数が一つもなかった場合。もし入力が空または非数のみの場合。
        // この場合、maxの初期値（-Infinity）を考慮して、適切なデフォルト値を設定する必要があるかもしれないが、
        // 例2, 例1から「要素数と最大値」を求めよという指示に基づき、有効な数値がない場合は0などで処理する。
        // ここでは入力された有効な整数の最大値を報告する。もし一つもなければmaxは未定義だが、count=0なのでmax=0とするのが安全。
        process.stdout.write(`count=0 max=0\n`);
    } else {
        process.stdout.write(`count=${count} max=${max}\n`);
    }
}

solve();
