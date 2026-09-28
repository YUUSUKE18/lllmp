const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf8').trim().split('\n');

    if (input.length < 2) {
        console.log("pairs=0");
        return;
    }

    const target = parseInt(input[0].trim(), 10);
    const numbers = [];

    for (let i = 1; i < input.length; i++) {
        const line = input[i].trim();
        if (line.length > 0) {
            const num = parseInt(line, 10);
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }
    }

    let count = 0;
    const n = numbers.length;

    // 2つの組 (numbers[i] + numbers[j] = target, i != j) を探す
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (numbers[i] + numbers[j] === target) {
                count++;
            }
        }
    }

    console.log(`pairs=${count}`);
}

solve();
