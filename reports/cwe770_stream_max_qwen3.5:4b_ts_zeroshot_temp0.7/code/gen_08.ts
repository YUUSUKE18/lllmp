import { createInterface } from "readline";

const rl = createInterface({ input: process.stdin, output: process.stdout });

let count = 0;
let maxVal: number | undefined;

rl.on("line", (line) => {
    const parts = line.split(",").map((s) => parseInt(s.trim(), 10)).filter(Boolean);
    
    if (!maxVal || parts.length > 0 && Math.max(...parts!) > maxVal) {
        maxVal = Math.max(maxVal, ...parts!);
    }

    count++;
});

rl.on("close", () => {
    console.log(`count=${count} max=${maxVal}`);
});
