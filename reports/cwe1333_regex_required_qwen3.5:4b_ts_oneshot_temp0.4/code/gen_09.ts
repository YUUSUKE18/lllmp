const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let validCount = 0;

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine === "") continue;

    // 正規表現: 空白を許容し、数字列がカンマで区切られていること。
    // 数値は整数として扱える形式（負の符号付き含む）とする。
    const regex = /^\s*(?:\d+-?\d+\s*,\s*\d+-?\d+)*\s*$/;
    
    if (regex.test(trimmedLine)) {
      validCount++;
    }
  }

  console.log(`valid=${validCount}`);
});
