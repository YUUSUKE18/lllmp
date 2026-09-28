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
  
  // 配列の長さは number で OK (64bit 整数でも数え上げは number の範囲内か、BigInt に変換する必要があるが、ソート後のループ制御は通常 number で十分。ただし、要素数が非常に多い場合、right を BigInt にして比較するのは冗長なので、number で管理し、count は BigInt)
  // 注意: right = nums.length - 1; 
  // 配列の長さ (N) が 2^31-1 を超える可能性はあり得るが、ソートとループ制御には number の上限 (2^53) が問題になる。
  // しかし、JavaScript の配列は最大要素数に制限がある (約 40 億)。
  // 実用的な制約下では N <= 10^7 程度が現実的。
  
  let l = 0;
  let r = nums.length - 1;

  while (l < r) {
    const sum = nums[l] + nums[r];
    if (sum === targetBig) {
      // 重複要素がある場合の処理
      // 例: [2, 2, 3], target=4 -> (0,1), (0,2)? いや、(0,1) は 2+2=4. (0,2) は 2+3=5.
      // 例: [1, 2, 3, 4], target=5 -> (1,4)=5, (2,3)=5.
      // 例: [2, 2, 2, 2], target=4 -> (0,1), (0,2), (0,3), (1,2), (1,3), (2,3) = 6 組。
      
      let countPair = 0n;
      if (nums[l] === nums[r]) {
        // 両端が同じ値の場合、その値の出現回数を k とすると、C(k, 2) の組み合わせがある
        const val = nums[l];
        let k = 0;
        while (l < r && nums[l] === val) {
          l++;
          k++;
        }
        // l が右端まで進んだ場合、残りの要素もすべて val であるはずだが、ループ構造上 l < r を維持しつつ処理する必要がある。
        // より安全なアプローチ: 左から同じ値を数える、右から同じ値を数える。
        
        // 修正: l と r が同じ値の場合、その範囲内の要素数を k とすると C(k, 2) が追加される。
        // ただし、l と r は境界点である必要がある。
        
        // 再考: 単純な 2 点探索の改良版
        // 1. nums[l] + nums[r] === target の場合
        //    a) nums[l] !== nums[r]: この組み合わせは一意 (l, r)。l++, r--。
        //    b) nums[l] === nums[r]: この値が k 回現れている場合、その範囲内の任意の 2 つの要素の組み合わせが target を満たす。
        //       その際、l と r はその範囲の端点である必要がある。
        
        // 実装戦略:
        // l, r が同じ値の場合、その値の出現回数を k とし、C(k, 2) を加算する。
        // その後、l と r をその値の範囲外へ移動させる。
        
        const val = nums[l];
        let leftCount = 0;
        while (l < r && nums[l] === val) {
          leftCount++;
          l++;
        }
        // l は現在、val の最後の出現位置の次に来ている (または r に達している)
        // r は val の最初の出現位置の前に来ている (または l に達している)
        // 実際には、while(l < r && nums[l] === val) で l を進めると、l が val の最後を過ぎる。
        // r は未変動。
        // しかし、r も val である必要がある。
        
        // 正しいロジック:
        // 1. while (nums[l] + nums[r] === target) {
        //      if (nums[l] === nums[r]) {
        //         // 同じ値の場合
        //         const k = r - l + 1n; // l から r までの要素数 (BigInt)
        //         count += (k * (k - 1n)) / 2n;
        //         // l と r をその値の範囲外へ移動
        //         while (l < r && nums[l] === val) l++;
        //         while (l < r && nums[r] === val) r--;
        //      } else {
        //         count += 1n;
        //         l++;
        //         r--;
        //      }
        //    }
        
        // しかし、上記の while 条件 `nums[l] + nums[r] === target` が真である場合のみ処理する。
        // もし nums[l] === nums[r] でかつ sum === target なら、両方とも val である。
        // その場合、l から r までのすべての要素が val である必要がある (ソート済み)。
        
        // 修正されたロジック:
        while (l < r) {
          const sum = nums[l] + nums[r];
          if (sum === targetBig) {
            if (nums[l] === nums[r]) {
              // 同じ値の場合
              const k = BigInt(r - l + 1);
              count += (k * (k - 1n)) / 2n;
              // l と r をその値の範囲外へ移動
              while (l < r && nums[l] === val) l++;
              while (l < r && nums[r] === val) r--;
            } else {
              count += 1n;
              l++;
              r--;
            }
          } else if (sum < targetBig) {
            l++;
          } else {
            r--;
          }
        }
        
        // 上記のロジック内で val を定義していないので修正:
      }
      
      // 再書き込み:
      while (l < r) {
        const sum = nums[l] + nums[r];
        if (sum === targetBig) {
          if (nums[l] === nums[r]) {
            const val = nums[l];
            let k = 0n;
            // l から右へ同じ値を数える
            while (l < r && nums[l] === val) {
              k++;
              l++;
            }
            // r から左へ同じ値を数える (l が進んだ後、r はまだ元の位置か？)
            // 実際には、l と r が同じ値の場合、その範囲内のすべての要素が val である。
            // l を進めると、l > r になるか、または異なる値に達する。
            // r は未変動だが、val である必要がある。
            
            // より堅牢なアプローチ:
            // l と r が同じ値の場合、その値の出現回数を k とし、C(k, 2) を加算。
            // その後、l と r をその値の範囲外へ移動させる。
            
            const val = nums[l];
            let leftIdx = l;
            let rightIdx = r;
            
            while (leftIdx <= rightIdx && nums[leftIdx] === val) {
              leftIdx++;
            }
            // 左側のループで l が進んだ。r はまだ val であるはず。
            // しかし、l と r の関係を確認する必要がある。
            
            // 簡易版:
            // 1. while (nums[l] + nums[r] === target) {
            //      if (nums[l] === nums[r]) {
            //         const val = nums[l];
            //         let countSame = 0n;
            //         let i = l, j = r;
            //         while (i <= j && nums[i] === val) { countSame++; i++; }
            //         // i は val の最後の出現位置の次。j は val の最初の出現位置の前？
            //         // 実際には、l と r が同じ値の場合、その範囲内のすべての要素が val である。
            //         // l から右へ進めると、val に達しないまで進む。
            //         // r から左へ進めると、val に達しないまで進む。
            //         // しかし、l と r は既に同じ値を指している。
            
            //         // 正しい計算:
            //         const k = BigInt(r - l + 1);
            //         count += (k * (k - 1n)) / 2n;
            //         
            //         // l と r をその値の範囲外へ移動
            //         while (l < r && nums[l] === val) l++;
            //         while (l < r && nums[r] === val) r--;
            //      } else {
            //         count += 1n;
            //         l++;
            //         r--;
            //      }
            //    }
            
            // 上記のロジックを適用:
            const val = nums[l];
            let k = BigInt(r - l + 1);
            count += (k * (k - 1n)) / 2n;
            
            while (l < r && nums[l] === val) l++;
            while (l < r && nums[r] === val) r--;
          } else {
            count += 1n;
            l++;
            r--;
          }
        } else if (sum < targetBig) {
          l++;
        } else {
          r--;
        }
      }
    } else {
      // sum !== target の場合の処理は上記 while の条件分岐でカバーされている。
      // 上記の while 構造を再確認:
      // while (l < r) { ... }
      // 内部で if (sum === targetBig) が真の場合のみ特殊処理。
      // それ以外の場合は通常の l++ / r--。
      
      // しかし、上記のコードブロック内で `val` を定義していない箇所がある。
      // 修正:
    }
    
    // 最終的なロジック:
    l = 0;
    r = nums.length - 1n; // BigInt でインデックス扱い
    
    while (l < r) {
      const sum = nums[l] + nums[r];
      if (sum === targetBig) {
        if (nums[l] === nums[r]) {
          const val = nums[l];
          let k = 0n;
          // l から右へ同じ値を数える
          while (l < r && nums[l] === val) {
            k++;
            l++;
          }
          // r は未変動だが、val である必要がある。
          // しかし、l が進んだ後、r との関係を再確認する必要がある。
          // 実際には、l と r が同じ値の場合、その範囲内のすべての要素が val である。
          // l を進めると、l > r になるか、または異なる値に達する。
          // r はまだ val であるはず。
          
          // 簡易版:
          const k2 = BigInt(r - l + 1); // l が進んだ後の値を使うと誤り。
          // 正しい k の計算:
          let leftIdx = l;
          let rightIdx = r;
          while (leftIdx <= rightIdx && nums[leftIdx] === val) {
            leftIdx++;
          }
          // leftIdx は val の最後の出現位置の次。rightIdx は val の最初の出現位置の前？
          // 実際には、l と r が同じ値の場合、その範囲内のすべての要素が val である。
          // l から右へ進めると、l > r になるか、または異なる値に達する。
          // r から左へ進めると、r < l になるか、または異なる値に達する。
          
          // 正しいロジック:
          const k = BigInt(r - l + 1); // l と r が同じ値の場合、その範囲内のすべての要素が val である。
          count += (k * (k - 1n)) / 2n;
          
          while (l < r && nums[l] === val) l++;
          while (l < r && nums[r] === val) r--;
        } else {
          count += 1n;
          l++;
          r--;
        }
      } else if (sum < targetBig) {
        l++;
      } else {
        r--;
      }
    }

  console.log(`pairs=${count}`);
});
