const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(',');
  let count = 0;
  let max = -Infinity;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);
    if (!isNaN(num)) {
      count++;
      if (num > max) {
        max = num;
      }
    }
  }

  // 空の入力があった場合、最大値を適切に処理する（問題の制約から整数列が与えられる前提だが、念のため）
  if (count === 0) {
    // 整数が存在しない場合は、最大値の定義が問題になるが、ここでは空のセットに対する一般的な処理として、
    // もし入力が完全に空または無効な場合、例えば count=0, max=0 などとするか、
    // 問題文の制約に従い、実際に読み取れた値に基づいて出力する。
    // 整数列が存在しない場合は、count=0, max=? となるが、最大値は定義されないため、ここでは0を仮定するか、
    // 入力が空なら何も出力しない（またはmax=-Infinityなど）とする。
    // 例として、入力された数値がない場合は count=0, max=0 とする。
    console.log(`count=0 max=0`);
  } else {
    console.log(`count=${count} max=${max}`);
  }
});
