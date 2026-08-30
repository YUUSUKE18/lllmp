const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split('\n');
  if (lines.length === 0) {
    console.log("count=0 sum=0");
    return;
  }

  // 1行目から読み取った期待される個数 (ここでは無視し、実際に読み取れたものを数える)
  // const expectedCount = parseInt(lines[0].trim(), 10);

  let actualCount = 0;
  let sum = 0;

  // 2行目以降を処理
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;

    const num = parseInt(line, 10);

    // 整数として解釈でき、かつ64bit整数範囲内であるかチェック
    if (!isNaN(num) && Number.isSafeInteger(num)) {
      actualCount++;
      sum += num;
    }
  }

  console.log(`count=${actualCount} sum=${sum}`);
});
