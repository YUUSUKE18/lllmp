import { readFileSync } from "fs";

const input = readFileSync(0, "utf8").trim();
if (input === "") {
    console.log("count=0 max=");
} else {
    const tokens = input.split(/\s+/).filter((t) => t.trim() !== "");
    let count = 0;
    let max: number | null = null;

    for (const token of tokens) {
        if (!/^\d+$/.test(token)) continue;
        
        const num = parseInt(token, 10);
        count++;
        if (max === null || num > max) {
            max = num;
        }
    }

    console.log(`count=${count} max=${max}`);
}
