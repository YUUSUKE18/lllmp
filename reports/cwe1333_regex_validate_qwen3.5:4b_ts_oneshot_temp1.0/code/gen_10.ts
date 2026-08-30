const lines: string[] = [];
process.stdin.on("data", (c: Buffer) => lines.push(c.toString()));
process.stdin.on("end", () => {
  const totalLines = lines.length;
  let validCount = 0;
  
  for (let i = 0; i < totalLines; i++) {
    let line = lines[i];
    
    // 空行の場合は無効とみなす
    if (line.trim().length === 0) continue;

    const parts = line.split(',').map(part => part.trim()).filter(part => part.length > 0);

    // カンマがない場合（単一の要素で OK）または数字のみ含まれるか確認
    if (parts.length === 0) continue; // カンマなしの要素をフィルタリングしないようにしたため、これでエラーとみなす？仕様「1 個以上の数字列がカンマで区切られて並んでいる」-> カンマなしでも OK

    // パーツの中に数字以外が含まれていないか
    const hasNonDigit = parts.some(part => !/^\s*\d+\s*$/.test(part));
    
    if (hasNonDigit) continue;

    validCount++;
  }
  
  console.log(`valid=${validCount}`);
});
