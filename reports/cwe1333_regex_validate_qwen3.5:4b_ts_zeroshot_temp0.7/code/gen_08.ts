import { createInterface } from "readline";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

let validCount = 0;

rl.on("line", (line) => {
    line = line.trim();
    if (line.length === 0) {
        return;
    }
    
    const parts = line.split(",").map(p => p.trim());
    if (parts.length < 1 || !parts.every(p => /^-?\d+$/.test(p))) {
        return;
    }
    
    validCount++;
});

rl.on("close", () => {
    process.stdout.write(`valid=${validCount}\n`);
});
