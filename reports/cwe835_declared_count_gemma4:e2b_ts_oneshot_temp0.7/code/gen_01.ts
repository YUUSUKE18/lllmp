let lineIndex = 0;
let count = 0;
let sum = 0n;
const inputLines: string[] = [];

process.stdin.setEncoding('utf8');

process.stdin.on('data', (data: string) => {
  const lines = data.trim().split('\n').filter(line => line.length > 0);
  if (lineIndex === 0) {
    // 1行目: 続く整数の個数
    const numCount = parseInt(lines[0], 10);
    if (!isNaN(numCount)) {
      count = numCount;
    }
    lineIndex++;
    // 2行目以降: 整数
    for (let i = 1; i < lines.length; i++) {
      const num = parseInt(lines[i], 10);
      if (!isNaN(num)) {
        // 実際に読み取れた整数のみを対象とするため、countがまだ確定していない場合は無視する
        // ただし、仕様では「実際に読み取れた整数だけを対象」とあるので、読み取れた整数を累積する
        sum += BigInt(num);
      }
    }
    // 読み取れた整数をすべて処理したとみなし、終了処理を行う
    process.stdout.write(`count=${count} sum=${sum}\n`);
    process.exit(0);
  }
});

process.stdin.on('end', () => {
  // データがすべて読み込まれた場合は、上記処理で終了しているはずだが念のため
});
