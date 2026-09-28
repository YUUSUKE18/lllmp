const input = process.stdin.read();
const matches = input ? input.match(/(-?\d+):(\d+)/g) : null;

let count = 0n;
let sum = 0n;

if (matches) {
  for (const match of matches) {
    const [valStr, cntStr] = match.split(':');
    const val = BigInt(valStr);
    const cnt = BigInt(cntStr);
    count += cnt;
    sum += val * cnt;
  }
}

console.log(`count=${count} sum=${sum}`);
