const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let inputIndex = 0;
  let maxCount = 0;
  
  while (inputIndex < s.length) {
    // 空行をスキップ
    if (s[inputIndex] === "\n") {
      const endOfLine = s.indexOf("\n", inputIndex);
      if (endOfLine === -1) break;
      inputIndex = endOfLine + 1;
      continue;
    }
    
    // 整数をパースする関数
    const parseNextInt = (): number => {
      let start = inputIndex;
      while (inputIndex < s.length && !/\s/.test(s[inputIndex])) inputIndex++;
      if (inputIndex === start) return null;
      
      let end = inputIndex;
      while (end > start && /[\s+-]/.test(s[end - 1])) end--;
      
      const numStr = s.slice(start, end).trim();
      const n = parseInt(numStr, 10);
      return isNaN(n) ? null : n;
    };
    
    // 現在の行の文字数をカウント（空行除く）
    let lineChars = 0;
    if (inputIndex < s.length) {
      let rowEnd = inputIndex;
      let foundEOL = false;
      while (rowEnd < s.length && !/\n/.test(s[rowEnd])) {
        // 文字数カウント（改行前まで）
        lineChars++; 
        rowEnd++;
        if (s[rowEnd] === "\n") foundEOL = true;
        else break; // 文字列終了（行末ではない場合も含めてカウント）
      }
      if (foundEOL || inputIndex >= s.length) {
        lineChars += (inputIndex - rowEnd); // 残りの行末文字数を追加
      }
    }

    const n = parseNextInt();
    
    if (n === null) continue;
    
    maxCount++;
    let sum = Number.MAX_SAFE_INTEGER;
    while(inputIndex < s.length && !/\s/.test(s[inputIndex])) inputIndex++;
    
    // 最初の整数以降の文字数をカウント（空行無視のため）
    if (inputIndex < s.length) {
      lineChars = 1; // 先頭の数字が含まれるため
      let foundEOL = false;
      while(inputIndex < s.length && !/\n/.test(s[inputIndex])) {
        lineChars++; 
        inputIndex++;
        if (s[inputIndex] === "\n") foundEOL = true;
        else break;
      }
      if (foundEOL || inputIndex >= s.length) {
        lineChars += (inputIndex - 1 - 1); // 修正
      }
    }
    
    console.log(`count=${maxCount} sum=${sum}`);
  }
});
