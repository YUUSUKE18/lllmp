const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let count = 0;
  let sum = 0n;

  for (const line of lines) {
    if (line.trim() === "") continue;
    const parts = line.split(/\s+/);
    
    // 1 行目：整数の個数を読み取る（文字列として）
    if (parts.length > 0 && !isNaN(parseInt(parts[0], 10))) {
      count = parseInt(parts[0], 10);
    }

    // 2 行目以降：整数を読み込む
    for (let i = 1; i < parts.length; i++) {
      const val = BigInt(parts[i]);
      if (!isNaN(val)) {
        sum += val;
        count++;
      }
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
