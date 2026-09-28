const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let count = 0;
  let sum = BigInt(0);

  for (const line of lines) {
    if (line.trim() === "") continue;
    const tokens = line.split(/\s+/);
    if (tokens.length === 0) continue;
    
    // 最初のトークンが整数の個数 n
    const nStr = tokens[0];
    const n: number = parseInt(nStr, 10);
    if (isNaN(n)) continue;

    // 次の n の行を読み込む（実際には各行に 1 つずつ来る想定だが、入力の構造上、
    // "2 行目以降に整数が 1 行に 1 個ずつ並びます" とあるので、
    // tokens[1] から tokens[n] までがその行の値である。
    // ただし、問題文「実際に存在する整数の個数は 1 行目の値と一致しないことがあります」は、
    // 「読み取れた整数」というのが重要なので、tokens[1] ~ tokens[tokens.length-1] をすべて処理する。
    for (let i = 1; i < tokens.length; i++) {
      const valStr = tokens[i];
      try {
        const v: bigint = BigInt(valStr);
        sum += v;
        count++;
      } catch {
        // 整数として解釈できない場合は無視（ただし、問題文「整数として解釈できない行も無視します」は行単位の話だが、
        // tokens 内の文字列が数式なら解析エラーになる。ここでは try-catch で個別トークンを検出する）。
      }
    }
  }

  console.log(`count=${count} sum=${sum}`);
});
