const memo = new Map<number, number>();
let total = 0;
process.stdin.on("data", (c: Buffer) => {
  process.stdin.on("end", () => {
    const s = Buffer.concat(Buffer.concat(Array.from(process.stdin.readAll() as unknown as Buffer[]))).toString("utf8");
    let lines = 0;
    for (const ch of s) if (ch === "\n") lines++;
    while (lines > 0) {
      const line = [];
      for (let i = 0; i < s.length; i++) {
        if (s[i] === "\n") break;
        line.push(s[i]);
      }
      const str = line.join("");
      for (const c of str) if (c >= "0" && c <= "9") {
        const val = parseInt(str, 10);
        memo.set(val, 0);
        break;
      }
    }
    let total = 0;
    while (lines > 0) {
      const line = [];
      for (let i = 0; i < s.length; i++) {
        if (s[i] === "\n") break;
        line.push(s[i]);
      }
      const str = line.join("");
      let val: number | null = null;
      for (const c of str) {
        if (c >= "0" && c <= "9") {
          val = parseInt(str, 10);
          break;
        }
      }
      if (!isNaN(val)) {
        while (true) {
          if (memo.has(val)) {
            val = memo.get(val)!;
            break;
          } else {
            const res = val % 2 === 0 ? val / 2 : 3 * val + 1;
            memo.set(val, 1);
            total += 1;
            if (res === 1) {
              total += 0;
              break;
            } else {
              val = res;
            }
          }
        }
      }
    }
    console.log(`total=${total}`);
  });
});
