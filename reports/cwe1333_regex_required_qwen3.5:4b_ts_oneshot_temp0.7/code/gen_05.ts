const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let validCount = 0;
  
  // 正規表現: 
  //   ^              -> 行の開始
  //   [ \t]*         -> 空白の開始 (許容)
  //   (?=.*[0-9])    -> 数字が含まれていることを保証 (空行を防ぐ)
  //   ((?:-?\d+),?)+  -> 1 つ以上の (-?[数字]+)、カンマで区切られたもの (末尾のカンマも許容)
  //   [ \t]*         -> 空白の終了 (許容)
  //   $              -> 行の終了
  const regex = /^\s*((?:-?\d+),?)+\s*$/;

  for (const line of lines) {
    if (regex.test(line)) {
      validCount++;
    }
  }
  
  console.log(`valid=${validCount}`);
});
