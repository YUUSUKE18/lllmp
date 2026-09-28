const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

let target: bigint | undefined;
let values: BigInt[] = [];

rl.on('line', line => {
  if (!target) {
    const parsed = BigInt(line);
    if (isNaN(parsed)) return;
    target = parsed;
  } else {
    const parsed = BigInt(line);
    if (parsed <= BigInt(0)) return; // 無視（ただし、もし負の整数が必要なら条件変更）
    values.push(parsed);
  }

  rl.on('close', () => {
    let count = 0n;
    for (let i = 0n; i < values.length - 1n; i++) {
      for (let j = i + 1n; j < values.length - 1n; j++) {
        if (values[i] + values[j] === target) {
          count++;
        }
      }
    }
    console.log(`pairs=${count}`);
  });
});

rl.on('close', () => {
  // Nothing left to read, wait for input completion.
});
