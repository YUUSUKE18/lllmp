const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let validCount = 0;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.length === 0) continue;
    if (!/^-?[0-9]+(,[ -]?[0-9]+)*$/.test(trimmed)) {
      // 正規表現の簡易的な検証: 数字列がカンマで区切られているか
      // より堅牢なチェック: 文字を解析して、数字とカンマのみが許容されるか確認
      if (!/^(\d+[, ]*\d+)*$/.test(trimmed.replace(/,/g, "").replace(/\s+/g, ""))) {
        continue; 
      }
      // 上記の簡易チェックは不完全なので、手動パースで再検証
      const parts = trimmed.split(/[ ,]+/);
      for (const part of parts) {
        if (!/^\d+$/.test(part)) {
          break;
        }
      }
      // 上記のループが正常に完了し、かつ部分数 > 0 なら妥当
      if (parts.length > 0 && trimmed.split(/[ ,]+/).every(p => /^\d+$/.test(p))) {
        validCount++;
      }
    } else {
      // 空白のみまたは非数文字が含まれる場合の再確認
      const clean = trimmed.replace(/,/g, "").replace(/\s+/g, "");
      if (clean.length > 0 && !/^\d+$/.test(clean)) {
        continue; 
      }
      // ここに到達すれば、数字とカンマのみが含まれている（末尾カンマ含む）
      validCount++;
    }
  }
  console.log(`valid=${validCount}`);
});
