let count = 0;
let sum = 0;
let lineCount = 0;

process.stdin.setEncoding('utf8');

process.stdin.on('data', (data: string) => {
  const lines = data.trim().split('\n').map(line => line.trim()).filter(line => line.length > 0);

  if (lineCount === 0) {
    // 1行目: 続く整数の個数
    const countStr = lines[0];
    if (!countStr) return;

    const num = parseInt(countStr, 10);
    if (!isNaN(num)) {
      lineCount = num;
    }
    return;
  }

  // 2行目以降: 整数
  for (let i = 1; i < lines.length; i++) {
    const numStr = lines[i];
    const num = parseInt(numStr, 10);

    if (!isNaN(num)) {
      sum += num;
    }
  }
});

process.stdin.on('end', () => {
  // 読み取れた整数が1行目(個数)と一致しない場合でも、実際に読み取れた整数のみを対象とする。
  // sumとcountは、実際に読み取れた整数のみを対象として計算されている。
  console.log(`count=${lineCount} sum=${sum}`);
});
