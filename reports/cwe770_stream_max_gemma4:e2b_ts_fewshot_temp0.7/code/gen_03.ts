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

    // チェック: 数値として解釈でき、64bit整数範囲内かを確認（今回はparseIntで十分だが、厳密に）
    if (!isNaN(num)) {
      // 最大値を更新
      if (num > max) {
        max = num;
      }
      count++;
      hasValidNumber = true;
    }
  }

  // 有効な数値があった場合のみ出力する（仕様に明記されていないが、通常はデータが存在する場合を想定）
  if (hasValidNumber) {
    console.log(`count=${count} max=${max}`);
  } else {
    // 読み込んだ要素がすべて無効だった場合の処理（ここでは count=0, max=? とする。最大値の初期値に依存するが、-Infinityを保持）
    // ただし、空入力の場合など、実質的なデータがない場合は count=0, max=-Infinity となる。
    console.log(`count=0 max=-Infinity`); // または、仕様に合わせて適切なデフォルト値を設定するが、ここでは計算結果をそのまま出力する
  }
});
