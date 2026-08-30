let count = 0;
let sum = 0;
let inputLines: string[] = [];

process.stdin.resume();
process.stdin.on("data", (data: Buffer) => {
  const chunk = data.toString();
  const lines = chunk.split('\n');
  inputLines.push(...lines);
});

process.stdin.on("end", () => {
  if (inputLines.length === 0) {
    console.log(`count=0 sum=0`);
    return;
  }

  // 1行目から個数を取得
  const firstLine = inputLines[0].trim();
  if (!firstLine) {
    console.log(`count=0 sum=0`);
    return;
  }
  const expectedCount = parseInt(firstLine, 10);

  // 2行目以降の整数を処理
  for (let i = 1; i < inputLines.length; i++) {
    const line = inputLines[i].trim();
    if (line === "") continue;

    const num = parseInt(line, 10);

    if (!isNaN(num)) {
      count++;
      sum += num;
    }
  }

  // 実際に読み取れた個数と合計を出力
  console.log(`count=${count} sum=${sum}`);
});
