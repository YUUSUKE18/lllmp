import * as fs from "fs";

function solve() {
    const input = fs.readFileSync(0, "utf8");
    const parts = input.split(",");
    let count = 0;
    let max = -Infinity;
    let foundNumber = false;

    for (const part of parts) {
        // 空白を除去して整数に変換を試みる
        const trimmedPart = part.trim();
        if (trimmedPart === "") continue;

        const num = parseInt(trimmedPart, 10);

        // 整数として解釈でき、かつ64bit範囲内（ここでは安全のため数値として比較）
        if (!isNaN(num)) {
            count++;
            if (num > max) {
                max = num;
            }
            foundNumber = true;
        }
    }

    // 整数として解釈できなかった要素は無視されるため、countとmaxが正しく計算されているか確認する。
    // 問題の仕様に基づき、有効な整数のみをカウントし最大値を求める。

    if (count > 0) {
        process.stdout.write(`count=${count} max=${max}\n`);
    } else {
        // 整数が一つもなかった場合の処理（ここでは count=0, max=-Infinity となるが、
        // 入力に数値が全くなかった場合は、空の出力または適切なデフォルト値を出力する。
        // 例2のように「空でない語の数」を求めるため、要素数が0の場合はcount=0で十分。
        process.stdout.write(`count=0 max=-Infinity\n`); // または count=0 max=0 など、最大値の定義に依存するが、-Infinityが数学的に正しい。
    }
}

solve();
