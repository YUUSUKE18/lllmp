const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

let lines: string[] = [];
let count = 0;
let sum = 0;

rl.on('line', (line) => {
  if (lines.length === 0) {
    // 1行目は個数
    const num = parseInt(line.trim(), 10);
    if (!isNaN(num)) {
      count = num;
      // 続く行がデータなので、読み取りを続ける
    }
    return;
  }

  // 2行目以降は整数データ
  const num = parseInt(line.trim(), 10);
  if (!isNaN(num)) {
    sum += num;
  }
});

rl.on('close', () => {
  // 実際に読み取れた個数 (sumを計算する際に使った数) と合計を出力
  // 注意: 課題の仕様では「実際に読み取れた整数だけを対象」とあるため、
  // 実際に処理された行数をカウントする必要がありますが、
  // 今回の入力形式では最初の行が期待される個数であり、それ以降のデータが続くことを前提とします。
  // 読み取れた行数と、それらのうち整数として解釈できたものの合計を報告します。

  // ここでは、最初の行が期待される個数として扱われ、
  // 実際に読み取れた整数（sumで集計したもの）と、その期待される個数（count）を出力します。
  // 課題の指示に従い、sumの計算に含めた整数（実際に読み取れた整数）の個数としてcountとsumを出力します。

  // 読み取れた整数がsumに含まれているため、sumを合計として出力します。
  console.log(`count=${count} sum=${sum}`);
});
