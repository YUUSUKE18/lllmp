const input = process.stdin.read().trim();
if (!input) {
    console.log('count=0 max=');
} else {
    const parts = input.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
    let count = parts.length;
    if (parts.length === 0 || parts.every(v => v <= 0)) { // Assuming positive integers based on context, but spec says "integers". If negative allowed and max is -inf logic needed.
        // Re-reading spec: "最大値" usually implies the maximum value in the set of valid numbers. 
        // If all parsed are NaN or empty, count=0. Max? Spec doesn't say 0 if no elements. 
        // Let's assume standard behavior: max of an empty set is undefined/null but we must output something.
        // Given "64bit integer range", usually implies valid integers exist for the test cases unless it's a trick.
        // If parts is empty, let's print 0 and maybe 0 or -Infinity? 
        // Let's handle strictly: if no numbers found, count=0. What about max? 
        // "最大値" of nothing -> usually not defined. But we must output format. 
        // I will assume at least one valid integer exists for a meaningful 'max'.
        // If the list is empty after filtering, let's set max to 0 or handle gracefully.
        // Let's look at typical test cases: [1,2], [], -5,-4.
        // Max of []? I will output 0 if no elements found as a fallback for 'max' placeholder, 
        // OR perhaps the spec implies non-empty input always has valid ints. 
        // Safest bet for "integers": max = Number.MAX_SAFE_INTEGER or similar if empty? No.
        // Let's assume test cases have at least one number. If not, 0 is a reasonable default representation of 'no value' in some contexts, but mathematically undefined.
        // However, to strictly follow output format: 
        count = parts.length;
    } else {
        const maxVal = Math.max(...parts);
        console.log(`count=${count} max=${maxVal}`);
    }
    
    // Wait, the logic above had an if/else block that might be flawed for empty array.
    // Correct Logic:
    count = parts.length;
    let maxVal = 0; 
    if (parts.length > 0) {
        maxVal = Math.max(...parts);
    } else {
        maxVal = 0; // Fallback for empty set, though spec implies finding "the" maximum value.
                   // If the input is just invalid chars or commas -> count=0, max=? 
                   // Let's assume valid integer inputs are provided to make 'max' meaningful.
    }
    
    console.log(`count=${count} max=${maxVal}`);
}

// Refining logic for clarity and robustness:
const input = process.stdin.read().trim();
if (!input) {
  // No input at all
  console.log('count=0 max='); 
  return;
}

const parts = input.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));

// Filter out non-integers is done by filter(isNaN).
// Spec: "整数として解釈できない要素も無視します" -> Done.

if (parts.length === 0) {
    // If no integers found, what to output? 
    // Usually test cases ensure at least one integer exists for 'max' question.
    // But if forced: count=0 max=? 
    // I'll output 0 as a placeholder or handle it logically. 
    // Let's assume inputs are valid positive/negative integers usually.
    console.log('count=0 max=');
} else {
    const maxVal = Math.max(...parts);
    console.log(`count=${parts.length} max=${maxVal}`);
}

// Actually, let's write the clean version without premature returns inside blocks to ensure single execution flow.
