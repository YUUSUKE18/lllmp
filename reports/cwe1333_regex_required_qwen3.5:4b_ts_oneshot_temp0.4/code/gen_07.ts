const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let validCount = 0;
  const regex = /^\s*(\d+(?:,\s*\d+)*)?\s*$/;

  for (const line of lines) {
    if (!line || line.trim() === "") continue; // 空行は無視（ただし、仕様では「妥当ではありません」とありますが、空行を判定対象外とするのが自然。問題文の「数字とカンマ以外を含む行は妥当ではありません」に反しないため、空行は無効とみなす）
    if (regex.test(line.trim())) {
      validCount++;
    }
  }
  console.log(`valid=${validCount}`);
});
