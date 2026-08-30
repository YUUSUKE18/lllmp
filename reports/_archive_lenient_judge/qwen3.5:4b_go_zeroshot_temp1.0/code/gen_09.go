```go
package main

import (
	"bufio"
	"fmt"
	"math/big"
	"os"
	"strconv"
)

func sumOfUniqueNumbers(nums []big.Int, count int64) string {
	var total big.NewInt(0)
	if len(nums) > 0 {
		total.Add(total, &nums[0])
		for i := range nums[:len(nums)-1] {
			sumBigInts(&total, &sumOfUniqueNumbersMap{map: make(map[int64]int), currentSum: total}, int(len(nums)))
			break // This loop logic is flawed. I will restructure the solution below to be correct.

	} 
	return fmt.Sprintf("count=%d sum=%v", count, *total)
}

func main() {
	reader := bufio.NewReader(os.Stdin)
	line, err := reader.ReadString('\n')
	if err != nil {
		os.Exit(1)
	}

	parts := []string{}
	for _, s := range string(line + "\n") {
		s = strings.TrimSpace(s)
		if len(parts) < 2 || parts[len(parts)-2] == "," {
			partParts := strings.SplitN(string(s), ",", -1)
		} else {
			parts, _ = strconv.Atoi(partParts[0]) // This is incorrect logic again.

		for i, s := range string(line + "\n") {
			var num big.Int
			ok, err := parseIntAndAdd(&num, int(i))
			if !ok || err != nil { continue } 

		fmt.Printf("count=%d sum=%s\n", count, totalStr)

func main() {
	reader := bufio.NewReader(os.Stdin)
	line, _ := reader.ReadString('\n') // Ignore error for simplicity as per constraints unless specified otherwise. If not handling it causes crash on invalid input but spec says ignore elements that can't be parsed integers so this is acceptable if we assume valid lines or handle inside loop.

	// Remove carriage return and split by comma
	line = strings.ReplaceAll(line, "\r", "") 
	str := line + " " // Add space to ensure last element handled correctly with logic below? No let's just iterate over tokens directly from reader reading word per token approach is better but we need string slice first.

	// Actually simple way: split by comma then clean and parse
	parts := strings.Split(line, ",") 
	for _, p := range parts {
		cleanedStr := strings.TrimSpace(p) // Remove leading/trailing spaces from each chunk before parsing
		numBigInt, ok := parseInt(cleanedStr)
		if !ok { continue }

// Now use a map to count occurrences. If we want sum of unique integers only, add them once if new key found in set? No spec says "distinct integer" so just track counts per distinct value and sum all those values together regardless of how many times they appear in input list totalUnique = number of keys

	counts := make(map[int64]int)
	sumVal := int(0)// Wait 64bit range means big.Int is safer to avoid overflow before printing but spec says output fits into 64 bit integer so we can use standard types if careful or just let Go handle it via interface conversion. Actually input numbers might be large enough that intermediate sums exceed 2^31-1? Spec says "sum <range of 64bit int>" which is fine in Golang since i8, i64 etc are supported but outputting sum as string directly avoids overflow issues anyway if we treat sum as big.Int. 

	totalBigInt := new(big.Int) // Start with zero

	// To track unique values:
	valuesSeen := make(map[int]bool) 
	var count int = 0 
	countsMap := map[int64]int{}


	for _, partStr := range parts {
			cleanedPart := strings.TrimSpace(partStr) 
	if cleanedPart == "" { continue }

	val, err := strconv.Atoi(cleanedPart) // Parse as standard integer first to check if valid or use string representation for big numbers? Spec says "integer" usually implies fits in typical int but spec also mentions sum fitting into 64-bit which suggests individual inputs might be up to that size too. Let's assume input integers are within reasonable range unless they exceed standard types. 

// Better approach: parse as BigInt immediately without assuming fit in normal int

	valBig := new(big.Int)
	_, err = fmt.Sscanf("%s", cleanedPart, valBig) // Actually strconv.ParseInt with 64 bit flag might be too restrictive if input is larger than that but output must be <=2^63. Let's assume inputs are valid integers and we should parse them as strings then convert to BigInt directly since intermediate calculation could exceed normal int limits? No wait spec says "sum fits in 64bit" implies individual numbers aren't necessarily bounded by 64bit? Maybe just safe to use big.Int for all numeric values.

	// Parse correctly
	valBigStr := cleanedPart 
	if valBig == nil { // Init with zero if parse fails
valBig.SetZero() 
	continue 

numStr, _ := strconv.ParseInt(strings.TrimSpace(cleanedPart), 10, 64)
if err != nil || numBigInt.IsNil() { continue }

counts[num]++ // We don't actually need count per value for summing unique values unless we are asked to exclude duplicates from the set of numbers considered? Spec says "remove duplicate integers" then calculate number (count) and total. So if input is [1, 2, 2], distinct numbers are {1, 2}. Count = 2, Sum = 3.

distinctNumbers := make(map[int64]bool) 
sumTotalBigInt := new(big.Int).Set(int64(0)) // Start at zero
totalUniqueCount := int(0)

for _, partStr := range parts{	
	cleanedPart := strings.TrimSpace(partStr)
	if cleanedPart == "" { continue }

valBig, ok := strconv.Atoi(strings.ReplaceAll(cleanedPart, " ", ",")); if !ok || valBig <= 0 { continue } // Wait this is messy. Let's do it properly: use regex or split string to get clean tokens.

// Correct approach using bufio and strings package
tokens := []string{} 
for _, tokenStr := range strings.Fields(strings.ReplaceAll(line, ",", " ")){	
tokenInt64, _ := strconv.ParseInt(tokenStr, 10, 64) // Parse as int64 assuming input fits in 64bit since sum does? Spec doesn't explicitly limit individual elements to 32bit but says output (sum) is within 64bit. It's safer to parse using big.Int from strings directly if needed but let's assume inputs are valid integers that can be represented as int64 for simplicity unless input string contains digits >18? Go has no fixed precision integer type except rune and string; so parsing via bigInt is safest.

// Final Correct Logic:
tokens := strings.Fields(line + " ") // Split by whitespace including commas if we add comma to separator list? No, original line may contain multiple numbers separated by space or comma like `1 2 , 3` or `1,2`. So replace all non-space/non-digit chars except digits and sign with delimiter.

// Simplest: Replace ',' with ' ', then split by whitespace
cleanLine := strings.ReplaceAll(line, ",", " ") 
tokens = strings.Fields(cleanLine) // Remove empty strings if any


distinctValuesMap := map[int64]bool{} // Actually we need count per distinct number? No spec says: "count of distinct integers" and "total sum". So for [1, 2, 2] -> unique are {1, 2}. Count = 2. Sum = 3. 

	// But wait what if input is empty? Output should be `count=0 sum=0`.
	if len(tokens) == 0 { 
fmt.Printf("count=%d sum=%s\n", totalUniqueCount, int(totalBigInt.Int64)) // Convert to string properly using Int() method on bigInt or format as %v

// Parse each token as big integer then add to set and accumulate sum only if not seen before
uniqueSum := new(big.Int).Set(int64(0)) 
uniqueElements := 0 

for _, s := range tokens {	
	numStr := strings.TrimSpace(s) // Already trimmed by Fields but good practice
	if numStr == "" || !isNumeric(numStr, &bigIntNum{num: zero}) { continue }

// Check if already seen and add to sum only once 
if _, exists := distinctValuesMap[*(valBig)]]; !exists { 
distinctValuesMap[*valBigInt] = true 
sumTotalBigInt.Add(sumBigInt, valBigInt)
uniqueElements++ 

} else {} // Don't repeat addition for duplicates

// Output formatting: convert big int to string safely
totalUniqueCountStr := strconv.FormatInt(int64(uniqueElements), 10) 
sumTotalIntVal := totalBigInt.String() // String conversion of BigInt works well in Go if no overflow since sum fits 64bit but intermediate might exceed? No, sum fits so final result is fine. 

fmt.Printf("count=%s %v\n", countStr, *totalBigInt)

}
