const countLine = process.stdin.readline();
const sumLine = process.stdin.slice(1, -1).join('\n');

const count = parseInt(countLine.trim()) || 0;
const sum = 0;

const lines = sumLine.split('\n');
for (let line of lines) {
    const num = parseInt(line.trim());
    if (!isNaN(num)) {
        sum += num;
    }
}

process.stdout.write(`count=${count}\nsum=${sum}\n`);
