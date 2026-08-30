import { createInterface } from "readline";

const rl = createInterface({ input: process.stdin, output: process.stdout });
let target: number | undefined = undefined;
let lineCount = 0;

rl.on("line", (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;

  const firstLine = lineCount === 0;
  if (firstLine && !isNaN(Number(trimmed))) {
    target = parseInt(trimmed, 10);
    return;
  }

  if (!target || isNaN(Number(line.trim()))) return;

  const num = Number(line.trim());
  if (!target || lineCount === 0) return;

  const nums = [num] as number[];
  let pairs: [number, number][] = [];

  if (nums.length < 2) {
    nums.forEach(n => {
      pairs = [[n]];
      for (let i = 1; i < lineCount; i++) {
        const prevN = nums[i - 1];
        if (!pairs.find(p => p[0] === n && p[1] !== prevN)) {
          nums = [prevN, ...nums.slice(1)];
        } else {
          pairs = [];
          break;
        }
      }
    });

    let count = 0;
    for (let i = 0; i < target.length - 1; i++) {
      const n1 = target[i];
      const sumTarget = target.find(n => n !== n1 ? sum : undefined);
      if (sumTarget) {
        pairs = [[n1, sumTarget]];
      }
    }

    if (pairs.length === 0 || !pairs.some(p => p.every(n => sum + n))) {
      rl.close();
      process.exit(0);
    }
  }

  let count = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) count++;
    }
  }

  console.log(`pairs=${count}`);
  rl.close();
  process.exit(0);
});

rl.on("close", () => {
  if (!target || lineCount < 1) {
    console.log(`pairs=0`);
  }
  process.exit(0);
});
