const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxVal = Number.MIN_SAFE_INTEGER; // 64bit signed integer の最小値より小さい初期化

  for (const w of s.split(",")) {
    if (w.trim() === "") continue;
    const n = parseInt(w, 10);
    if (!Number.isNaN(n) && isFinite(n)) {
      count++;
      // 最初の要素が設定されていない場合、または現在の値の方が大きい場合に更新する
      if (count === 1 || n > maxVal) {
        maxVal = n;
      }
    }
  }

  console.log(`count=${count} max=${maxVal}`);
});
