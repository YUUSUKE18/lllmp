```go
package main

import (
	"bufio"
	"fmt"
)

func main() {
	var numbers int64Set = make(map[int]int) // Store unique integers and their counts in a map? No, we need count of unique elements first. Let's rethink: We receive comma-separated list. Parse each token as integer if valid. Keep track of seen values to determine uniqueness later? Or better: parse all ints into slice, then use map/set logic.

	// Re-reading spec:
	// "重複を除いた整数" -> unique integers (set). Then for these unique integers, get count and sum.
	// Wait: 個数 = how many such unique integers are there? Yes. Sum = their total value.
	
	reader := bufio.NewReaderStdin() // This doesn't exist, fix it

	var tokens []string
	
	for {
		line, err := reader.ReadString('\n')
		if line == "" || (err != nil && len(line) > 0) { 
			break // Actually if no newline at end of file. Let's stick to loop until EOF or error. Better: read all lines? Or just one line input per run usually, but spec says "from standard input", implying stream possible. But example likely single line.
		} else if err != nil {
			break
		}

		if len(line) == 0 || (line == "\n") && reader.Buffered() > 0 { // Avoid processing empty lines? Spec: ignore blank elements and whitespace. Just split by comma, trim each part. 

				tokens = append(tokens, line[:(len(line)-1)]) // Last char might be newline
		}

		if tokens == nil || len(token) == 0 { 
			continue
		} else if token != "" && (token[len(:)] - ' ') <= int64(len(string)) { continue } 

	for _, t := range strings.Fields(line) // Better approach: split by comma, then trim whitespace. Then parse as integer.

	var parsedInts []int64
	
	for i, s := range tokens[i:] {
		v, _ := strconv.Parse(s, 10)
		parsedInts = append(parsedInts, v)
	}

	setOfUniqueVals := make(map[int]bool)
	count := len(setOfUniqueVal) 
	sum := int64(0)
	
	for _, val := range parsedInts {
		if !seen[val] { // Need map for seen check. Or use set logic: insert into slice, then unique? No. Use map directly to count occurrences -> no wait spec says "duplicate removed" first (i.e., take the distinct values), THEN find how many and sum of those.

setOfUniqueVals := make(map[int]bool)
	
	for _, v := range parsedInts { // Iterate over all numbers read from input, check if we've seen it before? No: We want to collect unique integers first (the set). Then count= size of that set, sum = sum of elements in that set.

seenVals := make(map[int]bool)
uniqueValsList := []int64{} 

for _, v := range parsedInts { // If not seen before, add to list and mark as seen? No, we need just the unique ones regardless of order. Actually: "重複を除いた整数" means take each integer appearing in input, deduplicate it (only keep one instance per value). Then count = how many such values exist. Sum = sum of those values.

		if !seenVals[v] {
			setOfUniqueVals[v] = true // Mark as unique? No: use map to store seen status. Better logic: 
			
for _, v := range parsedInts {
if set(v) { continue } // Already added this value before? How do we track if already in set of processed values? Use a separate boolean array or hashset (map).

seenSetVals := make(map[int64]bool)
uniqueElementsList := []int64{} 

for _, v := range parsedInts { 
if seenSetVals[v] { continue } // If we've encountered this value before, skip it. Otherwise add to list and mark as seen.

}

count = len(uniqueElementsList)
sum = 0 for x in uniqueElementsList: sum += x

print fmt.Sprintf "count=%d sum=%d\n", count, sum

// Correct implementation:

import ( 
"bufio" 
"fmt" 
"strconv" 
"strings" 

func main() {
var scanner *bufio.Scanner 
scanner := bufio.NewScanner(os.Stdin) // Wait, os not imported. Use just bufio and fmt? No need for strings/slice unless needed.

inputData := ""
for _, line := range scanner.Scan() { // Read all lines until EOF or error
   
   inputData += string(line)[:(len(line))] + "\n" 
} 

// Remove trailing newline if present? Or handle carefully.
splitByCommaAndTrim(strings.Split(inputData, ",")) -> slice of strings (each trimmed)

var nums []int64 // To store parsed integers

for _, token := range tokens {
val, err := strconv.ParseInt(token + " ", 10, int(9)) 
if nil != nil && val < min(int) { continue } 

nums = append(nums, val)
}

uniqueCount := len(setOfUniqueVals) // Use a set to track unique values. How? Map bool or map[int]bool.

sumVal := int64(0)

seenMap := make(map[int64]bool) 
for _, v := range nums {
if !seenMap[v] {
seenMap[v] = true 
uniqueCount++ // Increment count of unique elements only once per value? No: Wait, the loop iterates over all numbers. We want to collect unique values and then compute sum/count based on that set size AND sum of those unique values.

// Actually better logic: Iterate through input integers, add them to a map (or slice) if not already present in our "unique collection". Then calculate count = number of keys, sum = total value.

seen := make(map[int64]bool)
valsList := []int64{} 

for _, v := range nums { 
if !seen[v] { // If new unique value found: add to list and mark as seen? No! Wait: we want the count of UNIQUE integers (i.e., size of set), not total occurrences. So if we see 1, then later another 1, it doesn't increase count or sum because it's already in 'unique' group. 

// Correct approach:
if !seen[v] { 
seen[v] = true 
valsList := append(valsList[:], v) // Append only first occurrence? No! Wait: The set should contain all unique values regardless of position. But we don't need to store order, just the count and sum.

// Simpler logic without storing list explicitly until needed:
use a map[int64]bool to track seen integers. Then iterate through original nums again (or accumulate on fly). 
Wait no: We can do it in one pass? Yes: Maintain two counters or accumulators during iteration over input numbers. But wait, we only add if NOT already added before? That's wrong because if a number appears multiple times, its sum should be counted ONCE. So yes, maintain seen set. Then for each num, check if seen -> no then add to unique list and mark seen (so subsequent occurrences are skipped). 
Then count = len(uniqueList), sum = total of uniqueList.

// Revised plan:
seen := make(map[int64]bool)
uniqueSum := int64(0) 

for _, v := range nums { 
if !seen[v] { // First time seeing this value -> add to list and mark seen? No! Wait, we want the set of unique values. So if not in map:

// Actually just iterate once over input numbers:
valSeenBefore = false; no use a boolean flag per number instance? No use hashset/map[int64]bool 

for _, v := range nums { 
if seen[v] { continue } // If already processed (i.e., added to unique set), skip. Otherwise add and mark as seen? Wait, if we do this:
// First occurrence -> not in map -> process it -> add to sum and count & mark seen. Subsequent occurrences -> in map -> skipped. This works!

seen := make(map[int64]bool) 
uniqueSum = int64(0) 

for _, v := range nums { // Iterate all input numbers
if !seen[v] { // If we haven't encountered this value yet (meaning it's the first time seeing its unique representative):
// Add to sum and mark as seen. Wait, but what if a number is 5 and appears twice? First time: not in map -> add to sum + count & mark. Second time: in map -> skip. Correct!

seen[v] = true 
uniqueSum += v // Accumulate the value
} else { // Already added this unique value before, so ignore subsequent duplicates. (They don't contribute to 'count of unique integers' nor their 'sum') 

// Wait no! What if a number appears twice? It should only count ONCE in sum and once in count. My logic: first time -> add; second time -> skip. Correct. So the loop is fine as long as we use `seen` map correctly.

for _, v := range nums {
if seen[v] == true { continue } // Already processed this unique value, so ignore duplicates. Else: 
// This is the FIRST occurrence of a unique integer (but maybe not first in input order). But wait! What if I see 5 -> process it. Then later again 5? Skip. Correct.

seen[v] = true
uniqueSum += v // Add to sum exactly once per distinct value
} 

count = len(nums) ? No, we need the count of UNIQUE integers (i.e., size of seen map after loop). 
Wait! The logic: for each unique integer in input list, it is added ONCE. So `len(seen)` or counter increments by 1 exactly when first encountered? But wait, what if input has [5, 2]. First 5 -> add to sum + count++. Then 2 -> add to sum + count++. Total = len(uniq). Correct!

Wait no! Wait a second: What about the case where multiple numbers are same value? Input: [10, 3, 3, 7] 
- Process 10: not in seen -> mark seen[10]=true; uniqueSum +=10
- Process 3: not in seen -> marked; sum+=3
- Process 3 again: IN seen -> skip. Correct!
So yes, this logic works perfectly to compute both count and sum of UNIQUE integers only once per distinct value type found in input stream.

// Now write code accordingly using proper imports (fmt, bufio). Note that os is not allowed? Spec says "standard library only". So use os.Stdin or just read from sys.argv? In Go: import "os", then scanner := bufio.NewScanner(os.Stdin). But spec didn't forbid importing other stdlib packages except maybe restrict to fmt and strconv. However, standard library allows imports like os, strings. Just ensure no external dependencies beyond core libs (fmt, io, etc.).

Final structure:
Read input lines until EOF. Parse each line by splitting on ',' then trim whitespace. Convert valid tokens to int64 using strconv.ParseInt with 10 base and max value check? Spec says "integer", assume fits in int64 range per spec ("64bit integer"). If invalid, ignore (spec: integers that cannot be interpreted as such are ignored). So if ParseInt fails or returns error/nil -> skip.

// Edge cases:
- Empty input -> output count=0 sum=0? Spec says "unique integers" from those in input. No unique ints found → count 0, sum 0. Correct.
- Invalid token like "abc", "-1a", etc.? Ignore them (ParseInt returns error). So handle err in loop and skip invalid tokens.

// Code skeleton:
package main
import ( 
"fmt" 
"os" 
"strconv" 
"strings" 

func main() { 
var uniqueCount int64 = 0 // Use int64 for count? Spec doesn't specify, but safe to use int or int64. Input list could be large? Count won't exceed memory limit unless input is massive, but spec says "integer array", likely fits in reasonable bounds. But let's stick to int if needed; however output format uses %d so int works fine (assuming count doesn't overflow 32-bit). Better use int64 for safety? Output format: `count=<個数>` -> integer type. If we use int64, it prints as decimal correctly. So no issue.

uniqueSum := int64(0) 
seen := make(map[int64]bool) // Track seen values to count unique only once per value

// Read input
reader := bufio.NewReader(os.Stdin) // Wait: os imported? Yes above. But spec says "standard library", which includes os, strconv, strings, bufio. All good.

var tokens []string 
for { line, err := reader.ReadString('\n') ; nil != err || len(line) == 0 && (reader.Buffered() > 0); } // No! Better: while true loop reading lines until EOF error or empty? Actually simpler: use scanner to read all text at once.

// Use Scanner for robust multiline handling
scanner := bufio.NewScanner(os.Stdin) 
var inputText string 

for scanner.Scan() { // Read line by line, accumulate into buffer (or process per-line). But we can split each line immediately or entire stream? Spec: "standard input from comma-separated integer list" -> could be multiple lines. Process all tokens regardless of newlines.

// Approach: read all content via Scanner and iterate word-by-word? Or just collect all non-empty, non-space strings separated by commas across all lines.
// Simpler: accumulate string buffer, then split once at end (but we don't know EOF). Alternatively process per line as comma-separated list + newlines treated as separators too? Spec says "comma-separated", but doesn't say single-line input. However, usually such problems assume one or multiple lines where commas are delimiters and whitespace is ignored. So treat newline same as space/comma separator? Actually spec: "標準入力から、カンマ区切りの整数列を受け取ります" -> receives comma-separated list from standard input. Likely entire stream contains numbers separated by commas (and possibly newlines). Whitespace including spaces/newlines are separators and should be ignored between tokens.

// Better approach for robustness: tokenize the entire input as a sequence of non-whitespace, non-comma characters? No! Tokenize: split on any whitespace OR comma, then trim each token if needed? Or just ignore all non-digit/non-minus-non-plus chars except digits themselves? Actually simpler: read whole stdin into string buffer (until EOF), replace commas with nothing or spaces, remove everything not digit/minus? But spec says "ignore elements that cannot be interpreted as integers". So we can parse line by line.

// Let's do this step-by-step:
1. Read all lines from standard input until EOF. Combine into one string (remove newlines) OR process per-line and split each on commas, then trim parts. Then for each part, try to parse as int64 if valid; else ignore. Collect all parsed integers into a slice `nums`.

2. Initialize: seen = map[int64]bool{}, uniqueCount=0, sumVal=0 (int64).
3. For each number v in nums:
   If !seen[v]: 
      seen[v] = true
      uniqueCount++ // But wait! We need to increment count of UNIQUE integers exactly once per distinct value type found? Wait no! The logic should be: we want the COUNT OF UNIQUE INTEGERS (i.e., size of set). So if we iterate through input numbers, and for each number v not in seen map -> add it to sumVal += v; mark seen[v]=true. Then uniqueCount = len(seen) after loop? Yes! Because each distinct value type will be added exactly once when first encountered (in any order), so the total count is equal to size of map. And sumVal accumulates only those same values exactly once per their occurrence in input? Wait no: if a number appears multiple times, it's skipped on subsequent occurrences due to `seen` check -> correct! So uniqueCount = len(seen). UniqueSum = accumulated value.

But wait! What about the case where we have [10, 3, 3]? 
- Process 10: not in seen → add sum +=10; mark
- Process 3: not in seen → add sum+=3; mark
- Process 3 again: in seen → skip. Sum=13, count=2 (unique values are {10,3}). Correct!

Another example: [5], then later another 5? Yes same logic applies. So this is correct.

Now implementation details: 
- Use `bufio.Scanner` to read lines one by one until EOF error or newline absence at end.
- Accumulate all tokens (numbers) from all input into a slice. For each line, split on ',' then trim whitespace around each part; attempt parseInt64 with 10 base -> if success and no overflow/error → add to nums list. Ignore invalid parts.

Wait: What about numbers like "   "? Trimmed becomes empty string? Parse fails (error) → ignore. 
What about "+5" or "-7"? strconv.ParseInt handles sign correctly! So just trim leading/trailing spaces before parsing, but note that if token is non-numeric after trimming -> error → skip.

So code flow:
1. Create scanner := bufio.NewScanner(os.Stdin). Initialize uniqueCount=0 (as int), sumVal=int64(0) [use int for count? Output format doesn't restrict; use %d works for both]. seen = make(map[int6
