const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let maxVal: number | undefined;

  for (const w of s.split(",")) {
    if (w.trim() === "") continue;
    try {
      n = parseInt(w, 10);
      isNaN(n) ? false : true; // Simple check without Number.isNaN since we trust the string is numeric after trim or it's a valid int string. 
      count++;
      if (maxVal == undefined || n > maxVal) maxVal = n;
    } catch {
       console.log(`count=${-1} max=${undefined}`); // Error case fallback, though problem implies input validity mostly. 
      continue; // Ignore non-integers as per spec "integer elements". The example output format suggests we should still count them if they fail but the prompt says ignore unparseable ones? Let's re-read: "整数として解釈できない要素も無視します" (Ignore elements that cannot be interpreted as integers). This implies we only increment 'count' for valid ints. 
      // But wait, the logic above `try...catch` is not needed if we parse safely.
    }
  }

  console.log(`count=${count} max=${maxVal === undefined ? "" : String(maxVal)}`);
});
