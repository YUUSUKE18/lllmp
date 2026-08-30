const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let valid = 0;
  const lines = s.split(/\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") continue;
    try {
      // "1,2," のような末尾カンマや " ,3" のような始点空白は trim で除去されるため、
      // split(",") で区切り、各要素が整数になっているかチェック。
      const parts = trimmed.split(",").map(p => p.trim()).filter(p => p !== "");
      if (parts.length === 0) continue; // "1,,2" の場合は空文字列が含まれる

      let allInts = true;
      for (const p of parts) {
        const num = parseInt(p, 10);
        if (Number.isNaN(num)) {
          allInts = false;
          break;
        }
      }
      if (allInts) valid++;
    } catch {
      // parseInt が例外を吐く場合は無視（ここでは実際には吐くことがないが防御的）
      continue;
    }
  }
  console.log(`valid=${valid}`);
});
