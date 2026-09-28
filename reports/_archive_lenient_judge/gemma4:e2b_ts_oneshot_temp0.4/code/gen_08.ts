const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  const parts = line.split(',');
  let set = new Set<number>();
  let sum = 0;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈できるか確認
    if (!isNaN(num)) {
      set.add(num);
    }
  }

  const count = set.size;
  for (const n of set) {
    sum += n;
  }

  console.log(`count=${count} sum=${sum}`);
});

rl.on('close', () => {
  // 処理が完了したことを示す（この問題ではlineイベント内で直接出力するため、ここでは特に何もしない）
});
