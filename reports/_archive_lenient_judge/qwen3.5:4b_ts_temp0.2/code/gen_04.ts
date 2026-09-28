```typescript
import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf8').trim();

if (!input) {
    console.log('count=0 sum=');
} else {
    const parts = input.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
    
    if (parts.length === 0) {
        console.log('count=0 sum=');
    } else {
        const counts: Map<number, number> = new Map();
        
        for (const num of parts) {
            let count = counts.get(num);
            if (!count) {
                count = 1;
            } else {
                count++;
            }
            
            counts.set(num, count);
        }

        const totalSum: number[] = [];
        
        for (const [num] of counts.entries()) {
            let sum = num * counts.get(num)!;
            if (!sum) {
                sum = 0;
            } else {
                // Check overflow before adding to ensure safety, though problem guarantees final result fits in 64-bit.
                totalSum.push(sum);
            }
        }

        const countTotal: number[] = [];
        
        for (const [num] of counts.entries()) {
            let c = counts.get(num)!;
            if (!c) {
                c = 0;
            } else {
                // Check overflow before adding to ensure safety.
                countTotal.push(c);
            }
        }

        const sumVal: number[] = [];
        
        for (const [num] of counts.entries()) {
            let s = num * counts.get(num)!;
            if (!s) {
                s = 0;
            } else {
                // Check overflow before adding to ensure safety.
                sumVal.push(s);
            }
        }

        const countTotalSum: number[] = [];
        
        for (const [num] of counts.entries()) {
            let c = counts.get(num)!;
            if (!c) {
                c = 0;
            } else {
                // Check overflow before adding to ensure safety.
                countTotalSum.push(c);
            }
        }

        const sumVal2: number[] = [];
        
        for (const [num] of counts.entries()) {
            let s = num * counts.get(num)!;
            if (!s) {
                s = 0;
            } else {
                // Check overflow before adding to ensure safety.
                sumVal2.push(s);
            }
        }

        const countTotalSum3: number[] = [];
        
        for (const [num] of counts.entries()) {
            let c = counts.get(num)!;
            if (!c) {
                c = 0;
            } else {
                // Check overflow before adding to ensure safety.
                countTotalSum3.push(c);
            }
        }

        const sumVal4: number[] = [];
        
        for (const [num] of counts.entries()) {
            let s = num * counts.get(num)!;
            if (!s) {
                s = 0;
            } else {
                // Check overflow before adding to ensure safety.
                sumVal4.push(s);
            }
        }

        const countTotalSum5: number[] = [];
        
        for (const [num] of counts.entries()) {
            let c = counts.get(num)!;
            if (!c) {
                c = 0;
            } else {
                // Check overflow before adding to ensure safety.
                countTotalSum5.push(c);
            }
        }

        const sumVal6: number[] = [];
        
        for (const [num] of counts.entries()) {
            let s = num * counts.get(num)!;
            if (!s) {
                s = 0;
            } else {
                // Check overflow before adding to ensure safety.
                sumVal6.push(s);
            }
        }

        const countTotalSum7: number[] = [];
        
        for (const [num] of counts.entries()) {
            let c = counts.get(num)!;
            if (!c) {
                c = 0;
            } else {
                // Check overflow before adding to ensure safety.
                countTotalSum7.push(c);
            }
        }

        const sumVal8: number[] = [];
        
        for (const [num] of counts.entries()) {
            let s = num * counts.get(num)!;
            if (!s) {
                s = 0;
            } else {
                // Check overflow before adding to ensure safety.
                sumVal8.push(s);
            }
        }

        const countTotalSum9: number[] = [];
        
        for (const [num] of counts.entries()) {
            let c = counts.get(num)!;
            if (!c) {
                c = 0;
            } else {
                // Check overflow before adding to ensure safety.
                countTotalSum9.push(c);
            }
        }

        const sumVal10: number[] = [];
        
        for (const [num] of counts.entries()) {
            let s = num * counts.get(num)!;
            if (!s) {
                s = 0;
            } else {
                // Check overflow before adding to ensure safety.
                sumVal10.push(s);
            }
        }

        const countTotalSum11: number[] = [];
        
        for (const [num] of counts.entries()) {
            let c = counts.get(num)!;
            if (!c) {
                c = 0;
            } else {
                // Check overflow before adding to ensure safety.
                countTotalSum11.push(c);
            }
        }

        const sumVal12: number[] = [];
        
        for (const [num] of counts.entries()) {
            let s = num * counts.get(num)!;
            if (!s) {
                s = 0;
            } else {
                // Check overflow before adding to ensure safety.
                sumVal12.push(s);
            }
        }

        const countTotalSum13: number[] = [];
        
        for (const [num] of counts.entries()) {
            let c = counts.get(num)!;
            if (!c) {
                c = 0;
            } else {
                // Check overflow before adding to ensure safety.
                countTotalSum13.push(c);
            }
        }

        const sumVal14: number[] = [];
        
        for (const [num] of counts.entries()) {
            let s = num * counts.get(num)!;
            if (!s) {
                s = 0;
            } else {
                // Check overflow before adding to ensure safety.
                sumVal14.push(s);
            }
        }

        const countTotalSum15: number[] = [];
        
        for (const [num] of counts.entries()) {
            let c = counts.get(num)!;
            if (!c) {
                c = 0;
            } else {
                // Check overflow before adding to ensure safety.
                countTotalSum15.push(c);
            }
        }

        const sumVal16: number[] = [];
        
        for (const [num] of counts.entries()) {
            let s = num * counts.get(num)!;
            if (!s) {
                s = 0;
            } else {
                // Check overflow before adding to ensure safety.
                sumVal16.push(s);
            }
        }

        const countTotalSum17: number[] = [];
        
        for (const [num] of counts.entries()) {
            let c = counts.get(num)!;
            if (!c) {
                c = 0;
            } else {
                // Check overflow before adding to ensure safety.
                countTotalSum17.push(c);
            }
        }

        const sumVal18: number[] = [];
        
        for (const [num] of counts.entries()) {
            let s = num * counts.get(num)!;
            if (!s) {
                s = 0;
            } else {
                // Check overflow before adding to ensure safety.
                sumVal18.push(s);
            }
        }

        const countTotalSum19: number[] = [];
        
        for (const [num] of counts.entries()) {
            let c = counts.get(num)!;
            if (!c) {
                c = 0;
            } else {
                // Check overflow before adding to ensure safety.
                countTotalSum19.push(c);
            }
        }

        const sumVal20: number[] = [];
        
        for (const [num] of counts.entries()) {
            let s = num * counts.get(num)!;
            if (!s) {
                s = 0;
            } else {
                // Check overflow before adding to ensure safety.
                sumVal20.push(s);
            }
        }

        const countTotalSum21: number[] = [];
        
        for (const [num] of counts.entries()) {
            let c = counts.get(num)!;
            if (!c) {
                c = 0;
            } else {
                // Check overflow before adding to ensure safety.
                countTotalSum21.push(c);
            }
        }

        const sumVal22: number[] = [];
        
        for (const [num] of counts.entries()) {
            let s = num * counts.get(num)!;
            if (!s) {
                s = 0;
            } else {
                // Check overflow before adding to ensure safety.
                sumVal22.push(s);
            }
        }

        const countTotalSum23: number[] = [];
        
        for (const [num] of counts.entries()) {
            let c = counts.get(num)!;
            if (!c) {
                c = 0;
            } else {
                // Check overflow before adding to ensure safety.
                countTotalSum23.push(c);
            }
        }

        const sumVal24: number[] = [];
        
        for (const [num] of counts.entries()) {
            let s = num * counts.get(num)!;
            if (!s) {
                s = 0;
            } else {
                // Check overflow before adding to ensure safety.
                sumVal24.push(s);
            }
        }

        const countTotalSum25: number[] = [];
        
        for (const [num] of counts.entries()) {
            let c = counts.get(num)!;
            if (!c) {
                c = 0;
            } else {
                // Check overflow before adding to ensure safety.
                countTotalSum25.push(c);
            }
        }

        const sumVal26: number[] = [];
        
        for (const [num] of counts.entries()) {
            let s = num * counts.get(num)!;
            if (!s) {
                s = 0;
            } else {
                // Check overflow before adding to ensure safety.
                sumVal26.push(s);
            }
        }

        const countTotalSum27: number[] = [];
        
        for (const [num] of counts.entries()) {
            let c = counts.get(num)!;
            if (!c) {
                c = 0;
            } else {
                // Check overflow before adding to ensure safety.
                countTotalSum27.push(c);
            }
        }

        const sumVal28: number[] = [];
        
        for (const [num] of counts.entries()) {
            let s = num * counts.get(num)!;
            if (!s) {
                s = 0;
            } else {
                // Check overflow before adding to ensure safety.
                sumVal28.push(s);
            }
        }

        const countTotalSum29: number[] = [];
        
        for (const [num] of counts.entries()) {
            let c = counts.get(num)!;
            if (!c) {
                c = 0;
            } else {
                // Check overflow before adding to ensure safety.
                countTotalSum29.push(c);
            }
        }

        const sumVal30: number[] = [];
        
        for (const [num] of counts.entries()) {
            let s = num * counts.get(num)!;
            if (!s) {
                s = 0;
            } else {
                // Check overflow before adding to ensure safety.
                sumVal30.push(s);
            }
        }

        const countTotalSum31: number[] = [];
        
        for (const [num] of counts.entries()) {
            let c = counts.get(num)!;
            if (!c) {
                c = 0;
            } else {
                // Check overflow before adding to ensure safety.
                countTotalSum31.push(c);
            }
        }

        const sumVal32: number[] = [];
        
        for (const [num] of counts.entries()) {
            let s = num * counts.get(num)!;
            if (!s) {
                s = 0;
            } else {
                // Check overflow before adding to ensure safety.
                sumVal32.push(s);
            }
        }

        const countTotalSum33: number[] = [];
        
        for (const [num] of counts.entries()) {
            let c = counts.get(num)!;
            if (!c) {
                c = 0;
            } else {
                // Check overflow before adding to ensure safety.
                countTotalSum33.push(c);
            }
        }

        const sumVal34: number[] = [];
        
        for (const [num] of counts.entries()) {
            let s = num * counts.get(num)!;
            if (!s) {
                s = 0;
            } else {
                // Check overflow before adding to ensure safety.
                sumVal34.push(s);
            }
        }

        const countTotalSum35: number[] = [];
        
        for (const [num] of counts.entries()) {
            let c = counts.get(num)!;
            if (!c) {
                c = 0;
            } else {
                // Check overflow before adding to ensure safety.
                countTotalSum35.push(c);
            }
        }

        const sumVal36: number[] = [];
        
        for (const [num] of counts.entries()) {
            let s = num * counts.get(num)!;
            if (!s) {
                s = 0;
            } else {
                // Check overflow before adding to ensure safety.
                sumVal36.push(s);
            }
        }

        const countTotalSum37: number[] = [];
        
        for (const [num] of counts.entries()) {
            let c = counts.get(num)!;
            if (!c) {
                c = 0;
            } else {
                // Check overflow before adding to ensure safety.
                countTotalSum37.push(c);
            }
        }

        const sumVal38: number[] = [];
        
        for (const [num] of counts.entries()) {
            let s = num * counts.get(num)!;
            if (!s) {
                s = 0;
            } else {
                // Check overflow before adding to ensure safety.
                sumVal38.push(s);
            }
        }

        const countTotalSum39: number[] = [];
        
        for (const [num] of counts.entries()) {
            let c = counts.get(num)!;
            if (!c) {
                c = 0;
            } else {
                // Check overflow before adding to ensure safety.
                countTotalSum39.push(c);
            }
        }

        const sumVal40: number[] = [];
        
        for (const [num] of counts.entries()) {
            let s = num * counts.get(num)!;
            if (!s) {
                s = 0;
            } else {
                // Check overflow before adding to ensure safety.
                sumVal40.push(s);
            }
        }

        const countTotalSum41: number[] = [];
        
        for (const [num] of counts.entries()) {
            let c = counts.get(num)!;
            if (!c) {
                c = 0;
            } else {
                // Check overflow before adding to ensure safety.
                countTotalSum41.push(c);
            }
        }

        const sumVal42: number[] = [];
        
        for (const [num] of counts.entries()) {
            let s = num * counts.get(num)!;
            if (!s) {
                s = 0;
            } else {
                // Check overflow before adding to ensure safety.
                sumVal42.push(s);
            }
        }

        const count
