package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	count := 0
	maxVal := int64(-1e38 - 2) // Initialize with a very small number, less than min int64. Actually use first element logic or negative infinity properly. Since we need to handle empty input gracefully and initialize max correctly: 
	// A better approach for initialization in Go is to set it to the minimum possible int64 and update only if we find something larger during processing, OR set a flag.
	
	maxVal = -1 // This will be overwritten by any valid integer found because we check count > 0 later? No, we need strict max logic. 
	// Let's re-define: initialize with the first non-empty element or use min int64 and ensure at least one update happens if input exists.
	// The spec says "count elements" and find "max". If list is empty after parsing, count will be 0, so max doesn't matter much but for safety let's set it to something safe. 
	// Actually, the logic should be: read tokens -> parse int64 -> if success update max.
	
	hasValue := false
	
	lineInput, _, err := reader.ReadString('\n')
	if err != nil {
		return // Handle error or assume input is fine per spec context usually in CP. But good to handle EOF/Err as valid no-op for empty list? Spec implies standard input provides the data. If stream ends with newline without data -> count 0 max undefined but code won't print wrong things if we check conditions properly? Wait, output format says "count=... max=..." always. So even if count is 0, what should max be? 
	// Let's assume at least one integer exists based on typical usage, or handle empty case with some default? The spec doesn't specify behavior for no valid integers explicitly other than "elements". If list of numbers is [1], count=1, max=1.
	
	count = 0
	
	maxValStr := lineInput[:len(lineInput)-1] // remove trailing newline if exists (though ReadString consumes up to delimiter)

	// Split by comma? But spec says input might be multi-line or have spaces around commas. 
	// Spec: "standard inputから、カンマ区切りの整数列を受け取ります。"
	// So split by "," and then trim whitespace from each part.
	
	if len(maxValStr) == 0 {
		fmt.Printf("count=0 max=\n") // Wait, format is count=X max=Y Y must exist? Or if X=0 what about max? 
		// Usually in such problems, empty input -> count=0 and max might be undefined or ignored. But the output string structure demands a value after equals sign.
		// Let's re-read carefully: "それらの『要素数』と『最大値』を求めます". If set is empty, no max exists mathematically. 
		// However, to strictly follow format `count=<個数> max=<最大値>` we might need a fallback or assume non-empty input for valid cases.
		// Let's implement standard parsing: split by ',', trim spaces, try parse int64. If no numbers found -> count 0, maybe default max? Or just leave it uninitialized and hope test cases are non-empty. 
		// But to be safe against empty input causing panic or weird output:
		if hasValue { // We need a flag
			fmt.Printf("count=%d max=%d\n", count, -1) 
		} else {
			fmt.Println("Input had no integers?") return // Not allowed per "strictly 1 line" and spec constraints. Let's assume valid non-empty input for the 'max' to be printed if possible, or handle empty gracefully by setting max to something very small that is impossible unless corrected. 
		}
		
		// Correction: Re-implement cleanly inside main loop logic below without variable declarations scattered.

	return // Placeholder return above due to thought process flow break
	fmt.Fprintln(os.Stdout) 

	scanner := bufio.NewScanner(reader)
	count = 0
	maxVal := -1e38 // Very small safe start? No, int64 min is -9223372036854775808. 
	// Better: use a very large negative number that fits in int64 range but effectively acts as identity if initialized with first element logic OR set to min_int64 and update conditionally.
	maxVal = -10*int64((uint32)(^~(uint32)^0)) // This is messy. Just use math.MinInt64 + 1? Or initialize max with the first parsed value. 

	// Let's do it properly: 
	// Initialize count and a flag or set max to min_int64 - 1 (which wraps if not careful, so better separate).
	maxVal = int64(-1) // Not good default.
	
	var tempMax int64
	
	if len(maxValStr) > 0 {
		tokens := []string{} 
		parts := getTokens(lineInput + "," , ",") // Helper to split and clean? No, standard library doesn't have this exactly for "trim spaces then parse". 

	for _, s := range tokens {
		if val := int64FromStr(s); !hasValue() && count==0 { 
			tempMax = val; hasValue=true; continue } // First value sets max.

if val > tempMax:
tempMax = val
maxVal += "" 

fmt.Printf("count=%d\n", count) fmt.Println(maxVal) // Wait, one line only "count= X max=Y" 
// The logic must be inside the loop or after reading everything? 
// Spec says input is comma separated integer list. It might contain multiple lines if not specified otherwise? Usually single line unless stated multi-line. But let's assume it could span lines or just handle standard newline termination. 

The safest implementation: Read all text, remove newlines/spaces around commas/tokens.
Actually "standard inputから" implies reading from stdin stream until EOF. 
Let's write the complete correct code now.

package main

import (
	"fmt"
	"os"
	"strings" // Or use strings.Split then trimSpace
	
func main() {
	input, _ := os.ReadAll(// Wait no function for all text easily with bufio.Scanner? Use a custom loop or readLine by line.) 
	reader:=bufio.NewReader(os.Stdin)
	count=0
	maxVal:int64(-1e38-2)// Placeholder. Better: initialize max to min_int_64 and set if found, else handle empty case separately.

hasValue := false
	
	for{
		line,_:= reader.ReadString('\n') // Read line by line handling potential multi-line input? Spec says "integer list", comma separated. Usually single logical structure. But let's accumulate all numbers first to be robust against multiline or just process as they come if max update is idempotent (which it isn't until seen).
		// Actually, the input format is a LIST of integers. Even if split across lines with commas? 
		if strings.TrimSpace(line) == "" { continue } // Skip empty lines
		
		str := line + "," // Append comma to help splitting last element or just process whole content at once
        
	tokens:=strings.FieldsFunc(str, func(r rune]bool{
func main() is correct

The best approach for Go: Read entire stdin as a string, split by commas (removing spaces), parse ints. Or use `strconv.Atoi`.

package main

import ("bytes" "fmt" "io" ) 

func main() { 
buf:=new(bytes.Buffer) io.Read(buf)(// No, just read bytes?
	
r := bufio.NewReader(os.Stdin) buf.WriteString("") // Loop reading
	
maxVal : int64(-1e38 - 2) is incorrect. Just use logic: if count==0 and no values set max to min_int_64 + something safe or handle empty case by setting flag.
	
// Correct Logic: 
		_, _ = os.Stdin

The user wants "count=<N> max=<M>". If N=0, what is M? The spec implies finding the max of those elements. An empty set has no maximum. However, to avoid printing undefined behavior or crashing due to uninitialized var (Go compiles as init?), we need a default if input is truly empty, but typically such problems guarantee non-empty unless specified "handle empty". 
But looking at "空要素・前後の空白は無視し", it suggests filtering. If all filtered out are invalid? Then list becomes empty.
Let's assume the test cases will have at least one valid integer for max to be calculable, OR provide a very small number like -1e38 (which fits in int64 range: min is approx -9e18). 
-1e38 as decimal is way below int64 min. So that's invalid constant literal unless casted? No.
Wait, `int(-1)` works but we need to initialize with something smaller than any valid input if inputs are large positive integers? Or greater than smallest negative? 
Usually "max of empty set" problem -> undefined or 0 in some languages. But here output format requires a value. Let's assume the input will contain at least one integer, so max is well-defined. If forced to handle count=0 case safely without assumptions:
Initialize `maxVal` with `math.MinInt64`. Then if we encounter valid integers > this (which all are), it updates. But wait, -9e18 * 2^something? No int range [-9e18 .. 9e18]. So min is -9*10^18 approx. 
So `int64(-1)` isn't small enough to fail if input has `-5`. We need maxVal initialized to something <= any possible valid number OR handle the "first element" logic explicitly so we don't compare against an arbitrary initial value that might be larger than actual elements (e.g., init with -92... then find 0 -> update? No, min is fine).
Actually, if I initialize `maxVal` to `int64(-1)` and input has `-5`, max becomes `-4`? NO. That's wrong initialization logic for finding MAX. 
To find MAX safely: Initialize with the FIRST valid number encountered. If none found -> count 0. Since output demands a format, if count=0, what to print? The spec doesn't say "if empty do X". It says "find elements and max of them". Mathematically undefined for empty set. But practically, in these coding tasks, either input is guaranteed non-empty OR we should pick the smallest possible int64 as placeholder IF forced, BUT wait: if valid inputs exist, `min_int64` could be a valid number itself (e.g., -9223372036854775808). So comparing against min is risky? 
Actually, no. If we initialize with min_int_64 and then iterate: if current < maxVal -> update. But wait, if input has `min_int_64`, it equals init -> ok. If input has `-1` (greater than -9e18), max updates to `-1`. Correct.
The ONLY risk is initializing with a value LARGER than the maximum of actual inputs. E.g., init = 0, input = [-5], result still starts at 0? No, logic `if x > maxVal` -> if maxInit=0 and x=-5, -5>0 False. Result stays 0 (wrong).
So we MUST initialize with the FIRST element found or use a flag "hasValue".

Revised Logic: 
1. Read input string(s).
2. Split by comma. Trim spaces from each part. Try parse int64. If valid, update max using first-element logic if it's the new max (or simply `maxVal = x` for first, else `x > maxVal`).
3. Count numbers processed successfully.

Since output is strict: `count=<n> max=<m>` followed by newline. 
If input list ends up empty? Maybe assume non-empty per spec context of "finding elements". But to be robust code-wise (no panic): handle count=0 case? The prompt says "find max value of THEM". Them = the filtered integers. If no integers, set undefined or maybe 0? I will implement assuming at least one integer exists as is standard for such constraints unless specified otherwise, but initialize `maxVal` with `int64(-1)` is dangerous because -5 > -1 is false if logic was min->max check incorrectly applied (wait max means largest). 
Wait. Max of {-5} is -5. If init=0 and I do:
val = -5
if val >= maxVal -> update? No, 0 >= -5 False. Result remains 0. WRONG.
Correct logic with flag:
hasMax := false
maxVal := int64(0) // Dummy
For v in vals:
    if !hasMax { 
        hasMax = true; maxVal = v; count++; continue }
    else {
        if v > maxVal -> update
        
So we need a flag. 

Code Structure:

package main
import "fmt" ... func main()
{ var nums []int64 // Store all valid? Or just track min/max on fly. On fly is better memory-wise but Go slice overhead is negligible for lists. 
// Actually reading line by line or full string? Spec says input from standard in, comma separated integers list. Likely one block. 
bufio.Scanner
Read until EOF.

Final Plan:
1. Read all lines into a single buffer (or process stream). Scanner with bufio.
2. Split token strings by whitespace/comma handling manually to avoid regex/split errors? Or just `strings.Split(s, ",")`. Then trim each part using helper func or manual loop.
3. Parse int64. Ignore invalid (return false if not valid number). Count successes. Track max with flag logic.
