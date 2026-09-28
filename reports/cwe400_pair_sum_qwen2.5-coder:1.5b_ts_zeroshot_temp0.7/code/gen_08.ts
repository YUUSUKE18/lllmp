const stdin = require('process').stdin;
const stdout = require('process').stdout;

stdin.on('data', (data) => {
    const target = parseInt(data.toString().trim(), 10);
    const numbers = data.toString().trim().split('\n').filter(Boolean).map(Number);

    let count = 0;

    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            if (numbers[i] + numbers[j] === target) {
                count++;
            }
        }
    }

    stdout.write(`pairs=${count}\n`);
});
