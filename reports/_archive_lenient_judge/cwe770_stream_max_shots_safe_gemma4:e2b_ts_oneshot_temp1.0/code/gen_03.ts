import * as process from "process";
import * as readline from "readline";

async function solve() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        crlfDelay: Infinity
    });

    let input = "";
    await new Promise((resolve) => {
        rl.on("line", (line) => {
            input += line + "\n";
        });
        rl.on("close", () => {
            resolve();
        });
    });

    // カンマで分割し、空白を除去して数値に変換する
    const numbers = input.trim().split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));

    if (numbers.length === 0) {
        process.stdout.write("count=0 max=-Infinity\n"); // または適切なデフォルト値
        return;
    }

    let count = numbers.length;
    let maxVal = -Infinity;

    for (const num of numbers) {
        if (num > maxVal) {
            maxVal = num;
        }
    }

    process.stdout.write(`count=${count} max=${maxVal}\n`);
}

solve();
