import { process, readline } from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let validLineCount = 0;

rl.on('line', (line) => {
  // 空行や空白行は無視
  if (!line.trim()) return;

  // 1 個以上の数字列がカンマで区切られており、末尾のカンマは許容
  const matches = line.match(/(^[\s]*)([0-9]+(?:,[0-9]+)*([^\s]*))?$/);
  if (matches && matches[1] && matches[3]) {
    validLineCount++;
  }
});

rl.on('close', () => {
  console.log(`valid=${validLineCount}`);
});
