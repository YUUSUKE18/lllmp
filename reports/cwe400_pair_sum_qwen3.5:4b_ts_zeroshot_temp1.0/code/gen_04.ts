const input = process.stdin.read().replace(/\r\n/g, "\n");
const target = parseInt(input.split("\n")[0], 10);

const lines = [];
for (const line of input.slice(target.length + 1).split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const num = parseInt(trimmed, 10);
    if (Number.isFinite(num)) {
        lines.push(num);
    }
}

const n = lines.length;
let count = 0;
for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
        if (lines[i] + lines[j] === target) {
            count++;
        }
    }
}

console.log(`pairs=${count}`);
