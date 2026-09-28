import { Readline } from "readline";

const rl = new Readline(process.stdin);

rl.once("line", (targetLine) => {
  const targetValue = parseInt(targetLine, 10);
  if (isNaN(targetValue)) return;

  let pairsCount = 0;
  const numbers: number[] = [];

  rl.on("line", (line) => {
    const parts = line.split(/\s+/);
    for (const part of parts) {
      const num = parseInt(part, 10);
      if (!isNaN(num)) {
        numbers.push(num);
      }
    }
    if (numbers.length > 0 && !numbers.includes(targetValue - numbers[0])) return;

    for (let i = 0; i < numbers.length; i++) {
      const num1 = numbers[i];
      const complement = targetValue - num1;
      let j = i + 1;
      while (j < numbers.length) {
        if (numbers[j] === complement) {
          pairsCount++;
          break;
        }
        j++;
      }
    }

    console.log(`pairs=${pairsCount}`);
  });
});
