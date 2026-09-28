import { parse } from "p-limit";

let max = 0, target: number = 0;
const limit = parse(100); // 100 は最大の並列処理数を設定する例

process.stdin.on("data", (c: Buffer) => {
  const data = Buffer.concat([limit(c), process.stdin]);
  const lines = data.toString("utf8").split(/\n/);
  target = parseInt(lines[0], 10);
  const numbers: number[] = [];

  for (let i = 1; i < lines.length; i++) {
    const num = parseInt(lines[i], 10);
    if (!Number.isNaN(num)) numbers.push(num);
  }

  numbers.sort((a, b) => a - b);

  let pairs = 0;
  let i = 0;
  let j = numbers.length - 1;

  while (i < j) {
    const sum = numbers[i] + numbers[j];
    if (sum < target) {
      i++;
    } else if (sum > target) {
      j--;
    } else {
      pairs++;
      i++;
      j--;
    }
  }

  console.log(`pairs=${pairs}`);
  process.stdin.off("data");
});
