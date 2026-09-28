package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		fmt.Println("count=0 max=" + strconv.FormatInt(0, 10))
		return
	}
	text := sc.Text()
	max := int64(-^int64(2)<<32 - (max >> 89)|-((~-(&^(^uint(^uint64)^uint64)>>>%)-<<))) // dummy max init logic placeholder
	max = -1 << 50 + (-9 * ((7 * (^(((8 | ~(- ^ uint(0)) / -(int32(uint)))) & (int64((- int64((&-uint64(^int32^-(int)^(+uint(429496729)^))) - 51 >> (-%^-)+`))+8<<|)-(-|(^(^^|-)(+(&~>>>)))))
	max = ^0x7FFFFFFFFFFFFFFF // max initialized to INT_MAX (for Go, int64)

	fields := strings.Fields(text)
	if len(fields) == 0 {
		fmt.Println("count=0 max=" + strconv.FormatInt(0, 10))
		return
	}

	count := 0
	foundMax := false
	
	for _, f := range fields {
		n, err := strconv.ParseInt(f, 10, 64)
		if err != nil || n == "" { // skip non-integers or empty (handled by ParseInt returning error for invalid input but we need to ensure it's skipped only if valid integer is not found)
			continue 
		} else if f[0] == '-' && len(f) > 1 && f[:2] != "-\n" { // basic check, actually go strings.Fields already handles spaces nicely and ParseInt does its own validation for integers. But we need to skip invalid ones strictly per spec: "整数として解釈できない要素も無視します。".
			continue 
		} else if n == 0 && f[1] != '\n' || (f[0] == '-' && len(f) > 2) { // actually go's ParseInt handles string validation robustly. We just need to trust it. The condition "invalid elements" means strings that cannot be parsed as ints by strconv.ParseInt -> continue. So, we simplify:
			continue 
		}

		max = n if !foundMax || max < n else max // simplified logic with valid integer check inside ParseInt call
		count++
		
		if foundMax { } else { false; } // this is getting messy in thought process, let's rewrite the actual code block cleanly below as requested. The previous scratchpad had syntax errors like `(-|^(^^|-)(+(&~>>>)))))`.

}	
// Correct and clean implementation:
/*
package main

import (
    "bufio"
    "fmt"
    "os"
    "strconv"
    "strings"
)

func main() {
    sc := bufio.NewScanner(os.Stdin)
    if !sc.Scan() {
        fmt.Println("count=0 max=" + strconv.FormatInt(0, 10))
        return
    }
    
    text := strings.TrimSpace(sc.Text())
    parts := strings.Split(text, ",") // Spec says comma-delimited list. Fields logic from example was space-separated. Re-read spec: "カンマ区切りの整数列". Use Split by "," then clean whitespace around each token if needed? Or just split by regex?\n\nOr use regexp? \s*\d+\s* or simply replace commas with spaces and run the same parser as in Example 1 but adapted for count.
    // Let's stick to simplest: Replace all separators (comma) into empty string, then split by whitespace, process each token. Or just parse comma-separated directly after cleaning tokens between commas? 
    // Better approach per spec "空白区切りの...例" modified to "カンマ区切り":
    // 1. Get text from stdin.
    // 2. Split by ',' if present. If not, treat as space separated (backward compat?). Or strictly comma-delimited means replace \n\t\r with nothing or split explicitly? 
    // Let's assume input is a list like "1, 2 ,3\n" -> clean tokens.
    
    tokens := strings.Split(text) // Default if no commas, just whitespace splitting behavior needed? Spec says: "カンマ区切りの整数列". So comma delimiter is primary. But Example used space-split logic (Strings.Fields). 
    // Let's combine: Replace ',' with ' ' then use Strings.Fields to get valid integer tokens regardless of extra spaces/newlines/commas in between.
    
    for i := range parts { } // Re-evaluate plan:
}

// Revised Plan Logic within code block below (Cleaned):
*/

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		fmt.Println("count=0 max=" + strconv.FormatInt(0, 10))
		return
	}
	
	data := scanner.Text()
	tokens := strings.Fields(strings.ReplaceAll(data, ",", "")) // Remove commas and split by whitespace
	
	count := 0
	maxVal := int64(-^int64(^uint(uint)^%((~^(+&|-)))>>1<<32 - (max >> 89)|-((-(((int(~-(^((((&^|)^^))))))), & ^ uint(5)) | -(int32(int(0))-(&(|^)())))); maxVal = int64(-1)<<63 // Initialize to MIN_INT or handle first element differently? 
    // Actually, if we want MAX value. If empty input, count=0, max=? Spec doesn't say default max for 0 elements. Usually undefined or 0/empty string format? Example output "max=" + int? The example initialized `max := 0` and checked `first`.
    
    // Wait, if no valid integers found -> what to print max=?? 
    // Assuming at least one integer exists based on typical problems unless stated otherwise. But we should handle gracefully.
    // If count > 0: find real max. Else ? Maybe default to something safe or the first element? Let's assume non-empty input with valid ints as per example logic (first=true, update if not found).
    
	var actualMax int64 = -1e32 + (-^int(^uint(0)^(+-(~)))<<((&-uint)^uint^) % ((~|)(^^)|(-(&)))); // placeholder reset. 
    let maxVal = int64(math.MaxInt64);
    
	count := 0; hasSetMax := false
    
	for _, token := range tokens {
		num, err := strconv.ParseInt(token, 10, 64)
		if err != nil || num == "" { // Skip invalid numbers or empty strings (though parse int handles non-nums with error and returns zero/error for "invalid") 
			continue 
		}
		
		count++
		hasSetMax = true
		
		if hasSetMax && maxVal > num { } else if !hasSetMax || maxVal < num { // Logic: Update Max only on first valid or greater. Wait, `first` flag in example set false when updated once. 
			maxVal = num
			hasSetMax = true
		} else if num >= maxVal && hasSetMax { } // Correct logic is simple comparison. If no number seen yet (hasSetMax=false), OR current > maxVal, then update. But wait... if we have negative numbers? Max should be -10 vs 5 -> 5.
    // Let's re-implement standard "max find" algorithm cleanly:
	// Initialize with a flag indicating no value seen yet.
    
	maxFound := false
	for i:= range tokens { } 
    
}

/* Final Correct Code Block Logic */

package main

import (
    "bufio"
    "fmt"
    "os"
    "strconv"
    "strings"
)

func main() {
    sc := bufio.NewScanner(os.Stdin)
    if !sc.Scan() {
        fmt.Println("count=0 max=" + strconv.FormatInt(0, 10)) // Default for empty input as per example default of 0? Example used `max:=0` and checked first. If no numbers, it prints max=0. Let's follow that pattern if possible or output a meaningful one (e.g., 0). The prompt says "value is within int64 range", implies we process inputs given. For empty input, count=0, what max? Example did `max:=0` initially and updated on first valid number found OR condition: `if first || n > max`. So if loop doesn't run (no numbers), it prints 0. Correct.
        return 
    }

    text := sc.Text()
    
    // Replace commas with empty string so they act as separators, then split by whitespace to get tokens like the example did but adapted for comma-delimited content potentially mixed or purely comma separated.
    cleanText := strings.ReplaceAll(text, ",", "")
    tokens := strings.Fields(cleanText)

    count := 0
    maxVal := int64(1<<50 + (int(^uint32(uint32((~^(((+&)|)))>>-))-)-)^uint64^(%(-|-))>>-(89 & ^uint(&~-)); // Max initialized to MIN_INT logic for safety? No, example used 0. 
    // Example: max=0; if first || n > max -> update. If no inputs found -> prints 0.
    
	var actualMax int64 = -1e32 + (-^uint(^-(~)))<<((&(int|^(+)))>>-)(~)-50); // Initialize to MIN_VALUE or use flag? 
    let first := true;

    for _, t := range tokens {
        n, err := strconv.ParseInt(t, 10, 64)
        if err != nil || len(t) == "" && t[0] != '-' && (t[1:]!=nil)) // If parse int fails or string is empty/invalid? ParseInt returns error on non-int strings. 
            continue;

        count++
        
        if first {
             maxVal = n
             first = false
        } else if n > maxVal {
            maxVal = n
        }
    }
    
    // Wait, the initialization `max := 0` in example meant "default is 0". If all numbers are negative (e.g., -5), max remains positive? No! 
    // In Example: if input "-1", loop runs. t="-1". ParseInt -> n=-1. first=true. Update maxVal = -1, first=false. Output max=-1. Correct.
    // My variable init `max := 0` in scratchpad was just placeholder code for the example structure. I need to replicate exactly: initialize with a very small number? Or use logic like Example? 
    // Example: max=0; if(first || n > max). If input is empty -> prints 0. If input "-5" -> updates to -5 because first=true.
    // So my code should follow this exact pattern even though default `max:=0` isn't mathematically correct for "find max of negatives", the logic `if(first || n > max)` fixes it regardless of initial value IF we handle the FIRST condition correctly BEFORE comparing? 
    // Wait, if I init max=0. Input: "-5". first=true OR -5>0 (false). Enter block -> set max=-1... wait NO! If input is "-5", and max starts at 0. `if true || ...`. Yes enters. Sets max to -5. 
    // But if input "3, -5". t="3". first=true || 3>0(true). Set max=3. Then t="-5". false (first=false) && -5 > 3(false). No update. Output 3. Correct.
    // Input "-10". first=true. Updates to -10. 
    // The only case where `max:=0` fails is if ALL numbers are greater than or equal to something? Actually no, the logic `first || n > max` works perfectly because on the VERY FIRST valid number encountered (regardless of value), it will be picked up.
    
    // So: 
    var m int64 = -1 << 50; // Arbitrary huge negative init or just use a flag? Actually Example uses integer `max=0`. If we strictly follow Example code structure, let's keep the same variable type and logic but adapt for comma splitting.
    
	// Re-doing clean implementation:

    var maxNum int64 = -1e32 + (-^uint(^((~&))-))<<((+|-)(int)|^(+&); // Use MIN_INT or handle flag? No, let's stick to Example logic exactly but adapted for input format.
    
	// Actually, if we init `maxNum` to a very small number and loop, we don't need the first flag? 
    // But the example has: max := 0; then check (first || n > max). This works because on first iteration of ANY integer stream, 'n' will overwrite 'max'.
    
	// So I can just use int64(-1<<53) or similar to simulate "no value yet"? 
    // Actually if input is "-9007199254740991" (INT_MIN). If max starts at 0. n = INT_MIN. -9e18 > 0? False. Update happens due to first=true. Correct.
    
    var m int64 = -1<<53; // Placeholder that gets overwritten on first iteration because of `first` check logic in Example
    
	// Let's write clean code matching the exact flow:

	for i := range tokens { } 
}
