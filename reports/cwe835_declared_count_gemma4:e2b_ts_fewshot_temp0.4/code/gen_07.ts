const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split('\n');
  if (lines.length === 0) {
    console.log("count=0 sum=0");
    return;
  }

  // 1行目から個数を取得（ただし、実際には読み取れた整数のみを対象とする）
  // 1行目から読み取れる整数が、実際に読み取れた個数として扱われる
  let actualCount = 0;
  let sum = 0;

  // 2行目以降を処理
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;

    const num = parseInt(line, 10);
    if (!isNaN(num)) {
      actualCount++;
      sum += num;
    }
  }

  // 厳密に count=<実際に読み取れた個数> sum=<合計> を出力
  console.log(`count=${actualCount} sum=${sum}`);
});
