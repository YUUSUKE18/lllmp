const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let count = 0;
  let sum = 0;
  
  // 1 行目（最初の要素）から整数の個数を取得
  if (lines.length > 0) {
    const firstLine = lines[0].trim();
    if (firstLine !== "") {
      const expectedCount = parseInt(firstLine, 10);
      if (!Number.isNaN(expectedCount)) count = expectedCount;
    }
  }

  // 2 行目以降を処理
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    
    const n = parseInt(line, 10);
    if (!Number.isNaN(n)) {
      sum += n;
      count++;
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
