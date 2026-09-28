const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = BigInt(0);
  let lineNum = 0;
  for (const ch of s) if (ch === "\n") lineNum++;

  // 1 行目を読み取る (lineNum = 0)
  if (lineNum > 0) {
    const firstLine: string[] = [];
    let inFirstLine = true;
    for (let i = 0; i < s.length; i++) {
      if (s[i] === "\n") {
        break; // 1 行目が終了した
      }
      firstLine.push(s.substring(i, i + 1));
    }
    const nStr = firstLine.join("");
    let n: number | null = null;
    try {
      n = parseInt(nStr, 10);
    } catch (e) {}

    if (!isNaN(Number.parseInt(nStr, 10))) {
      count = Number.parseInt(nStr, 10);
    }
  }

  // 2 行目以降を読み取る
  let i = 0;
  while (true) {
    const lineStart = s.indexOf("\n", i + 1);
    const lineEnd = i + 1;
    if (lineStart === -1 && i < s.length) lineStart = s.length;
    else if (lineStart === -1) break;

    const line = s.substring(lineStart, lineEnd).trim();
    
    // 空行は無視
    if (line.length === 0) {
      i = lineStart + 1;
      continue;
    }

    let valStr = "";
    for (const ch of line) {
      if (!/\s/.test(ch)) valStr += ch;
    }

    // 整数として解釈できるかチェック
    const trimmedValStr = valStr.trim();
    if (trimmedValStr.length === 0) {
      i = lineStart + 1;
      continue;
    }

    try {
      const num = Number.parseInt(trimmedValStr, 10);
      sum += BigInt(num);
      count++;
    } catch (e) {
      // 整数として解釈できない場合は無視
    }

    i = lineStart + 1;
  }

  console.log(`count=${count} sum=${sum}`);
});
