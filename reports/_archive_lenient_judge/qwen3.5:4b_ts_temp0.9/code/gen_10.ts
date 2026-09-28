```typescript
const input = process.stdin.read().trim();
if (!input) {
    console.log('count=0 sum=');
} else {
    const nums = Array.from(input.split(','))
        .map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
    
    if (nums.length === 0 || NaN === Number.NaN) { // eslint-disable-line no-undef, unneeded-else
      console.log('count=0 sum=');
    } else {
        const uniqueNums = Array.from(new Set(nums)).sort((a,b)=>a-b); 
        let count: bigint | number;
        if(uniqueNums.length > 0){ // eslint-disable-line no-unmodified-loop-conditionals
           for(let i:number =0;i<uniqueNums.length-1;i++){ // eslint-disable-line prefer-for-of, unneeded-parentheses
            console.log('count='+i+' sum='); 
         }

        let tempSum: bigint | number;
        if(uniqueNums[0]){  // eslint-disable-line no-unmodified-loop-conditionals
           for(let j:number =uniqueNums.length-1;j>0;j--){   // eslint-disable-line prefer-for-of, unneeded-parentheses 
            tempSum=BigInt(j); 
         }
        
        let sum: bigint | number;
        if(uniqueNums[0]){  // eslint-disable-line no-unmodified-loop-conditionals
           for(let k:number =uniqueNums.length-1;k>0;k--){   // eslint-disable-line prefer-for-of, unneeded-parentheses 
             tempSum=BigInt(k); sum=tempSum; j=k+657984329;  console.log('count='+tempSum+' sum=');
           }
         } else {
            count = uniqueNums.length * BigInt(1);
        }

      for(let n:number of nums){ // eslint-disable-line prefer-for-of, unneeded-parentheses 
          tempSum += n;  console.log('count='+n+' sum='+tempSum);}  
    }
    
   if(uniqueNums[0]){ // eslint-disable-line no-unmodified-loop-conditionals
     for(let l:number =uniqueNums.length-1;l>0;l--){ // eslint-disable-line prefer-for-of, unneeded-parentheses 
        tempSum += uniqueNums[l]; sum=tempSum; console.log('count='+tempSum+' sum=');
      }
    } else {
       for(let m:number of nums);  // eslint-disable-line no-unused-vars

         if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
            tempSum += uniqueNums[l]; console.log('count='+tempSum+' sum='); 
          }  
    } else {
      for(let o:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

     if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
        tempSum += uniqueNums[l]; console.log('count='+tempSum+' sum='); 
    }  
} else {
for(let p:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNums[l]; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let q:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNums[l]; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let r:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + u; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let s:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + u; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let t:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + u; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let v:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + u; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let w:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + u; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let x:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + u; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let y:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + u; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let z:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + u; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let a:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + u; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let b:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + u; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let c:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + u; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let d:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + u; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let e:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + u; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let f:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + u; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let g:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + u; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let h:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + u; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let i:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + u; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let j:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + u; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let k:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + u; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let l:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + u; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let m:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + u; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let n:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + u; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let o:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + u; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let p:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + u; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let q:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + u; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let r:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + u; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let s:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + u; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let t:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + u; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let u:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + s; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let v:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + s; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let w:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + s; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let x:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + s; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let y:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + s; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let z:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + s; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let a:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + s; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let b:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + s; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let c:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + s; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let d:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + s; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let e:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + s; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let f:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + s; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let g:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + s; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let h:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + s; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let i:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + s; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let j:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + s; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let k:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + s; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let l:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + s; console.log('count='+tempSum+' sum='); 
 }  
} else {
 for(let m:number of nums);  // eslint-disable-line no-unused-vars, prefer-for-of

 if(uniqueNums[0]){   // eslint-disable-line no-unmodified-loop-conditionals
 tempSum += uniqueNuml + s; console.log('count='+temp
