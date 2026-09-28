const input = process.stdin.read().split(/\r?\n/);

const target = parseInt(input[0], 10);
if (isNaN(target)) {
    console.log('pairs=0\n');
    process.exit(0);
}

const numbers: number[] = [];
for (let i = 1; i < input.length; i++) {
    const line = input[i].trim();
    if (!line) continue;
    const val = parseInt(line, 10);
    if (!isNaN(val)) {
        numbers.push(val);
    }
}

const pairs: number[] = [];
let count = 0;
for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
        if (numbers[i] + numbers[j] === target) {
            pairs.push(i);
            count++;
        }
    }
}

console.log(`pairs=${count}\n`);
