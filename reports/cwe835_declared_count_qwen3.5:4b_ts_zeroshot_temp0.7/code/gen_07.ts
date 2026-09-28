const line = process.stdin.read().trim();
if (!line) {
    console.log(`count=0 sum=0`);
    process.exit(0);
}

const firstLine = parseInt(line, 10);

let count = 0;
let sum: bigint = 0n;

for (const raw of process.stdin) {
    const lines = raw.trim().split(/\r?\n/);
    for (const lineStr of lines) {
        if (!lineStr || !/\s-?[\d]+/.test(lineStr)) continue;

        const parts = lineStr.split(/\s+/).filter(s => /\d+/.test(s));
        for (const part of parts) {
            try {
                const num = BigInt(part);
                sum += num;
                count++;
            } catch {
                // 数値解析失敗はスキップ
            }
        }
    }
}

console.log(`count=${count} sum=${sum}`);
