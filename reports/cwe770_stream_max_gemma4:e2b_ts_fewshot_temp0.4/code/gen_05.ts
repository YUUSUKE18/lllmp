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

  // 空の入力があった場合の処理（問題文からは明示されていないが、安全のため）
  if (count === 0) {
    // 要素が一つもない場合、最大値は定義できないか、あるいは適切なデフォルト値を設定する必要がある。
    // ここでは、要素がない場合は count=0, max=0 とするのが妥当かもしれないが、
    // 読み込んだ有効な整数が存在しないため、maxの初期値(-Infinity)を考慮して、count=0ならmaxは意味を持たない。
    // ただし、問題文の意図に従い、実際に読み取れた数と最大値を出す。
    // count=0の場合、max=-Infinityとなるが、ここでは安全のため、もしデータが存在しなければ max=0 とする（あるいは仕様に依存する）。
    // 厳密には「要素数」と「最大値」を求めるので、要素がない場合はcount=0, maxは無視されるべきだが、
    // 例に従い、読み取れた有効な整数のみをカウントし、その最大値を出す。
  }

  console.log(`count=${count} max=${max}`);
});
