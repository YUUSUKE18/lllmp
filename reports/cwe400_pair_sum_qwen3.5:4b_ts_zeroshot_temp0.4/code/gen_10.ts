const input = process.stdin;
const output = process.stdout;

input.on('data', (chunk) => {
    const lines = chunk.toString().trim().split('\n');
    if (lines.length === 0) return;

    const target = parseInt(lines[0], 10);
    if (isNaN(target)) return;

    const numbers: number[] = [];
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const num = parseInt(line, 10);
        if (isNaN(num)) continue;
        numbers.push(num);
    }

    let count = 0n;
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            const sum = BigInt(numbers[i]) + BigInt(numbers[j]);
            if (sum === BigInt(target)) {
                count++;
            }
        }
    }

    output.write(`pairs=${count}\n`);
});
