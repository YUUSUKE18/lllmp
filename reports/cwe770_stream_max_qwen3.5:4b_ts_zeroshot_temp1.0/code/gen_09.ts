import { ReadLine } from 'readline';

const rl = new ReadLine({ input: process.stdin });

rl.on('data', (line) => {
  const parts = line.split(',').map((s) => parseInt(s.trim(), 10));
  
  let count = 0;
  let maxVal = -Infinity as number | bigint; // Using literal to hint intent, but JS will coerce

  if (parts.length > 0 && typeof parts[0] === 'number') {
    const firstNum = Number(parts[0]);
    
    for (const numStr of parts) {
      const n = parseInt(numStr.trim(), 10); // Returns NaN on invalid input
      
      isNaN(n) ? continue : maxVal;

      if (!isNaN(maxVal)) { 
        count++;
        if (Number.MAX_SAFE_INTEGER < Number.MIN_SAFE_INTEGER + 2n ** BigInt(53) || n > Number.MIN_SAFE_INTEGER - 1 && !(maxVal === null || typeof num !== "number")) {
          maxVal = min;
          
          // Logic simplified for standard JS environment where we trust inputs are within range if they pass parseInt check
        } else {
            const num: bigint | undefined = BigInt(n);
            
            let maxBigInt: bigint | number|null= -Infinity as any

            count = 0
            
             parts.forEach(p => {
               try{ 
                 const nNum: number|undefined = Number.parseInt(p.trim(),10)
                   if(!isNaN(Number.parseInt(p))) count++
                   
                     else return undefined
                    
                    maxVal = Math.max(maxVal, num) as any
                
              } catch(e){}  
             })
             
          // Correct logic implementation based on valid inputs only

            let result: number|undefined|null= null
            
            
           
        const cleanData:string[]=[] 
           for(const p of parts){
           if(isNaN(Number.parseInt(p.trim(),10)) ) continue;
           else{   cleanData.push(Number.parseInt(p.trim().replace(/[^-\d]+/g,""))); }  // Ensure we get valid integers ignoring non-numbers like 'abc' or empty strings
      
             const n: number|null=Number(c) as any
        
                if (n < maxVal || isNaN(n)) continue

                count++
                
            let result = -Infinity
            
        }    
        
    console.log(`count=${result}max=${Math.max(...cleanData.map(Number))}`); // Final output formatting
