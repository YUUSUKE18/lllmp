const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let count = 0;
  let max = -Infinity;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);
    if (!Number.isNaN(num)) {
      count++;
      if (num > max) {
        max = num;
      }
    }
  }

  // 空の入力があった場合のデフォルト処理（もしデータが全くなかった場合など）を考慮し、maxが未定義にならないようにする。
  // ただし、問題文の仕様に従うと、有効な整数が存在すればその最大値を求める。
  // 少なくとも1つの有効な整数があれば count >= 1, max はその中で最も大きい値になる。

  if (count === 0) {
    // カウントが0の場合、最大値は定義されないが、制約上これは考えにくい。
    // 仮に全ての要素が無効だった場合、maxをどのように出力するかは仕様に明記されていないため、
    // ここでは実質的に何も出力しないか、または何らかのデフォルト値を出すことになるが、
    // 厳密には入力された整数のみを処理する。
    // 空白や非数要素を無視した結果、有効な数が0の場合、maxは不定になるため、
    // 少なくとも最大値が存在しないことを示すために、ここでは適切な最大値（例えば最小の64bit整数）を仮定するか、
    // 問題の意図に従い、単にcount=0として出力する。
    // 例題がないため、入力が空だった場合の挙動は不明だが、max=-Infinityで処理されることを確認する。
  }

  console.log(`count=${count} max=${max}`);
});
