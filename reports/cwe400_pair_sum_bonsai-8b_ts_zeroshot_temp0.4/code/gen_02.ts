import { Readable } from 'stream';

const input = process.stdin.readable();
const lines = [];
input.on('line', line => {
    if (line.trim() !== '') {
        lines.push(line.trim());
    }
    input.on('end', () => {
        const target = parseInt(lines[0], 10);
        const numbers = lines.slice(1).map(line => parseInt(line, 10));
        const pairs = countPairs(numbers, target);
        console.log(`pairs=${pairs}`);
    });
});

function countPairs(numbers, target) {
    const count = 0;
    const seen = new Set();
    for (let i = 0; i < numbers.length; i++) {
        const num = numbers[i];
        if (seen.has(num)) continue;
        seen.add(num);
        for (let j = i + 1; j < numbers.length; j++) {
            const other = numbers[j];
            if (seen.has(other)) continue;
            seen.add(other);
            if (num + other === target) {
                count++;
            }
        }
    }
    return count;
}
