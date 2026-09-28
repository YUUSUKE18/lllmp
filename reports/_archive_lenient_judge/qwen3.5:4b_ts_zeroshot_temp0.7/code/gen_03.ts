import { createInterface } from "readline";

const rl = createInterface({ input: process.stdin, output: process.stdout });

let countSumLines = [];

rl.on("line", (line) => {
  line.split(/[\s]+/).forEach((str) => {
    const num = parseInt(str);
    if (!isNaN(num)) {
      if (!(num in countSumLines)) {
        countSumLines[num] = [1, num];
      } else {
        countSumLines[num][0]++;
        countSumLines[num][1] += num;
      }
    }
  });
});

rl.on("close", () => {
  const outStr: string[] = [];
  for (const [num, [cnt, sum]] of Object.entries(countSumLines)) {
    outStr.push(`count=${String(cnt)} sum=${String(sum)}`);
  }
  console.log(outStr.join("\n") + "\n");
});
