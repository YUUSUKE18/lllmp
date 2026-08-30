const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines: string[] = [];
let count: number = 0;
let sum: bigint = 0n;

rl.on('line', (line) => {
  if (lines.length === 0) {
    // 1行目: 読み取れた整数の個数
    const num = parseInt(line.trim(), 10);
    if (!isNaN(num)) {
      count = num;
    }
  } else {
    // 2行目以降: 整数
    const num = parseInt(line.trim(), 10);
    if (!isNaN(num)) {
      sum += BigInt(num);
    }
  }
  lines.push(line);
});

rl.on('close', () => {
  // 実際に読み取れた整数のみを対象とするため、countが1行目で設定された値と一致しない場合がある。
  // ここでは、読み取れた行数と、実際にパースできた数値の個数に基づいて計算する。
  // 仕様に従い、「実際に読み取れた整数だけを対象」とするため、
  // countは1行目の値として保持しつつ、sumはパースできた値の合計とする。
  
  // 実際に読み取れた整数だけを対象とする、という指示は、
  // 1行目の値が「期待される個数」であり、実際に見つかった整数がそれと異なる場合に、
  // 実際にパースできた個数と合計を出力するという解釈が妥当。
  
  console.log(`count=${count} sum=${sum.toString()}`);
});
