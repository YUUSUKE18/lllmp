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

  // 空の入力があった場合の処理（もし全ての要素が数値でなかった場合、count=0, max=-Infinityとなる可能性がある）
  // 問題の仕様から「整数として解釈できない要素も無視する」ため、countとmaxは有効な数値のみに基づいている。
  if (count === 0) {
      // カウントが0の場合、最大値の出力は任意だが、ここでは-1など何らかの基準値を設定するか、
      // 入力が完全に空だった場合は count=0, max=0 などとするのが自然だが、
      // ここでは読み取った数値に基づき処理を続ける。もし数値が一つもなかった場合、max=-Infinityとなるため、
      // 64bit整数範囲を考慮し、ここではcount=0, max=0と仮定するか、あるいは-1などを返すか検討が必要だが、
      // 例に従い、読み取れた値に基づいて出力する。もし数値が一つもなかった場合は最大値は定義できないため、
      // 最小の64bit整数（または問題文の意図を汲んで）を考慮する必要がある。
      // 今回は「要素数と最大値」を求めるので、データが存在しない場合は count=0, max=0とするのが安全か。
      console.log(`count=0 max=0`);
  } else {
    console.log(`count=${count} max=${max}`);
  }
});
