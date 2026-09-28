import { createInterface } from "readline";

const rl = createInterface({ input: process.stdin, output: process.stdout });

let targetValueStr: string | null = null;
let values: bigint[] = [];

rl.on("line", (line) => {
  if (targetValueStr === null) {
    const trimmed = line.trim();
    if (trimmed.length > 0) {
      targetValueStr = trimmed;
    } else {
      return;
    }
  } else {
    const trimmed = line.trim();
    if (trimmed.length === 0) return;

    // 整数として解釈できるかチェックする
    const match = /^-?\d+$/.exec(trimmed);
    if (!match) return;

    const value = BigInt(match[0]);
    values.push(value);
  }

  if (targetValueStr !== null && values.length > 0) {
    countPairs(values, targetValueStr);
    rl.close();
  }
});

function countPairs(values: bigint[], targetStr: string): void {
  const pairsCount = BigInt(0);
  for (let i = 0; i < values.length; i++) {
    for (let j = i + 1; j < values.length; j++) {
      if (values[i] + values[j] === BigInt(targetStr)) {
        pairsCount += BigInt(1);
      }
    }
  }

  console.log(`pairs=${pairsCount}`);
}
