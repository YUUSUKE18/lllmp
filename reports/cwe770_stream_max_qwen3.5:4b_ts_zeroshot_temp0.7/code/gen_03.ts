import { Readline } from "readline";

const rl = new Readline(process.stdin);

rl.on("line", (line) => {
    const elements: string[] = line.split(",");
    let maxVal: bigint | undefined;

    for (let i = 0; i < elements.length; ++i) {
        if (elements[i].trim() === "") continue;
        
        try {
            const val = BigInt(elements[i]);
            count++;
            if (!maxVal || val > maxVal) {
                maxVal = val;
            }
        } catch (_) {}
    }

    console.log(`count=${count} max=${maxVal}`);
});

rl.on("close", () => process.exit(0));

let count: number = 0; // 64bit integer fits within JS Number for counting, but value is BigInt. Actually the spec says "value range" is 64-bit int, so elements are integers. We can store maxVal as a string or bigint.
// Wait, I need to handle large inputs properly if they exceed safe number limits? 
// The prompt specifies values fit in 64bit integer range. JS Number goes up to ~9e15 (safe) but technically supports larger doubles. BigInt is safer for exact integers > 2^53-1.
