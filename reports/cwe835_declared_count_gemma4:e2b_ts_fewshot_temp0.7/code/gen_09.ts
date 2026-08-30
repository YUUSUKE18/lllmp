const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines: string[] = [];
let lineNumber = 0;

rl.on('line', (line) => {
  lines.push(line.trim());
});

rl.on('close', () => {
  let count = 0;
  let sum = 0;

  for (const line of lines) {
    if (line === "") continue;

    const num = parseInt(line, 10);

    // 整数として解釈できるかチェック
    if (!isNaN(num)) {
      // 64bit整数範囲内であることの確認 (Node.jsのNumber型はIEEE 754倍精度であり、安全に扱える範囲)
      // 課題の指示に従い、読み取れた整数を対象とする
      count++;
      sum += num;
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
