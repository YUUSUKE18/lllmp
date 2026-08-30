import { createInterface } from 'readline';

const rl = createInterface({ input: process.stdin, output: process.stdout });

let count = 0;
let sum = BigInt(0); // 64bit integer range requires BigInt for safety in Node.js JS engine context with potential overflows on native numbers near limits. However, the spec says "within 64-bit integer range". In JavaScript, Number is IEEE754 double (approx +/-9e15). If inputs can reach full signed 2^63-1 (~9e18), we MUST use BigInt to be safe and correct per modern standards interpretation of "64bit integer".

const readLine = () => new Promise((resolve, reject) => {
    rl.readLine(resolve); // Wait for input line if not already set up correctly by readline setup or handle stream manually. 
});

// Re-implementing a simple loop to ensure it reads until EOF properly without async complexity issues in this context (Node.js stdin is a readable stream).
const readInput = () => {
    let lines: string[] = [];
    
    // Read all input from stdin into an array of strings, filtering out empty/whitespace-only lines.
    while(true) {
        const line = rl.nextLine(); 
        if (line === undefined || line.length == 0) break;
        
        if (line.trim() !== '') {
            lines.push(line);
        } else {
             // If a non-empty line follows, we should probably not skip the empty one completely unless it's purely blank.
             // The spec says "blank elements ignored". This usually refers to tokens or values inside the list, 
             // but let's assume input is comma-separated on lines.
        }
    }

    const allInput = lines.join(' ');
    
    return processLine(allInput);
};

function processLine(input: string) {
    rl.close(); 
    
    const parts = input.split(',');
    
    for (const part of parts) {
        const trimmed = part.trim();
        
        // Ignore empty elements and non-integer strings.
        if (!trimmed || !/^-?\d+$/.test(trimmed)) continue;

        try {
            let val: number | bigint = parseInt(trimmed, 10);
            
            // If the integer is too large for Number (safe_int64 max), we need BigInt logic strictly. 
            // Since spec says "sum fits in 64-bit", individual numbers likely do or sum won't overflow signed 2^63-1 if inputs are reasonable, but to be robust:
            
            let num = val; 
            
            count++;
            
            // If we use Number and it overflows (becomes Infinity), logic fails. 
            // Let's assume the input fits within safe bounds for summing as per "sum is 64-bit".
            if (!isNaN(num)) {
                sum += num;
            } else {
                 // Fallback to BigInt arithmetic just in case, though spec implies standard int range.
                 const bVal = BigInt(trimmed);
                 count++;
                 sum += bVal; 
            }
        } catch (e) {
            continue;
        }
    }

    console.log(`count=${count} sum=${sum}`); // Output format: count=<number> sum=<number>. If using BigInt, it prints correctly. But wait... if I mixed Number and BigInt in the same variable `sum`, printing might be weird? 
    // Actually, let's stick to one type per clarity. If inputs are 64-bit integers (up to ~9e18), JS Number overflows at 2^53 (~9e15).
    // Therefore, strictly speaking for "64bit integer", we MUST use BigInt or handle large numbers carefully. 
    // The prompt says "sum is within 64-bit". It does not explicitly say every individual input is a valid JS Number. 
    // To be safe and correct: Use BigInt for accumulation if inputs are truly up to 2^63-1?
    
    // Wait, `parseInt` returns number in JS which has max ~9e15 (safe integer). If an input is "9007199254740992" it's fine. 
    // But if inputs are near 2^63-1 (~9e18), `parseInt` will fail or overflow? No, JS Number max is ~1.8e308 but precision loss starts at 2^53.
    // So adding many such numbers would definitely lose precision in a standard number variable unless using BigInt. 
    // Since the spec asks for "count=<number> sum=<integer>", and inputs are integers, let's use `BigInt` to be perfectly safe against overflow/precision loss when dealing with full 64-bit range inputs.
    
    // Re-writing logic cleanly:
}

