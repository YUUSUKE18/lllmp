const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let linesRead = 0;
let count = 0;
let sum = 0;
let inputLines: string[] = [];

rl.on('line', (line) => {
  if (linesRead === 0) {
    // 1行目: 読み取れた整数の個数
    const num = parseInt(line.trim(), 10);
    if (!isNaN(num)) {
      count = num;
    }
  } else {
    // 2行目以降: 整数
    const num = parseInt(line.trim(), 10);
    if (!isNaN(num)) {
      sum += num;
    }
  }
  inputLines.push(line);
  linesRead++;
});

rl.on('close', () => {
  // 実際に読み取れた整数を対象とするため、countとsumを再計算するのではなく、
  // 読み取った行数と、実際にパースできた値に基づいて出力する。

  // 読み取った行数（ヘッダ行を含む）
  const actualLinesRead = inputLines.length;

  // 1行目から読み取った個数（これが期待される個数）
  const expectedCount = parseInt(inputLines[0].trim(), 10);

  // 実際にパースできた整数の個数を数える
  let actualCount = 0;
  let actualSum = 0;

  for (let i = 1; i < actualLinesRead; i++) {
    const line = inputLines[i].trim();
    if (line === "") continue;
    const num = parseInt(line, 10);
    if (!isNaN(num)) {
      actualCount++;
      actualSum += num;
    }
  }

  // 課題の要求: 実際に読み取れた個数と合計を出力する
  console.log(`count=${actualCount} sum=${actualSum}`);
});
