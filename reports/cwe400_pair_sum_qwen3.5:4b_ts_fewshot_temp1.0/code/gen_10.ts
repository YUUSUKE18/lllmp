const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let inputParts = s.split("\n").map(l => l.trim()).filter(l => l.length > 0);
  if (inputParts.length < 2) {
    console.log("pairs=0");
    return;
  }

  const target = parseInt(inputParts[0], 10);
  const nums: bigint[] = [];
  
  for (const str of inputParts.slice(1)) {
    const n = BigInt(parseInt(str, 10));
    if (!Number.isNaN(Number(n))) { // Check if valid number (handles non-integer-like garbage if any)
        try {
            nums.push(n);
        } catch(e) {} // Ignore lines that are numbers but overflow or invalid format
    }
  }

  let count = 0n;
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (nums[i] + nums[j] === target) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
