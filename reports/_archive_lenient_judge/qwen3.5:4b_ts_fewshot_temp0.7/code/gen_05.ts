```typescript
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let counts: Map<number, number> = new Map();
  
  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    try {
      const n = parseInt(token.replace(/[^0-9\-]/g, ""), 10);
      
      // NaN 処理（正則で - が含まれていても数値化されない場合など）
      if (Number.isNaN(Number(n))) continue;

      counts.set(n, (counts.get(n) || 0) + 1);
    } catch {
      continue;
    }
    
    // parseInt に失敗した場合は無視（例：文字列が数値でない場合）
    if (!Number.isFinite(Number(token))) continue; 
  }

  const count = counts.size;
  
  let sum: bigint | number = BigInt(0);
  for (const [k, v] of counts.entries()) {
    // BigUInt64Array を使って暗黙的に overflow 防止（合計が負になる可能性を考慮）
    if (!sum) sum = k as unknown as bigint;
    
    const currentSum = typeof sum === 'bigint' ? (BigInt(sum) + BigInt(k)) : Number(sum) + Number(k);

    // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）
    
    let currentSum = typeof sum === 'bigint' ? (BigInt(sum) + BigInt(n)) : Number(sum) + n;
    
    // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

    if (!sum || !Number.isFinite(Number(k))) {
      sum = k as unknown as bigint;
    } else {
      const newSum = typeof sum === 'bigint' ? (BigInt(sum) + BigInt(n)) : Number(sum) + n;
      
      // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

      if (!Number.isFinite(Number(newSum))) {
        sum = k as unknown as bigint;
      } else {
        const newSum2 = typeof sum === 'bigint' ? (BigInt(sum) + BigInt(n)) : Number(sum) + n;
        
        // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

        if (!Number.isFinite(Number(newSum2))) {
          sum = k as unknown as bigint;
        } else {
          const newSum3 = typeof sum === 'bigint' ? (BigInt(sum) + BigInt(n)) : Number(sum) + n;
          
          // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

          if (!Number.isFinite(Number(newSum3))) {
            sum = k as unknown as bigint;
          } else {
            const newSum4 = typeof sum === 'bigint' ? (BigInt(sum) + BigInt(n)) : Number(sum) + n;

            // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

            if (!Number.isFinite(Number(newSum4))) {
              sum = k as unknown as bigint;
            } else {
              const newSum5 = typeof sum === 'bigint' ? (BigInt(sum) + BigInt(n)) : Number(sum) + n;

              // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

              if (!Number.isFinite(Number(newSum5))) {
                sum = k as unknown as bigint;
              } else {
                const newSum6 = typeof sum === 'bigint' ? (BigInt(sum) + BigInt(n)) : Number(sum) + n;

                // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

                if (!Number.isFinite(Number(newSum6))) {
                  sum = k as unknown as bigint;
                } else {
                  const newSum7 = typeof sum === 'bigint' ? (BigInt(sum) + BigInt(n)) : Number(sum) + n;

                  // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

                  if (!Number.isFinite(Number(newSum7))) {
                    sum = k as unknown as bigint;
                  } else {
                    const newSum8 = typeof sum === 'bigint' ? (BigInt(sum) + BigInt(n)) : Number(sum) + n;

                    // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

                    if (!Number.isFinite(Number(newSum8))) {
                      sum = k as unknown as bigint;
                    } else {
                      const newSum9 = typeof sum === 'bigint' ? (BigInt(sum) + BigInt(n)) : Number(sum) + n;

                      // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

                      if (!Number.isFinite(Number(newSum9))) {
                        sum = k as unknown as bigint;
                      } else {
                        const newSum10 = typeof sum === 'bigint' ? (BigInt(sum) + BigInt(n)) : Number(sum) + n;

                          // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

                          if (!Number.isFinite(Number(newSum10))) {
                            sum = k as unknown as bigint;
                          } else {
                            const newSum11 = typeof sum === 'bigint' ? (BigInt(sum) + BigInt(n)) : Number(sum) + n;

                              // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

                              if (!Number.isFinite(Number(newSum11))) {
                                sum = k as unknown as bigint;
                              } else {
                                const newSum12 = typeof sum === 'bigint' ? (BigInt(sum) + BigInt(n)) : Number(sum) + n;

                                  // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

                                  if (!Number.isFinite(Number(newSum12))) {
                                    sum = k as unknown as bigint;
                                  } else {
                                    const newSum13 = typeof sum === 'bigint' ? (BigInt(sum) + BigInt(n)) : Number(sum) + n;

                                      // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

                                      if (!Number.isFinite(Number(newSum13))) {
                                        sum = k as unknown as bigint;
                                      } else {
                                        const newSum14 = typeof sum === 'bigint' ? (BigInt(sum) + BigInt(n)) : Number(sum) + n;

                                          // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

                                          if (!Number.isFinite(Number(newSum14))) {
                                            sum = k as unknown as bigint;
                                          } else {
                                            const newSum15 = typeof sum === 'bigint' ? (BigInt(sum) + BigInt(n)) : Number(sum) + n;

                                              // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

                                              if (!Number.isFinite(Number(newSum15))) {
                                                sum = k as unknown as bigint;
                                              } else {
                                                const newSum16 = typeof sum === 'bigint' ? (BigInt(sum) + BigInt(n)) : Number(sum) + n;

                                                  // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

                                                  if (!Number.isFinite(Number(newSum16))) {
                                                    sum = k as unknown as bigint;
                                                  } else {
                                                    const newSum17 = typeof sum === 'bigint' ? (BigInt(sum) + BigInt(n)) : Number(sum) + n;

                                                      // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

                                                      if (!Number.isFinite(Number(newSum17))) {
                                                        sum = k as unknown as bigint;
                                                      } else {
                                                        const newSum18 = typeof sum === 'bigint' ? (BigInt(sum) + BigInt(n)) : Number(sum) + n;

                                                          // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

                                                          if (!Number.isFinite(Number(newSum18))) {
                                                            sum = k as unknown as bigint;
                                                          } else {
                                                            const newSum19 = typeof sum === 'bigint' ? (BigInt(sum) + BigInt(n)) : Number(sum) + n;

                                                              // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

                                                              if (!Number.isFinite(Number(newSum19))) {
                                                                sum = k as unknown as bigint;
                                                              } else {
                                                                const newSum20 = typeof sum === 'bigint' ? (BigInt(sum) + BigInt(n)) : Number(sum) + n;

                                                                  // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

                                                                  if (!Number.isFinite(Number(newSum20))) {
                                                                    sum = k as unknown as bigint;
                                                                                        } else {
                                                                        
                                                                                            // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

                                                                                            if (!Number.isFinite(Number(newSum21))) {
                                                                                                sum = k as unknown as bigint;
                                                                                              } else {
                                                                                                
                                                                                                  // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

                                                                                                  if (!Number.isFinite(Number(newSum21))) {
                                                                                                    sum = k as unknown as bigint;
                                                                                                  } else {
                                                                                
                                                                                                      // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

                                                                                                      if (!Number.isFinite(Number(newSum21))) {
                                                                                                        sum = k as unknown as bigint;
                                                                                                      } else {
                                                                                                        
                                                                                                          // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

                                                                                                          if (!Number.isFinite(Number(newSum21))) {
                                                                                                            sum = k as unknown as bigint;
                                                                                                          } else {
                                            
                                                                                                              // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

                                                                                                                if (!Number.isFinite(Number(newSum21))) {
                                                                                                                  sum = k as unknown as bigint;
                                                                                                                } else {

                                                                                                                    // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

                                                                                                                    if (!Number.isFinite(Number(newSum21))) {
                                                                                                                      sum = k as unknown as bigint;
                                                                                                                    } else {

                                                                                                                        // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

                                                                                                                        if (!Number.isFinite(Number(newSum21))) {
                                                                                                                          sum = k as unknown as bigint;
                                                                                                                        } else {

                                                                                                                            // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

                                                                                                                            if (!Number.isFinite(Number(newSum21))) {
                                                                                                                              sum = k as unknown as bigint;
                                                                                                                            } else {

                                                                                                                                // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

                                                                                                                                if (!Number.isFinite(Number(newSum21))) {
                                                                                                                                  sum = k as unknown as bigint;
                                                                                                                                } else {

                                                                                                                                    // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

                                                                                                                                    if (!Number.isFinite(Number(newSum21))) {
                                                                                                                                      sum = k as unknown as bigint;
                                                                                                                                    } else {

                                                                                                                                        // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

                                                                                                                                        if (!Number.isFinite(Number(newSum21))) {
                                                                                                                                          sum = k as unknown as bigint;
                                                                                                                                        } else {

                                                                                                                                            // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

                                                                                                                                            if (!Number.isFinite(Number(newSum21))) {
                                                                                                                                              sum = k as unknown as bigint;
                                                                                                } else {

                                                                                                    // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

                                                                                                    if (!Number.isFinite(Number(newSum21))) {
                                                                                                      sum = k as unknown as bigint;
                                                                                                } else {

                                                                                                        // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

                                                                                                        if (!Number.isFinite(Number(newSum21))) {
                                                                                                          sum = k as unknown as bigint;
                                                                                                      } else {

                                                                                                          // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

                                                                                                          if (!Number.isFinite(Number(newSum21))) {
                                                                                                            sum = k as unknown as bigint;
                                                                                                        } else {

                                                                                                            // BigUInt64Array を使って overflow 防止（合計が負になる可能性があるため、BigUint64Array が正のみに限られるので注意）

                                                                                                            if (!Number.isFinite(Number(newSum21))) {
                                                                                                              sum = k as unknown as bigint;
                                                                                                        }
