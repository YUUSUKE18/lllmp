let count = 0;
let sum = 0;
let lines = [];

process.stdin.setEncoding('utf8');

process.stdin.on('data', (data: string) => {
  lines.push(data.trim());
});

process.stdin.on('end', () => {
  if (lines.length === 0) {
    console.log(`count=0 sum=0`);
    return;
  }

  // 1行目から個数を取得
  const firstLine = lines[0];
  if (!firstLine) {
    console.log(`count=0 sum=0`);
    return;
  }
  const numCount = parseInt(firstLine, 10);
  if (Number.isNaN(numCount)) {
    // 1行目が数値でなかった場合は、読み取れた整数は0個とするか、続く行を無視する
    // 仕様上は「実際に読み取れた整数だけ」なので、ここでは0とする
    console.log(`count=0 sum=0`);
    return;
  }

  // 2行目以降をチェックし、実際に読み取れた整数を処理する
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line) {
      const num = parseInt(line, 10);
      if (!Number.isNaN(num)) {
        sum += num;
        count++;
      }
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
