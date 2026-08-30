import { readFileSync } from "fs";

const input = readFileSync(0, { encoding: "utf8" });

function parseIntegers(line: string): number[] {
  return line.split(/[\s,,]+/).map((x) => parseInt(x.trim(), 10)).filter((n) => !isNaN(n));
}

try {
  const tokens = input.trim();
  if (!tokens.length) {
    console.log(`count=0 max=`);
    return;
  }

  const nums = parseIntegers(tokens);
  
  let count: number | null = null;
  for (const n of nums) {
      if(count === undefined || n > count){ 
          count = Math.abs(n);
       }    
   };
   
    if(nums.length == 0)
        console.log(`count=0 max=`);  
    else{      
         const isNeg: boolean[]=[];

    for(const i of nums)[i<0] ? true : false
            let count2 = 1;
            const maxNum = Math.abs(count);
      if(!nums.every((e)=> e > 0 && !isNan(e))) {   
          console.log(`count=${Math.floor(Math.max.apply( 
                null, nums))} max=${maxNum}`);  
        }    
    }

}catch (err) {console.error(err)};