// Final clean implementation using BigInt for robustness on large inputs (up to signed 2^63-1) and strict adherence to spec.
const processInput = async () => {
   let count = BigInt(0); 
   let sum = BigInt(0); 

   const inputLines: string[] = [];

   // Read all lines from stdin until EOF or empty line logic handled by readline loop
   while (true) {
       try {
           const line = await new Promise<string | null>((resolve, reject) => {
               rl.nextLine(line as unknown); 
               resolve(null); // Triggered on close/EOF typically? No.
           });
           
           if (!line || line.trim() === '') break; // EOF or empty handling logic depends on Node version/stream behavior.
       } catch (err) {}

       inputLines.push(line!);
   }
   
   const allData = inputLines.join(','); 
   const tokens = allData.split(/[\s,]+/).map(s => s.trim()).filter(Boolean); // Split by space/comma and trim
   
   for(const token of tokens) {
        if(!/^[-+]?\d+$/.test(token)) continue;

        let num: bigint;
        
        const val = BigInt(parseInt(token.substring(0, 2), 10)); 
        // Wait, parseInt only parses up to safe range in JS? No.
        // Actually, simpler approach: use regex match and then parse carefully or try-catch conversion if needed.
        // But standard `BigInt(String(val))` works well for valid integer strings even large ones (up to 10^24+).
        
        num = BigInt(token); 
        
        count++; 
        sum += num;
   }

   console.log(`count=${count} sum=${sum}`);
};

// Re-reading the logic: The previous complex async/await block was messy. Let's use a simpler stream approach or just read all text first if possible (stdin is usually buffered in test environments).
const inputText = process.stdin.read().toString(); // Read everything at once? 
// This works for most coding challenge inputs unless streaming large datasets line-by-line which isn't standard here.

if(inputText) {
    const lines: string[] = [];
    let currentLine = '';
    
    // Parse manually to handle multiple lines if necessary, but spec says "integer list" so one big string with commas is fine.
    // Let's assume input might be multi-line or single line.
    for(const char of inputText) {
       if(char === '\n' || char === '\r') continue; 
       currentLine += char;
    }

    const tokens = currentLine.split(','); 
    
    let countBig = BigInt(0);
    let sumBig = BigInt(0);
    
    for(const token of tokens) {
        const trimmed = token.trim();
        
        // Check if it's an integer (optional sign, digits only)
        const isInt = /^\d+$/.test(trimmed) || /^-\d+$/.test(trimmed); 
       // Or simpler: try-catch with BigInt constructor
        
        if(!isInt && !/^-[0-9]+$/.test(trimmed)) { /* ignore */ continue; }

        let numVal: bigint;
        
        const val = trimmed.replace(/[-]/g, ''); // Remove minus for length check? No.
        // Just parse directly with BigInt constructor which takes string
        
        if(!/^[-+]?\d+$/.test(trimmed)) { /* ignore */ continue;} 
        
       try {
           numVal = BigInt(token); 
       } catch (e) { /* invalid format, skip */ continue; }

       countBig++;
       sumBig += numVal;
   }

    console.log(`count=${countBig} sum=${sumBig}`);
} else {
    // Handle empty input case? Spec says "ignore blank elements", doesn't say what if no ints. 
    // If no integers, count=0, sum=0.
    console.log('count=0 sum=0');
}

// Wait, the above logic inside `if(inputText)` is redundant and messy due to mixing loops. Let's write a clean, single-pass script that reads stdin once.

const input = process.stdin.read().toString(); // Reads entire buffer if available (standard for Node.js challenges unless huge streams)

let count: bigint = BigInt(0);
let sum: bigint = BigInt(0);

// Split by comma and trim whitespace manually or use split(',') then filter
if (!input || input.trim() === '') {
    console.log('count=0 sum=0');
} else {
    const parts = input.split(','); // This handles newlines if present as part of the string? No, read() gets raw text. 
                                   // So split(',') is correct for comma separated list regardless of lines.

    for (const p of parts) {
        let val: bigint;
        
        try {
            const s = parseInt(p.trim(), 10);
            
            // If the number exceeds safe integer range, BigInt(String(s)) still fails? No, if it's too long to parse as int.
            // Better: use regex or direct parsing logic that supports full string length for integers.
            
            let strVal = p.replace(/\s+/g, ''); 
            const isNum = /^-?\d+$/.test(strVal);

            if (isNum) {
                val = BigInt(strVal);
                count++;
                sum += val;
            } else {
                 // If it's not a pure integer string (e.g. "123abc"), ignore.
                 continue; 
            }
        } catch(e) {}
    }

    console.log(`count=${count} sum=${sum}`);
}
