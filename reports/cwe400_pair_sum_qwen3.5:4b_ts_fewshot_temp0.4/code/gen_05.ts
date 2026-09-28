const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let target = 0;
  
  // 目標値を読み込む（1 行目）
  if (lines.length > 0) {
    const firstLine = lines[0].trim();
    if (firstLine !== "") {
      target = parseInt(firstLine, 10);
      if (!Number.isNaN(target)) {
        // 目標値が整数でない場合は処理をスキップする（仕様上は与えられるとされるが、安全のため）
        return; 
      }
    } else {
      return;
    }
  }

  const nums: number[] = [];
  
  // 2 行目以降の整数を読み込む
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    
    const n = parseInt(line, 10);
    if (!Number.isNaN(n)) {
      nums.push(n);
    }
  }

  let count = 0;
  // 2 つの異なるインデックスを持つ組を探す
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
