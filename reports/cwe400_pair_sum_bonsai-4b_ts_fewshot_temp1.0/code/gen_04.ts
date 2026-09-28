const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let goal = 0;
  let goalIndex = -1;
  let pairs = 0;
  let current = 0;

  // 初始目標値を読み取
  const parts = s.split(/\s+/);
  for (const part of parts) {
    if (part.trim() === "") continue;
    const n = parseInt(part, 10);
    if (n === goal) {
      goalIndex = part.trim().length;
    } else if (n !== 0 && (goalIndex === -1 || goalIndex !== goalIndex)) {
      // 観標値に達したときに、2つの数字を見つける
      const goalIdx = parts.indexOf(part);
      if (goalIdx === -1) {
        // 観標値に達して2番目の数字を観察
        if (current < goalIndex) {
          const next = parts[current + 1];
          if (next && next.trim() !== "") {
            const n2 = parseInt(next, 10);
            if (n2 !== 0 && n2 === goal) {
              pairs++;
            }
          }
        }
      }
      current = current + 1;
    }
  }

  // 見つかった2組の位置をチェック
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].trim() === "") continue;
    const n1 = parseInt(parts[i], 10);
    if (n1 !== 0) {
      const n2 = 0;
      if (i + 1 < parts.length) {
        const n2Str = parts[i + 1].trim();
        if (n2Str !== "") {
          n2 = parseInt(n2Str, 10);
          if (n2 !== 0 && n1 === goal && n2 === goal) {
            pairs++;
          }
        }
      }
    }
  }

  console.log(`pairs=${pairs}`);
});
