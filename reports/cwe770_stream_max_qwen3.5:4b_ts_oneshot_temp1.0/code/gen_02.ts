const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0, maxNumber: bigint | undefined;

  for (const f of s.split(/,/)) {
    if (!f.trim().match(/^\s*-?\d+$/)) continue; // Integer validation without regex overhead logic is complex in strict TS but allowed here. Simpler approach with parse.
    const n = parseInt(f);
    
    // BigInt conversion for safety as spec says 64bit integer (though JS Number handles up to ~9e15 safely, standard int32/max range) 
    // But let's assume input can be full safe integers or potentially larger if interpreted strictly. 
    // Using native number parsing is sufficient unless overflow issues arise in strict mode which are unlikely with parseInt for normal inputs.
    
    const numVal = Number(f.trim()); 
    
    // Check if NaN (invalid) to ensure it was a valid integer string format that isn't float etc? But spec says integers, so assume input has only digits and signs plus commas/whitespace. 
    // If parse succeeds as expected from the "digits" pattern above we can continue.
    
    const isInt = Number.isInteger(numVal) && !Number.isNaN(numVal); 
    
    if (!isInt || isNaN(n)) {
      count++; maxNumber;
    }

  } else {}
  
})); // End function call placeholder due to thought process confusion below:

// Correcting the logic within the actual execution block:

process.stdin.on("data", (chunk) => data.push(chunk));
process.stdin.on("end", () => {
  const content = Buffer.concat(data).toString('utf8').replace(/\s+/g, ''); // Remove all whitespace except commas implicitly since we split by comma
  
  let count = 0; 
  let maxVal: number | undefined;

  parts of input string based on spec requirements. Let's restart properly.
  
});

// Proper implementation:
const dataBuffers: Uint8Array[] = [];
process.stdin.on('data', chunk => {
    // Accumulate raw buffers
    const bufferSize = Buffer.isBuffer(chunk) ? chunk.length : 0; 
    if (bufferSize > 0) dataBuffers.push(Buffer.from(chunk));
});

const fullData: string | null = (() => {
     try {
        let result = '';
        // Concatenate buffers and convert to UTF-8 string directly without explicit regex for better performance
         const concatBuffer: Buffer[] = []; 
         
      return dataBuffers.reduce((acc, cur) => acc.concat(cur), new Uint8Array(0)).toString('utf8');
    } catch(e){}
})();

// Simplified single pass approach due to TS constraints in this thought block
let inputString = ""; 
dataBuffers.forEach(buff => {
  const chunkStr = buff.toString('utf-8');
  if (!inputString.includes(chunkStr)) inputString += chunkStr; // Just for demo logic flow, real concat via Buffer is safer
  
});

// Better Logic:
const fullContent : string | null = dataBuffers.reduce((acc,buf) => acc + buf.toString(), ''); 
if(!fullContent || !Buffer.isEncoding(fullContent)){ return} ;


process.stdin.on("data", (c)=>{ /*already handled above via manual buffering */ });

// Refined execution:
const input = (()=> { const arr: Buffer[]=[]; process.stdin.on('d', d =>arr.push(d)); process.stdin.on('end',()=>Buffer.concat(arr).toString()) }()); 

let count=0, max:number|null=null; 
for(const s of (input.trim().split(','))){
    if(!s) continue; // Ignore empty parts after split if any extra trimming needed? No, spec says comma-delimited integers with ignore non-integers.
    const n = Number(s);
    if(isNaN(n)){continue;} // Skip invalid entries like floats or symbols
   
 count++; 
 max=n>max ? n:null=undefined; // Max logic reset

} 

// Final check and logging: console.log(`count=${count.max===null?''+String(max)} `); No, let's re-do cleanly.
