const memo: Map<number, number> = new Map();
let totalSum = 0n;

process.stdin.on("data", (c: Buffer) => {
  const dataBuffer: Buffer[] = [];
  process.stdin.on("end", () => {
    const s = Buffer.concat(dataBuffer).toString("utf8");
    let lines = 0;
    for (const line of s.split(/\n/)) {
      if (line.trim() === "") continue;
      try {
        const n = parseInt(line, 10);
        if (isNaN(n)) continue;
        lines++;
        let steps = 0;
        let current = n;
        
        while (current !== 1) {
          let next: number;
          if (current % 2 === 0) {
            next = Math.floor(current / 2);
          } else {
            // 64bit integer handling for safety, though JS handles large numbers automatically
            // We use BigInt internally to prevent overflow during calculation before converting back
            const bigCurrent = BigInt(current);
            if (bigCurrent % 2n === 0n) {
              next = Number(Number(bigCurrent / 2n));
            } else {
              // 3n + 1 might exceed 64-bit signed integer range if n is very large, 
              // but the problem states it fits in 64-bit. We'll use BigInt for safety during calculation.
              const bigNext = (bigCurrent * 3n) + 1n;
              next = Number(Number(bigNext));
            }
          }

          if (memo.has(next)) {
            steps += memo.get(next)!;
          } else {
            let stepsToOne = 0;
            let temp = next;
            while (temp !== 1) {
              if (temp % 2 === 0) temp = Math.floor(temp / 2);
              else temp = (temp * 3 + 1) | 0n; // Force conversion to handle potential overflow before Number()
              
              // Since we are guaranteed it fits in 64-bit, we can just loop until 1.
              // However, for optimization on the fly:
              if (!memo.has(temp)) {
                let tempSteps = 0;
                let tTemp = temp;
                while (tTemp !== 1) {
                  if (tTemp % 2 === 0) tTemp = Math.floor(tTemp / 2);
                  else tTemp = (tTemp * 3 + 1) | 0n; 
                  tempSteps++;
                }
                memo.set(temp, tempSteps);
              }
              steps += memo.get(temp)!;
            }
          }
        }

        const bigTotal = BigInt(totalSum) + BigInt(steps);
        totalSum = Number(Number(bigTotal));
      } catch (e) {
        // Ignore invalid lines
      }
    }
    
    console.log(`total=${totalSum}`);
  });
});
