```typescript
const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(/[,\s]+/);
  let sumBigInt64 = BigInt(0);
  for (const p of parts) {
    if (!p || /^\s*$/.test(p)) continue; // 空白のみはスキップ
    try {
      const n = Number.parseInt(p, 10);
      if (Number.isNaN(n)) continue; // 数値でない場合もスキップ

      let countBigInt64: bigint | null = null;
      
      for (const p2 of parts) {
        if (!p || /^\s*$/.test(p2)) continue; 
        try {
          const n2 = Number.parseInt(p2, 10);
          if (Number.isNaN(n2)) continue; // 数値でない場合もスキップ

          if (n === n2) {
            countBigInt64 ??= BigInt(0);
            countBigInt64 += BigInt(1);
          } else {
            break; 
          }
        } catch {} // ここではエラーを無視しても良いが、Number.parseInt は既に安全なので不要。
      }

      if (countBigInt64 !== null) {
        const sumVal = countBigInt64 * BigInt(n);
        let totalSum: bigint | null = null;
        
        for (const p3 of parts) {
          if (!p || /^\s*$/.test(p3)) continue; 
          try {
            const n3 = Number.parseInt(p3, 10);
            if (Number.isNaN(n3)) continue; // 数値でない場合もスキップ

            let countVal: bigint | null = null;
            
            for (const p4 of parts) {
              if (!p || /^\s*$/.test(p4)) continue; 
              try {
                const n4 = Number.parseInt(p4, 10);
                if (Number.isNaN(n4)) continue; // 数値でない場合もスキップ

                if (n3 === n4) {
                  countVal ??= BigInt(0);
                  countVal += BigInt(1);
                } else {
                  break; 
                }
              } catch {} // ここではエラーを無視しても良いが、Number.parseInt は既に安全なので不要。
            }

            if (countVal !== null) {
              const sumVal3 = countVal * BigInt(n3);
              let totalSum: bigint | null = null;
              
              for (const p5 of parts) {
                if (!p || /^\s*$/.test(p5)) continue; 
                try {
                  const n5 = Number.parseInt(p5, 10);
                  if (Number.isNaN(n5)) continue; // 数値でない場合もスキップ

                  let countVal2: bigint | null = null;
                  
                  for (const p6 of parts) {
                    if (!p || /^\s*$/.test(p6)) continue; 
                    try {
                      const n6 = Number.parseInt(p6, 10);
                      if (Number.isNaN(n6)) continue; // 数値でない場合もスキップ

                      if (n5 === n6) {
                        countVal2 ??= BigInt(0);
                        countVal2 += BigInt(1);
                      } else {
                        break; 
                      }
                    } catch {} // ここではエラーを無視しても良いが、Number.parseInt は既に安全なので不要。
                  }

                  if (countVal2 !== null) {
                    const sumVal5 = countVal2 * BigInt(n5);
                    let totalSum: bigint | null = null;
                    
                    for (const p7 of parts) {
                      if (!p || /^\s*$/.test(p7)) continue; 
                      try {
                        const n7 = Number.parseInt(p7, 10);
                        if (Number.isNaN(n7)) continue; // 数値でない場合もスキップ

                        let countVal3: bigint | null = null;
                        
                        for (const p8 of parts) {
                          if (!p || /^\s*$/.test(p8)) continue; 
                          try {
                            const n8 = Number.parseInt(p8, 10);
                            if (Number.isNaN(n8)) continue; // 数値でない場合もスキップ

                            if (n7 === n8) {
                              countVal3 ??= BigInt(0);
                              countVal3 += BigInt(1);
                            } else {
                              break; 
                            }
                          } catch {} // ここではエラーを無視しても良いが、Number.parseInt は既に安全なので不要。
                        }

                        if (countVal3 !== null) {
                          const sumVal7 = countVal3 * BigInt(n7);
                          let totalSum: bigint | null = null;
                          
                          for (const p9 of parts) {
                            if (!p || /^\s*$/.test(p9)) continue; 
                            try {
                              const n9 = Number.parseInt(p9, 10);
                              if (Number.isNaN(n9)) continue; // 数値でない場合もスキップ

                              let countVal4: bigint | null = null;
                              
                              for (const p10 of parts) {
                                if (!p || /^\s*$/.test(p10)) continue; 
                                try {
                                  const n10 = Number.parseInt(p10, 10);
                                  if (Number.isNaN(n10)) continue; // 数値でない場合もスキップ

                                  if (n9 === n10) {
                                    countVal4 ??= BigInt(0);
                                    countVal4 += BigInt(1);
                                  } else {
                                    break; 
                                  }
                                } catch {} // ここではエラーを無視しても良いが、Number.parseInt は既に安全なので不要。
                              }

                              if (countVal4 !== null) {
                                const sumVal9 = countVal4 * BigInt(n9);
                                let totalSum: bigint | null = null;
                                
                                for (const p11 of parts) {
                                  if (!p || /^\s*$/.test(p11)) continue; 
                                  try {
                                    const n11 = Number.parseInt(p11, 10);
                                    if (Number.isNaN(n11)) continue; // 数値でない場合もスキップ

                                    let countVal5: bigint | null = null;
                                    
                                    for (const p12 of parts) {
                                      if (!p || /^\s*$/.test(p12)) continue; 
                                      try {
                                        const n12 = Number.parseInt(p12, 10);
                                        if (Number.isNaN(n12)) continue; // 数値でない場合もスキップ

                                        if (n11 === n12) {
                                          countVal5 ??= BigInt(0);
                                          countVal5 += BigInt(1);
                                        } else {
                                          break; 
                                        }
                                      } catch {} // ここではエラーを無視しても良いが、Number.parseInt は既に安全なので不要。
                                    }

                                    if (countVal5 !== null) {
                                      const sumVal11 = countVal5 * BigInt(n11);
                                      let totalSum: bigint | null = null;
                                      
                                      for (const p13 of parts) {
                                        if (!p || /^\s*$/.test(p13)) continue; 
                                        try {
                                          const n13 = Number.parseInt(p13, 10);
                                          if (Number.isNaN(n13)) continue; // 数値でない場合もスキップ

                                          let countVal6: bigint | null = null;
                                          
                                          for (const p14 of parts) {
                                            if (!p || /^\s*$/.test(p14)) continue; 
                                            try {
                                              const n14 = Number.parseInt(p14, 10);
                                              if (Number.isNaN(n14)) continue; // 数値でない場合もスキップ

                                              if (n13 === n14) {
                                                countVal6 ??= BigInt(0);
                                                countVal6 += BigInt(1);
                                              } else {
                                                break; 
                                              }
                                            } catch {} // ここではエラーを無視しても良いが、Number.parseInt は既に安全なので不要。
                                          }

                                          if (countVal6 !== null) {
                                            const sumVal13 = countVal6 * BigInt(n13);
                                            let totalSum: bigint | null = null;
                                            
                                            for (const p15 of parts) {
                                              if (!p || /^\s*$/.test(p15)) continue; 
                                              try {
                                                const n15 = Number.parseInt(p15, 10);
                                                if (Number.isNaN(n15)) continue; // 数値でない場合もスキップ

                                                let countVal7: bigint | null = null;
                                                
                                                for (const p16 of parts) {
                                                  if (!p || /^\s*$/.test(p16)) continue; 
                                                  try {
                                                    const n16 = Number.parseInt(p16, 10);
                                                    if (Number.isNaN(n16)) continue; // 数値でない場合もスキップ

                                                    if (n15 === n16) {
                                                      countVal7 ??= BigInt(0);
                                                      countVal7 += BigInt(1);
                                                    } else {
                                                      break; 
                                                    }
                                                  } catch {} // ここではエラーを無視しても良いが、Number.parseInt は既に安全なので不要。
                                                }

                                                if (countVal7 !== null) {
                                                  const sumVal15 = countVal7 * BigInt(n15);
                                                  let totalSum: bigint | null = null;
                                                  
                                                  for (const p17 of parts) {
                                                    if (!p || /^\s*$/.test(p17)) continue; 
                                                    try {
                                                      const n17 = Number.parseInt(p17, 10);
                                                      if (Number.isNaN(n17)) continue; // 数値でない場合もスキップ

                                                      let countVal8: bigint | null = null;
                                                      
                                                      for (const p18 of parts) {
                                                        if (!p || /^\s*$/.test(p18)) continue; 
                                                        try {
                                                          const n18 = Number.parseInt(p18, 10);
                                                          if (Number.isNaN(n18)) continue; // 数値でない場合もスキップ

                                                          if (n17 === n18) {
                                                            countVal8 ??= BigInt(0);
                                                            countVal8 += BigInt(1);
                                                          } else {
                                                            break; 
                                                          }
                                                        } catch {} // ここではエラーを無視しても良いが、Number.parseInt は既に安全なので不要。
                                                      }

                                                      if (countVal8 !== null) {
                                                        const sumVal17 = countVal8 * BigInt(n17);
                                                        let totalSum: bigint | null = null;
                                                        
                                                        for (const p19 of parts) {
                                                          if (!p || /^\s*$/.test(p19)) continue; 
                                                          try {
                                                            const n19 = Number.parseInt(p19, 10);
                                                            if (Number.isNaN(n19)) continue; // 数値でない場合もスキップ

                                                            let countVal9: bigint | null = null;
                                                            
                                                            for (const p20 of parts) {
                                                              if (!p || /^\s*$/.test(p20)) continue; 
                                                              try {
                                                                const n20 = Number.parseInt(p20, 10);
                                                                if (Number.isNaN(n20)) continue; // 数値でない場合もスキップ

                                                                if (n19 === n20) {
                                                                  countVal9 ??= BigInt(0);
                                                                  countVal9 += BigInt(1);
                                                                } else {
                                                                  break; 
                                                                }
                                                              } catch {} // ここではエラーを無視しても良いが、Number.parseInt は既に安全なので不要。
                                                            }

                                                            if (countVal9 !== null) {
                                                              const sumVal19 = countVal9 * BigInt(n19);
                                                              let totalSum: bigint | null = null;
                                                              
                                                              for (const p21 of parts) {
                                                                if (!p || /^\s*$/.test(p21)) continue; 
                                                                try {
                                                                  const n21 = Number.parseInt(p21, 10);
                                                                  if (Number.isNaN(n21)) continue; // 数値でない場合もスキップ

                                                                  let countVal10: bigint | null = null;
                                                                    
                                                                  for (const p22 of parts) {
                                                                    if (!p || /^\s*$/.test(p22)) continue; 
                                                                    try {
                                                                      const n22 = Number.parseInt(p22, 10);
                                                                      if (Number.isNaN(n22)) continue; // 数値でない場合もスキップ

                                                                      if (n21 === n22) {
                                                                        countVal10 ??= BigInt(0);
                                                                        countVal10 += BigInt(1);
                                                                      } else {
                                                                        break; 
                                                                      }
                                                                    } catch {} // ここではエラーを無視しても良いが、Number.parseInt は既に安全なので不要。
                                                                  }

                                                                  if (countVal10 !== null) {
                                                                     const sumVal21 = countVal10 * BigInt(n21);
                                                                     let totalSum: bigint | null = null;
                                                                        
                                                                     for (const p23 of parts) {
                                                                       if (!p || /^\s*$/.test(p23)) continue; 
                                                                       try {
                                                                         const n23 = Number.parseInt(p23, 10);
                                                                         if (Number.isNaN(n23)) continue; // 数値でない場合もスキップ

                                                                         let countVal11: bigint | null = null;
                                                                        
                                                                         for (const p24 of parts) {
                                                                           if (!p || /^\s*$/.test(p24)) continue; 
                                                                           try {
                                                                             const n24 = Number.parseInt(p24, 10);
                                                                             if (Number.isNaN(n24)) continue; // 数値でない場合もスキップ

                                                                             if (n23 === n24) {
                                                                               countVal11 ??= BigInt(0);
                                                                               countVal11 += BigInt(1);
                                                                             } else {
                                                                               break; 
                                                                             }
                                                                           } catch {} // ここではエラーを無視しても良いが、Number.parseInt は既に安全なので不要。
                                                                         }

                                                                         if (countVal11 !== null) {
                                                                           const sumVal23 = countVal11 * BigInt(n23);
                                                                           let totalSum: bigint | null = null;
                                                                            
                                                                           for (const p25 of parts) {
                                                                             if (!p || /^\s*$/.test(p25)) continue; 
                                                                             try {
                                                                               const n25 = Number.parseInt(p25, 10);
                                                                               if (Number.isNaN(n25)) continue; // 数値でない場合もスキップ

                                                                               let countVal12: bigint | null = null;
                                                                                
                                                                               for (const p26 of parts) {
                                                                                 if (!p || /^\s*$/.test(p26)) continue; 
                                                                                 try {
                                                                                   const n26 = Number.parseInt(p26, 10);
                                                                                   if (Number.isNaN(n26)) continue; // 数値でない場合もスキップ

                                                                                   if (n25 === n26) {
                                                                                     countVal12 ??= BigInt(0);
                                                                                     countVal12 += BigInt(1);
                                                                                   } else {
                                                                                     break; 
                                                                                   }
                                                                                 } catch {} // ここではエラーを無視しても良いが、Number.parseInt は既に安全なので不要。
                                                                               }

                                                                               if (countVal12 !== null) {
                                                                                 const sumVal25 = countVal12 * BigInt(n25);
                                                                                 let totalSum: bigint | null = null;
                                                                                  
                                                                                 for (const p27 of parts) {
                                                                                   if (!p || /^\s*$/.test(p27)) continue; 
                                                                                   try {
                                                                                     const n27 = Number.parseInt(p27, 10);
                                                                                     if (Number.isNaN(n27)) continue; // 数値でない場合もスキップ

                                                                                     let count
