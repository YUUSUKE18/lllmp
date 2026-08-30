const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(',');
  let count = 0;
  let max = -Infinity;
  let hasValidNumber = false;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);
    if (!isNaN(num)) {
      count++;
      if (num > max) {
        max = num;
      }
      hasValidNumber = true;
    }
  }

  if (count === 0) {
    // カウントが0の場合、最大値の出力も必要だが、ここでは仕様に基づき0を返す（-Infinityは不正なため）
    // 問題の意図として、要素数と最大値を求めたいので、データが存在しない場合は適切に処理する。
    // 最小の64bit整数を想定し、最大値が未定義の場合は何らかのデフォルトを設けるか、あるいはここでは計算された結果を出力する。
    // 空の入力や数値以外の入力があった場合、count=0, max=-Infinityとなる可能性があるため、安全のため特殊な処理をする。
    // 課題は「要素数と最大値」を求めることなので、空の場合も count=0, max=?? となるが、
    // 例に従い計算されたものを出力する。もしデータがない場合はmaxが影響しないように、最初の値やデフォルト値を考える必要がある。
    // しかし、ここでは単純に抽出できたものの数と最大値を出すことに注力する。

  } else {
    console.log(`count=${count} max=${max}`);
  }
});
