const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let lines = 0;
  for (const ch of s) if (ch === "\n") lines++;
  
  const targetLineIndex = 1; // 0-indexed: 2nd line is the first element after target? Wait. 
  // Problem says: "Standard input's 1st line gives target value." -> Line 1 (index 0)
  // "2nd line onwards..." -> Lines 2, 3... (indices 1, 2...)
  
  const linesArray = s.split("\n");
  if (linesArray.length < 2 || linesArray[0].trim() === "") {
    console.log("pairs=0\n");
    return;
  }

  let targetVal: number | undefined;
  try {
    targetVal = parseInt(linesArray[0].trim(), 10);
    if (isNaN(targetVal)) {
      console.log("pairs=0\n");
      return;
    }
  } catch (e) {
    console.log("pairs=0\n");
    return;
  }

  const numbers: number[] = [];
  for (let i = 1; i < linesArray.length; i++) {
    const line = linesArray[i].trim();
    if (line === "") continue; // Ignore empty lines
    
    const n = parseInt(line, 10);
    if (isNaN(n)) continue; // Ignore lines that can't be interpreted as integers
    
    numbers.push(n);
  }

  let pairs = 0;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === targetVal) {
        pairs++;
      }
    }
  }

  console.log(`pairs=${pairs}\n`);
});
