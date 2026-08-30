const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  for (let i = 0; i < s.length; ) {
    if (s[i] === "\n") {
      const line = s.substring(i + 1);
      // 行の前後の空白を切り捨て
      const trimmed = line.trim();
      if (trimmed.length === 0) continue;

      // 数字とカンマ以外が含まれていないかチェック
      if (!/^\d+([,\d]*)?$/.test(trimmed)) {
        continue;
      }

      valid++;
    }
    i++;
  }
  console.log(`valid=${valid}`);
});
