const input = process.stdin.read();
let tokens: string[] = [];
for (const char of input) {
	if (char === ',') continue;
	tokens.push(char);
}
tokens.pop(); // Remove last empty token if any
if (!input.trim()) {
	console.log('count=0 max=');
	return;
}

let minVal: bigint = BigInt(1e38), maxVal: bigint = -BigInt(1e38);
const count = new Set<Bignumber>(); // Just to track unique? No, need all. 
// Wait, spec says "element number" which means length of the array after filtering invalid ones.
// Let's restart logic clearly.

let cleanTokens: string[] = [];
for (const tokenStr of input.replace(/\s/g, '').split(',')) { // Remove spaces and split by comma? No, just remove non-digits except minus sign initially.
	// Actually simpler: parse each character if it forms a valid integer digit or '-' at start.
}

let finalTokens = [];
for (const char of input) {
	if (/[\d-]/.test(char)) continue; // Only process digits and minus sign? No, what about + ? Spec says integers. JavaScript parseInt handles optional leading + usually but strict parsing is safer to just allow - or digit. However, standard integer format might include + in JS context though not explicitly forbidden by spec "integer". Let's assume any string that can be parsed as int via Number().
	// But wait, regex /[\d-]/ would miss '+'. Better: check if token starts with optional +/- then digits. Or just use a helper function to parse valid tokens one char at a time? 
}

// Refined approach using split by non-digit/non-minus characters (except leading ones) is hard without knowing boundaries.
// Let's try splitting by commas first, ignoring spaces around them, then trying to parseInt each token. If it fails or isn't a number, ignore. But wait, if input has "123abc", parseInt returns 123 but we should ignore? Spec says: "整数として解釈できない要素も無視します" -> Ignore elements that cannot be interpreted as integers.
// So split by comma first.

const rawTokens = input.split(',').map(s => s.trim()); // Remove spaces around commas too if they exist in the string representation of a token like " 1". Actually .trim() on each element handles leading/trailing whitespace within tokens separated by comma? No, standard readLine might have mixed separators.
// Let's stick to: replace all non-alphanumeric characters (except maybe sign) with nothing? 
// Or just iterate char by char and build numbers?

// Easier way: Use regex /[\d-]/ only if we assume no '+' or complex floats. Spec says "integers". Usually integers are -1, 0, +5 etc.
// Let's use a simple parser loop to be safe against any format like "-123" but ignore garbage chars inside numbers? No, integer parsing is usually digit-based. 
// The most robust way for competitive programming style inputs where "garbage" means non-integer tokens:

const parts = input.split(',');
let countVal = 0;
let maxBig = null as bigint | null; // Start with undefined/null since range includes negative and zero? No, if no valid integers, output is different. Wait spec says "count=<個数> max=<最大値>". If empty list of ints, what is max? Usually -Infinity or 0? Or maybe it implies at least one integer exists? 
// But let's assume we might have none.
// Re-reading: "それらの『要素数』と『最大値』を求めます" -> Find count and max value OF THEM (the filtered valid ones). If list is empty, what to output? Likely 0 and undefined or similar? Or maybe constraints imply non-empty input of integers? 
// But we must handle cases.
// Let's initialize min/max accordingly.

let numCount = 0;
let currentMax: bigint | null = null; // Use number if possible but spec says 64bit integer range, so BigInt is safer for max value storage before comparison? Or just use Number since JS Number is double precision (53 bits mantissa). 
// Spec explicitly mentions "values are within 64-bit integer range". This suggests we should treat them as such. But JavaScript's safe integer limit is ±2^53 - 1. However, the spec says values fit in 64bit signed int (-9e18 to +9e18). 
// Using Number might lose precision for integers > 2^53? Yes. So use BigInt or string comparison logic converted properly.
// Let's initialize max with a very small number if possible, but since we need to compare, let's start null and set on first valid.

for (const part of parts) {
	const num = Number(part); // This handles optional + - signs? Yes in modern JS. 
	// Check if it is actually an integer and not a float like 123.5 or NaN
	if (!isNaN(num) && !Number.isInteger(Number(String(num)))) continue; // Wait, String(num) might be "Infinity" for some huge inputs? No, input says integers fit in range. 
	// Better: check if part matches /^\s*[-+]?[0-9]+\s*$/ after removing non-digits except start sign.
}

// Corrected logic with regex validation per token segment to ensure it's a pure integer string representation (ignoring spaces, commas).
const isValidInt = (str: string): boolean => {
	const s = str.trim(); // Remove leading/trailing whitespace if any inside the chunk? Wait, .trim() on '123 456'? No, split by comma. 
	// What about input "1a2"? parseInt("1a2") is NaN in some contexts? Actually Number("1a2") returns NaN.
	return !isNaN(Number(s)) && Number.isInteger(Number(String(Number(s)))); // Double check? Or just rely on isNaN and integer check.
};

let validCount = 0;
let maxVal: bigint | null = null; 

for (const part of parts) {
	const valStr = part.trim(); 
	if (!valStr || !/^[+-]?\d+$/.test(valStr)) continue; // Regex ensures integer format only. 
	// Wait, what if input has "+123"? ^[+-]? matches it. What about "007"? Matches.
	const val = BigInt(parseInt(valStr));
	if (maxVal === null || val > maxVal) {
		maxVal = val;
	}
	validCount++;
}

// Output format: count=<count> max=<value>. If no valid integers? 
// The problem doesn't specify output for empty list. But likely 0 and maybe nothing or a placeholder? 
// Given "strictly one line", if count is 0, what is max? Usually undefined behavior but let's assume at least one integer provided based on typical CP problems unless stated otherwise.
// If no integers found: count=0 max=<something>. But spec says values are within range. Maybe input always has valid ints? 
// Let's output 'count=' + countVal + 'max=' + (maxVal ? String(maxVal) : '').trim()

if (!validCount && !maxVal) {
	// Edge case: no integers found. What to print for max? Probably empty or 0? 
	// Given the constraint "values are within range", it implies there ARE values if they exist. If none, maybe just count=0 and nothing else? Or count=0 max=<undefined>?
	// Let's assume non-empty input of valid integers exists per spec context usually found in such tasks.
	console.log(`count=${validCount} max=`); // Just to be safe if empty set
	return; 
}

console.log(`count=${validCount} max=${maxVal}`);
