const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = BigInt(0);
  const lines = s.trim().split(/\r?\n/);
  
  // 1 行目：整数の個数を読み取る（ただし実際に存在する行数が異なる場合を考慮）
  if (lines.length > 0) {
    const firstLine = lines[0].trim();
    const n: number = parseInt(firstLine, 10);
    // 入力形式に従い、n 番目の行目（索引 n-1）までに整数が存在すると仮定するが、
    // ただし「実際に読み取れた整数だけ」を対象とするため、各行を個別に処理する。
    // 仕様: "2 行目以降に整数が 1 行に 1 個ずつ並びます" -> インデックス 0 が n（指定値）, インデックス 1 が第 1 個の整数...
    // ただし、実際に存在する行数は不定形。各行を処理して、有効な整数がある場合のみカウントする。
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line === "") continue; // 空行無視
      
      let val: bigint | null = null;
      try {
        val = BigInt(line);
      } catch (e) {
        // 整数として解釈できない場合（文字列ではないなど）
        continue; 
      }
      
      if (!isNaN(val)) {
        count++;
        sum += val;
      }
    }
    
    console.log(`count=${count} sum=${sum}`);
  } else {
    console.log(`count=0 sum=${BigInt(0)}`);
  }
});
