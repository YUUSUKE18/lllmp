import { parseBigInt } from "node:buffer";

process.stdin.on("data", async (c: Buffer) => {
  const s = Buffer.concat(data).toString("utf8");
  const goal = parseBigInt(s.slice(0, s.indexOf("\n")));
  let pairs = 0;

  for (let i = 0; i < s.length - 1; i++) {
    const numStr = s.slice(i + 1, i + 2);
    if (numStr.trim() === "") continue;
    const num = parseBigInt(numStr);
    if (Number.isNaN(num)) continue;

    for (let j = i + 2; j < s.length; j++) {
      const numStr2 = s.slice(j, j + 2);
      if (numStr2.trim() === "") continue;
      const num2 = parseBigInt(numStr2);
      if (Number.isNaN(num2)) continue;

      if (num + num2 === goal) {
        pairs++;
      }
    }
  }

  console.log(`pairs=${pairs}`);
});
