const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const linesCount = s.split("\n").length;
  let validLines = 0;
  
  for (let i = 0; i < linesCount; i++) {
    const line = s.split("\n")[i];
    // 正規表現: 行先と行末が空白で区切れないか、空白は許容しなさい
    const trimmedLine = line.trim();
    
    if (trimmedLine === "") continue; // 空行
    
    // 正規表現: 1 個以上の数字列がカンマで区切られていること + 末尾カンマの許容
    const regex = /^(?:(?:\d+)(?:,)?)+$/;
    
    if (regex.test(trimmedLine)) {
      validLines++;
    }
  }
  
  console.log(`valid=${validLines}`);
});
