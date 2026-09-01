const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  let target: number | null = null;
  for (const line of lines) {
    if (line.trim() === "") continue;
    const n = parseInt(line, 10);
    if (!Number.isNaN(n)) {
      target = n;
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
    const n = parseInt(line, 10);
    if (!Number.isNaN(n)) {
      nums.push(n);
    }
  }

  let count = 0n;
  const targetBig = BigInt(target);

  // 2 点探索法 (Two Pointers) を使用して O(N) で解決
  // 配列を昇順にソートする必要があるため、ここでソートを行う
  nums.sort((a, b) => a - b);

  let left = 0;
  let right = nums.length - 1n; // BigInt でインデックス扱い (安全のため)
  
  // 配列の長さは number で OK (64bit 整数の範囲内なら最大約 9e18 個はあり得るが、メモリ制約で現実的ではない。
  // しかし、問題文「値と個数は 64bit 整数の範囲」なので、要素数自体は巨大な配列になる可能性がある。
  // JavaScript の配列は最大インデックスに制限があるが、BigInt でカウントする必要がある。
  // ソート後の 2 点探索で重複を避ける処理を入れる。

  while (left < nums.length && right >= 0) {
    const sum = BigInt(nums[left]) + BigInt(nums[right]);
    
    if (sum === targetBig) {
      // 値が一致する場合、同じ値を持つ要素の数をカウントする必要がある
      // 左側から同じ値を数える
      let leftVal = nums[left];
      let rightVal = nums[right];
      
      let lCount = 0;
      while (left < nums.length && nums[left] === leftVal) {
        lCount++;
        left++;
      }
      
      let rCount = 0;
      while (right >= 0 && nums[right] === rightVal) {
        rCount++;
        right--;
      }
      
      // 左側と右側のグループが異なる場合、組み合わせは lCount * rCount
      if (leftVal !== rightVal) {
        count += BigInt(lCount) * BigInt(rCount);
      } else {
        // 同じ値の場合、2 つの要素を選ぶ組み合わせは C(n, 2) = n*(n-1)/2
        count += BigInt(lCount) * (BigInt(lCount) - 1n) / 2n;
      }
    } else if (sum < targetBig) {
      left++;
    } else {
      right--;
    }
  }

  console.log(`pairs=${count}`);
});
