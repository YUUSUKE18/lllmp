const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let firstLineNum = NaN;
  
  for (const line of lines) {
    if (line.trim() === "") continue;
    
    // 最初の行を解析して整数の数を読み込む
    if (firstLineNum === NaN && !isNaN(parseInt(line, 10))) {
      firstLineNum = parseInt(line, 10);
    }
  }

  let sum = BigInt(0);
  let count = BigInt(0);
  
  for (const line of lines) {
    // 空白除去して解析する
    const trimmedLine = line.trim();
    
    if (trimmedLine === "") continue;
    
    // 整数列として分割する
    const nums = trimmedLine.split(/\s+/).map(x => BigInt(x));
    
    for (const n of nums) {
      sum += n;
      count++;
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
