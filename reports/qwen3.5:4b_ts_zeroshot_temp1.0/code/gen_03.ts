const input = process.stdin.read().replace(/\r\n/g, '\n').split('\n');
const set = new Set<number>();
input.forEach(line => {
  const parts = line.split(',').map(s => Number(s.trim()));
  parts.filter(p => !isNaN(p)).forEach(n => set.add(n));
});

let count = set.size;
let sum = 0n;
for (const n of set) {
  sum += BigInt(n);
}

console.log(`count=${count.toString()} sum=${sum.toString()}`);
