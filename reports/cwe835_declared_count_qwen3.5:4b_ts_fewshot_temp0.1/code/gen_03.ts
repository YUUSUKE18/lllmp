const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = BigInt(0);
  const lines = s.split(/\r?\n/);
  
  // 1 行目（インデックス 0）から整数の個数を読み取る
  if (lines.length > 0) {
    const firstLine = lines[0].trim();
    if (firstLine !== "") {
      const n = parseInt(firstLine, 10);
      if (!Number.isNaN(n)) {
        count = n;
      }
    }
  }

  // 2 行目以降（インデックス 1 から）を処理する
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    
    const n = parseInt(line, 10);
    if (!Number.isNaN(n)) {
      count++;
      sum += BigInt(n);
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
