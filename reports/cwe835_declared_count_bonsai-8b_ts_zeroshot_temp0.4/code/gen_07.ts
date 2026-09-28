const input = process.stdin.read().split('\n');
let count = 0;
let sum = 0;

for (let line of input) {
    const tokens = line.trim().split(/\s+/);
    if (tokens.length === 0) continue;
    const firstToken = tokens[0];
    if (!/^-?\d+$/.test(firstToken)) continue;
    const num = parseInt(firstToken, 10);
    count++;
    sum += num;
}

console.log(`count=${count} sum=${sum}`);
