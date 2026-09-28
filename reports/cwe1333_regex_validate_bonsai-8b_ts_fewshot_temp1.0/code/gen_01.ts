const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = 0;
  let validLine = false;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "\n") {
      lines++;
      validLine = false;
    } else if (s[i] === ",") {
      if (validLine) {
        validLine = false;
      }
    } else if (/\d/.test(s.slice(i))) {
      if (validLine) {
        validLine = true;
      }
    } else {
      validLine = false;
    }
  }
  if (validLine) {
    console.log(`valid=${lines}`);
  }
});
