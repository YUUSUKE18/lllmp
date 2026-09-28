const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  let line = 1;
  for (const ch of s) {
    if (ch === "\n") {
      line++;
      if (line > 1) {
        let num = 0;
        for (let i = 0; i < ch.length; i++) {
          const digit = ch[i];
          if (digit < "0" || digit > "9") continue;
          num = num * 10 + parseInt(digit, 10);
        }
        if (num !== 0) {
          count++;
          sum += num;
        }
      }
    } else if (ch >= "0" && ch <= "9") {
      let num = 0;
      for (let i = 0; i < ch.length; i++) {
        const digit = ch[i];
        if (digit < "0" || digit > "9") continue;
        num = num * 10 + parseInt(digit, 10);
      }
      if (num !== 0) {
        count++;
        sum += num;
      }
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
