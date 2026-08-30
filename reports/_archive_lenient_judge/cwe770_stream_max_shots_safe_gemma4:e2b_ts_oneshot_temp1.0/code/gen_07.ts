import * as process from "process";
import * as readline from "readline";

function solve() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        crlfDelay: Infinity
    });

    let input = "";
    rl.on("line", (line) => {
        input += line + "\n";
    });

    rl.on("close", () => {
        if (!input.trim()) {
            process.stdout.write("count=0 max=0\n");
            return;
        }

        // カンマで分割し、空白を除去して整数に変換
        const parts = input.trim().split(',').map(s => s.trim()).filter(s => s.length > 0);

        let count = 0;
        let maxVal = -Infinity;

        for (const part of parts) {
            // 整数として解釈できるかチェック（カンマやスペースで区切られた部分を想定）
            // 今回の仕様では、入力全体がカンマ区切りの整数列であるため、
            // 各要素が整数であると仮定して処理を進める。

            const num = parseInt(part, 10);
            if (!isNaN(num)) {
                count++;
                if (num > maxVal) {
                    maxVal = num;
                }
            }
        }

        // 空要素や非整数は無視されたため、カウントと最大値を計算した結果を出力
        process.stdout.write(`count=${count} max=${maxVal}\n`);
    });
}

solve();
