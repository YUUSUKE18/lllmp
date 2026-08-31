const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let firstLineOk = false;
  const parts: number[] = [];

  // センターが空でないかチェック
  if (s.trim().length === 0) {
    console.log("count=0 sum=0");
    return;
  }

  const lines = s.split(/\r?\n/);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;

    // 1 行目: 整数の個数
    if (i === 0) {
      const n = parseInt(line, 10);
      if (!Number.isNaN(n)) {
        firstLineOk = true;
        // 次の行から読み取る準備をするが、実際の行数は決まっていないので全部読み取って処理
        continue;
      }
    }

    // 整数の列へ追加
    const val = parseInt(line, 10);
    if (!Number.isNaN(val)) {
      parts.push(val);
    }
  }

  console.log(`count=${parts.length} sum=${parts.reduce((a, b) => a + b, 0)}`);
});
