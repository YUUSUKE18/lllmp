import { strict as assert } from 'assert';

function countPairs(target: number, numbers: number[]): number {
  let count = 0;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) {
        count++;
      }
    }
  }
  return count;
}

async function main() {
  const data: Buffer[] = [];
  process.stdin.on("data", (c: Buffer) => data.push(c));
  process.stdin.on("end", () => {
    const s = Buffer.concat(data).toString("utf8");
    const target = parseInt(s.split(/\s+/)[0], 10);
    const numbers = s.split(/\s+/).slice(1).map(Number);
    const result = countPairs(target, numbers);
    console.log(`pairs=${result}`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
