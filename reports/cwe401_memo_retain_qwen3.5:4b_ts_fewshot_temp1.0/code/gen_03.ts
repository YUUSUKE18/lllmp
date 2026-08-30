const memo = new Map<number, number>();
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let total = 0;
  let inInt = false;
  let currentNum = 0;
  for (const ch of s) {
    if (!inInt && (ch >= "0" && ch <= "9")) {
      currentNum = parseInt(`${currentNum}${ch}`, 10);
      inInt = true;
    } else if (inInt && ch !== "-" && !isNaN(parseInt(ch))) {
      continue; 
    } else {
      if (inInt) {
        const lines = memo.get(currentNum);
        let count = lines ?? 0;
        let n = currentNum;
        while (n !== 1) {
          const isEven = n % 2 === 0;
          if (isEven) {
            n = n / 2;
          } else {
            n = 3 * n + 1;
          }
        }
        count += (memo.get(n) ?? 0);
        memo.set(currentNum, count);
      }
      inInt = false;
      currentNum = parseInt(ch === "-" ? "-1" : "0", 10); 
    }
  }
  console.log(`total=${total}`);
});
