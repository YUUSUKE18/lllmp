const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  const parts = line.split(',');
  let set = new Set<number>();
  for (const part of parts) {
    if (part.trim() !== "") {
      const num = parseInt(part.trim(), 10);
      if (!isNaN(num)) {
        set.add(num);
      }
    }
  }

  const count = set.size;
  let sum = 0;
  for (const num of set) {
    sum += num;
  }

  console.log(`count=${count} sum=${sum}`);
});

rl.on('close', () => {
  // すべての処理が完了したため、ここで終了する
});
