let count = 0;
let sum = 0;
let lineIndex = 0;

process.stdin.setEncoding('utf8');

process.stdin.on('data', (data: string) => {
  const lines = data.trim().split('\n').map(line => line.trim()).filter(line => line.length > 0);

  if (lineIndex === 0) {
    // 1行目: 読み取れた整数の個数
    const numCount = parseInt(lines[0], 10);
    if (!isNaN(numCount)) {
      count = numCount;
      lineIndex = 1;
    } else {
      // 1行目が不正な場合は処理を終了
      return;
    }
  } else {
    // 2行目以降: 整数
    if (lineIndex < count) {
      const num = parseInt(lines[lineIndex], 10);
      if (!isNaN(num)) {
        sum += num;
      }
      lineIndex++;
    }
  }
});

process.stdin.on('end', () => {
  // 読み取れた整数のみを対象とするため、countとsumを出力
  console.log(`count=${count} sum=${sum}`);
});
