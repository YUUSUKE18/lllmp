const input = process.stdin.read().split('\n').filter(line => line.trim() !== '').map(line => parseInt(line, 10));
const target = parseInt(input[0]);

const pairs = input.slice(1).find((pairs: any[]) => pairs.some((pair) => pair[0] + pair[1] === target) || pairs.some((pair) => pair[1] + pair[0] === target));

console.log(pairs ? `${pairs.length}` : `0`);
