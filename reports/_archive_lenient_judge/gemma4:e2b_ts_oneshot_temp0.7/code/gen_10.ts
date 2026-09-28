const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  const parts = line.split(',').map(s => s.trim());
  let set = new Set<number>();
  let sum = 0;

  for (const part of parts) {
    if (part === "") continue;
    const num = parseInt(part, 10);
    if (!isNaN(num)) {
      if (!set.has(num)) {
        set.add(num);
        sum += num;
      }
    }
  }

  console.log(`count=${set.size} sum=${sum}`);
});

rl.on('close', () => {
  // すべての入力が処理された後に終了
});
