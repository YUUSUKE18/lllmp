import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8");
    // カンマで分割し、トリムして空でない要素のみを抽出する
    const parts = input.split(",");
    let count = 0;
    let maxValue = -Infinity;
    let foundNumber = false;

    for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        // 整数として解釈できるか試みる
        const num = parseInt(trimmedPart, 10);

        if (!Number.isNaN(num)) {
            count++;
            if (!foundNumber || num > maxValue) {
                maxValue = num;
                foundNumber = true;
            }
        }
    }

    // すべての要素が整数だった場合、最大値が出力されるようにする (問題の意図から、数があることを前提とする)
    if (count === 0) {
        // 整数が一つも見つからなかった場合は、仕様に厳密に従うため、ここでは適切な初期値を設定する必要がある。
        // ただし、入力されたものがすべて無効な場合、最大値の定義は曖昧になる。
        // 例として、数がない場合は count=0, max=?? となるが、-Infinity が最も安全かもしれない。
        // 課題の例に従い、整数列があることを前提とし、もし全て無視されればcount=0となる。
        // ここでは、有効な整数が見つからなかった場合も、カウントと最大値を出力する。
        // 空の入力の場合、count=0, max=-Infinity となるが、出力形式を維持するため、
        // 実際に出力したい値が得られればよい。
        // 多くの競技プログラミングの問題では、データが存在しない場合は別途指示があるため、ここでは計算結果を出力する。
    }

    process.stdout.write(`count=${count} max=${maxValue}\n`);
}

solve();
