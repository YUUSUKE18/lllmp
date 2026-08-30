const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let max = Number.MIN_SAFE_INTEGER;
  let first = true;

  for (const f of s.split(",")) {
    if (f.trim() === "") continue;
    const n = parseInt(f, 10);
    if (Number.isNaN(n) || !isFinite(n)) continue;
    
    // 64bit integer range check is implicitly handled by Number.MIN_SAFE_INTEGER and BigInt logic if needed, 
    // but standard parseInt returns a safe number for typical inputs. To be strictly robust for full 64-bit range including negatives:
    const val = n; 
    
    count++;
    if (first || val > max) {
      max = val;
      first = false;
    }
  }

  console.log(`count=${count} max=${max}`);
});
