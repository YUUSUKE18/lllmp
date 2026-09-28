import { readFileSync } from "fs";

const input = readFileSync(0, "utf8");
const lines = input.split("\n");
const countStr = lines[0].trim();
if (!countStr) process.exit(0);

const n = parseInt(countStr, 10);

let sum = BigInt(0);
let count = 0;

for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;

    const parts = line.split(/[\s\u3000]+/); // 空白区切りで分割
    for (const part of parts) {
        try {
            const val = BigInt(parseInt(part, 10));
            sum += val;
            count++;
        } catch {
            // 整数として解釈できない行は無視
        }
    }
}

console.log(`count=${count} sum=${sum}`);
