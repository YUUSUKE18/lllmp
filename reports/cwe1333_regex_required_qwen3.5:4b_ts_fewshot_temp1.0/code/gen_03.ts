const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r\n|\n/);
  let validLines = 0;
  for (const line of lines) {
    if (line === "" || !line.length) continue; // 空行は無視せず（正規表現でマッチしない）
    if (/^\s*(\d+,\s*[\d,]+)\s*$/.test(line.trim())) validLines++;
  }
  console.log(`valid=${validLines}`);
});
