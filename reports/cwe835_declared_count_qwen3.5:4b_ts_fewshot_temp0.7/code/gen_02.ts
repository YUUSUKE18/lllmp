const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  let n = 0;
  if (lines.length > 0 && /\s*(\d+|-?\d+)\s*$/.test(lines[0])) {
    // 1行目の整数をnに代入（文字列解析）
    const match = lines[0].match(/(\d+|-?\d+)/);
    if (match) n = parseInt(match[1], 10);
  }

  let count = 0;
  let sum = 0;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;

    // 整数として解析できるか確認
    const parsed = parseInt(line, 10);
    if (!Number.isNaN(parsed)) {
      count++;
      sum += parsed;
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
