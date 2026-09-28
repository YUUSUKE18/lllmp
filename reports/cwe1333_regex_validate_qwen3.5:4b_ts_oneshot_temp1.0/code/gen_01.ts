const rows: string[] = [];
process.stdin.on("data", (c: Buffer) => rows.push(c.toString().trim()));
process.stdin.on("end", () => {
  let count = 0;
  for (const row of rows) {
    if (!row.length) continue;
    const cleaned = row.trim();
    if (cleaned.match(/^\s*(\d+(?:\s*,?\s*\d+)*)$/)) {
      count++;
    } else {
      continue; // 数字とカンマ以外があるか、末尾に数字がない場合
    }
  }
  console.log(`valid=${count}`);
});
