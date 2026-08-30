import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8").trim();
    if (input === "") {
        process.stdout.write("count=0 max=0\n");
        return;
    }

    const parts = input.split(',');
    let count = 0;
    let maxVal = -Infinity;
    let validCount = 0;

    for (const part of parts) {
        const numStr = part.trim();
        if (numStr === "") continue;

        const num = Number(numStr);

        // 整数として解釈できるか確認し、64bit範囲内か確認
        if (!isNaN(num) && Number.isSafeInteger(num)) {
            count++;
            if (num > maxVal) {
                maxVal = num;
            }
        }
    }

    // 空要素や不正な要素は無視され、有効な整数のみをカウントと最大値に反映される。
    if (count === 0) {
        // 入力が空または数値が含まれていなかった場合、maxは未定義だが仕様に従い0とする（実際には-Infinityが初期値だが、入力がなければ実質的な最大値はないため0とする）
        process.stdout.write("count=0 max=0\n");
    } else {
        process.stdout.write(`count=${count} max=${maxVal}\n`);
    }
}

solve();
