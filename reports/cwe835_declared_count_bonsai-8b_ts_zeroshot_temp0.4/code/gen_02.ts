const input = process.stdin.read().trim();
const numbers = [];

for (let line of input.split('\n')) {
    const match = line.match(/^(-?\d+)(?:\s+(-?\d+))*/);
    if (match) {
        const count = match[1].length;
        const sum = match[1].parseInt() + match[2].parseInt() || 0;
        numbers.push({ count, sum });
    }
}

const actualCount = numbers.reduce((total, item) => total + item.count, 0);
const actualSum = numbers.reduce((total, item) => total + item.sum, 0);

console.log(`count=${actualCount} sum=${actualSum}`);
