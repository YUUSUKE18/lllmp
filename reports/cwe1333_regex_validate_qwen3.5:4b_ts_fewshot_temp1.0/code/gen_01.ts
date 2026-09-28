const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split("\n");
  let validCount = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.length === 0) continue;

    // 数字の文字をすべて取得し、区切り文字を除外して連続する数字列を形成
    // 数式は "1", "123", " 1" のように空白で囲まれたものも含まれるが、区切りはカンマのみとする。
    const numberParts = trimmed.split(/[,]+/);

    if (numberParts.length === 0) continue;

    // 各数字列をチェック: 数値文字列のみのものが許容される。
    let validLine = true;
    for (const part of numberParts) {
      const chs = Array.from(part);
      let hasDigit = false;
      for (const ch of chs) {
        if (!/[\d]/.test(ch)) {
          validLine = false;
          break;
        }
        hasDigit = true;
      }
      // 部分が空の場合も、数字を1つ以上含む必要があるため許容されない。
      if (!hasDigit) validLine = false;
    }

    if (validLine) {
      validCount++;
    }
  }

  console.log(`valid=${validCount}`);
});
