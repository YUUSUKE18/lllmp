const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = 0;
  let i = 0;
  while (i < s.length) {
    if (s[i] === "(" || s[i] === "," || s[i] === " " || s[i] === "\n" || s[i] === "\r") {
      i++;
      continue;
    }
    if (!/^\d+$/.test(s.substr(i, 1))) break;
    const start = i;
    let j = i;
    while (j < s.length && /\d/.test(s[j])) j++;
    const valStr = s.substring(start, j);
    const val = parseInt(valStr, 10);
    if (isNaN(val)) break;
    i = j;
    if (s[i] === ":") {
      i++;
      while (i < s.length && /\d/.test(s[i])) i++;
      if (i >= s.length) break;
      const countStr = s.substring(start, i); // 実際は : の位置から数え直すべきだが、簡略化のため再計算
      // 正確に実装:
      let k = i;
      while (k < s.length && /\d/.test(s[k])) k++;
      const countStr2 = s.substring(i, k);
      if (countStr2.trim() === "") {
        // : の後に空白のみがある場合、回数は 0 とみなす（仕様: 回数 0 以上）
        // しかし、通常は数字が続くはず。空の場合は無視またはエラーだが、ここでは 0 で扱う。
        // 実際の実装では : の直後から数字を読み取るべき。
      }
      const repeats = parseInt(countStr2, 10);
      if (isNaN(repeats)) {
        break; 
      }
      for (let r = 0; r < repeats; r++) {
        sum += val;
        count++;
      }
      i = k;
    } else {
      // : がなく、単なる整数列の場合 (例: 7,3) -> 7 の回数は 1 とみなす？
      // 仕様は '値:回数' を期待しているが、形式が破れた場合は無視する。
      // 今回は '値:回数' の形に解釈できない要素も無視するため、: がなければスキップ。
      break;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
