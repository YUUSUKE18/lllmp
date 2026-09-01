const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  let target: number | null = null;
  for (const line of lines) {
    if (line.trim() === "") continue;
    const val = parseInt(line, 10);
    if (!Number.isNaN(val)) {
      target = val;
      break;
    }
  }

  if (target === null) {
    console.log("pairs=0");
    return;
  }

  const nums: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "") continue;
    const val = parseInt(line, 10);
    if (!Number.isNaN(val)) {
      nums.push(val);
    }
  }

  let count = 0n;
  const n = nums.length;
  
  // 2 点探索法またはハッシュマップ法。
  // 入力サイズが巨大な場合、O(N log N) または O(N) のアルゴリズムが必要。
  // ここではソートして 2 点探索を行うことで、重複ペアの処理も容易にできる。
  
  nums.sort((a, b) => a - b);

  let left = 0;
  let right = n - 1n; // BigInt でインデックスを扱うが、比較は number で OK
  
  // 注意: right は初期値として n-1 を持つ。BigInt と Number の混在を避けるため、右端の値を数値で管理する。
  let r = n - 1;

  while (left < r) {
    const sum = nums[left] + nums[r];
    
    if (sum === target) {
      // 重複がある場合の処理
      if (nums[left] === nums[r]) {
        // すべて同じ値の場合、組み合わせは C(k, 2)
        const k = r - left + 1n;
        count += (k * (k - 1n)) / 2n;
        break; // 左と右が一致している場合、残りの要素もすべて同じなので終了
      } else {
        // 値が異なる場合
        const valL = nums[left];
        const valR = nums[r];
        
        // 左側でこの値が何回現れるか
        let lCount = 0;
        while (left < r && nums[left] === valL) {
          lCount++;
          left++;
        }
        
        // 右側でこの値が何回現れるか（ただし、左側と重複しないように注意）
        // 既に left が進んでいるので、現在の right から遡って数える
        let rCount = 0;
        while (r >= left && nums[r] === valR) {
          rCount++;
          r--;
        }
        
        count += BigInt(lCount) * BigInt(rCount);
      }
    } else if (sum < target) {
      left++;
    } else {
      r--;
    }
  }

  console.log(`pairs=${count}`);
});
