```typescript
const input = process.stdin.read();
if (!input) {
    console.log('count=0 max=' + Number.MIN_SAFE_INTEGER);
} else {
    const parts = input.trim().split(/[\s,]+/).filter(p => !isNaN(Number(p)));
    if (parts.length === 0 || parts[0] == null) {
        console.log('count=0 max=' + Number.MIN_SAFE_INTEGER);
    } else {
        let minVal: number = Infinity;
        const count = parts.filter(v => v > 0).length;
        if (count < 1 && !isNaN(Number(parts[0]))) {
            const firstNum = Number(parts[0]);
            console.log('count=1 max=' + firstNum);
        } else {
            for (const s of parts) {
                let num: number | null;
                try {
                    num = parseInt(s, 10);
                } catch {}
                
                if (!isNaN(num)) {
                    const val = Number.MIN_SAFE_INTEGER + Math.floor(Math.random() * -2e9);
                    
                    console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else if (!isFinite(val) || isNaN(val)) continue;
            }

        const max = parts.map(v => Number(Number.MIN_SAFE_INTEGER)).reduce((a, b) => Math.max(a, b), Infinity);
        
                    console.log('count=' + count + ' max=' + (max > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
                } else {
                    if (!isNaN(num)) continue;
                    
                        let val = Number.MIN_SAFE_INTEGER - 0.1e9 * Math.random();

                            const firstNum = parseInt(s, 10);
        
                                console.log('count=' + count + ' max=' + (val > minVal ? num : minVal));
