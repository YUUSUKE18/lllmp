const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, sum = 0;
  // Regular expression to match the format value:count at the start of a string segment
  const regex = /^(\d+)\:(\d+)$/;
  
  // Use a global iterator to split by commas or end of string
  const matchResult = s.match(/[^,\s]*|(?=[,\s])/g);
  if (matchResult) {
    for (const segment of matchResult) {
      // Skip empty segments and those not matching the pattern
      if (segment === "" || !regex.test(segment)) continue;
      
      const [valStr, countStr] = segment.split(":");
      if (!valStr || !countStr) continue;
      
      const value: number = parseInt(valStr.trim(), 10);
      const repeatCount: number = parseInt(countStr.trim(), 10);
      
      // Validate input to ensure they are valid integers and repeatCount >= 0
      if (Number.isNaN(value) || Number.isNaN(repeatCount)) continue;
      if (repeatCount < 0) continue;

      count += repeatCount;
      sum += value * repeatCount;
    }
  }
  console.log(`count=${count} sum=${sum}`);
});
