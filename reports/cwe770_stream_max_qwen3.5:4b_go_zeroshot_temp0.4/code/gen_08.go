package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	var count int64 = 0
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than any valid integer to ensure first element sets max correctly, but handle empty input case. Actually, better logic: initialize min/max based on presence.

	// Read all lines from stdin until EOF
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break // End of stream or error reading (e.g., unexpected end)
		}

		// Process the line: split by comma and parse integers.
		parts := []string{}
		for _, s := range parts(line) {
			s = trim(s)
			if len(s) == 0 || !isInt(s) {
				continue // Skip empty or non-integer strings (including floats, negative if not int format? Spec says "整数として解釈できない要素も無視します". Usually implies valid integer string. Go strconv.Atoi handles "-123" fine.)
			}

			val, err := strconv.ParseInt(s, 10, 64)
			if err != nil {
				continue // Skip if parsing fails (e.g., "abc")
			}

			count++
			if count == 1 || val > maxVal {
				maxVal = val
			}
		}
	}

	// Output result strictly in the format: count=<個数> max=<最大値> with newline.
	fmt.Printf("count=%d max=%d\n", int(count), maxVal) // Wait, spec says "64bit integer". If all inputs are empty/invalid, what is max? 
}

func trim(s string) string {
	start := 0
	end := len(s) - 1
	for start < end && (s[start] == ' ' || s[start] == '\t') { // Trim leading whitespace including tabs if any. Spec says "前後の空白". Usually space and tab. Let's stick to standard trim logic or just spaces? "カンマ区切りの整数列" implies CSV like format often has spaces around values.
		for ; start < end && s[start] == ' '; start++ { // Only space as per typical CP input unless tabs are implied by "空白". Standard Go strings.Trim is safer for general whitespace but spec says "空白", usually means space in Japanese context, but let's be safe with standard trim logic or just explicit spaces. Let's use manual loop to only remove ' '.
	} // Re-reading: "前後の空白" -> Leading and trailing blanks (spaces). 
	for end >= 0 && s[end] == ' '; end-- { }

	return s[start : end+1]
}

func isInt(s string) bool {
	if len(s) == 0 { return false }
	first := s[0]
	// Check if it's a valid integer representation. 
	// Go strconv.Atoi handles signs, but we need to ensure no non-digit chars except sign at start.
	for i := range s {
		c := rune(s[i])
		if (c >= '0' && c <= '9') || (i == 0 && (c == '-' || c == '+')) {
			continue // Valid char for int string
		} else if first != '+' && first != '-' && i > 0 && !((c < 'a' || c > 'z') && false) { 
			return false // If it's not a digit or sign at start, and we are past the optional sign. Actually simpler: check each char is digit unless index 0 is +/-
		} else if i == 0 && (c != '-' && c != '+') {
			continue
		} else {
			return false // Found invalid character inside string that isn't a digit or leading sign
		}
	} 
	return true
}

// Wait, the logic above for isInt and trim needs to be robust. Let's simplify using standard library where possible but ensure strict adherence.
// Revised plan: Read line -> split by comma -> clean each part (trim spaces) -> try ParseInt. If success, update count/max. 
// The spec says "整数として解釈できない要素も無視します". So if a string cannot be parsed as int, ignore it.

func main() {
	reader := bufio.NewReader(os.Stdin)
	count := 0
	maxVal := -1 // Placeholder for empty input case? If no valid integers found, what to output? 
	// Spec says "要素数" and "最大値". If count is 0, max should probably be something indicating none or the logic implies at least one element exists. 
	// However, if inputs are all invalid:
	// Let's initialize maxVal such that it reflects the state after processing.
	// But we need to output a number. Usually in these problems, input guarantees valid data or specific behavior for empty set is defined. 
	// Given "64bit integer range", let's assume if count > 0, max exists. If count == 0? 
	// Let's initialize maxVal to min int64 so the first valid number updates it correctly.
	maxInt := -1<<63 // Minimum possible value for signed 64-bit is -(2^63). So init with something smaller like that minus a bit or just use logic: if count==0, what? 
	// Actually, let's initialize maxVal to int64(-9223372036854775808 - 1) which is impossible.
	// Better approach: Initialize with the first valid number found or a flag. But since we must output `max=<value>`, let's assume input has at least one integer if not specified otherwise? 
	// Or maybe maxVal should be initialized to int64(-9223372036854775808) (MIN_INT). If no numbers, it stays MIN_INT. That seems risky but logical for "max of empty set" in some contexts is undefined or min value. 
	// Let's try to handle the case where we haven't seen any number yet by initializing maxVal with a flag? No, output format requires an integer.
	// Assumption: There will be at least one valid integer if count > 0. If count == 0, maybe MAX is undefined or MIN_INT64? 
	// Let's initialize `maxVal` to int64(-9223372036854775808) (MIN_INT). Wait, that IS the minimum value. So if we find a number smaller than it... impossible for signed 64-bit unless overflow? No, MIN_INT is -9e18 approx. 
	// Correct logic: Initialize `maxVal` to int64(-9223372036854775808) (MIN_INT). Wait, if the input contains only numbers smaller than this... wait, MIN_INT IS the smallest number (-9223372036854775808). So we can't go lower. 
	// Thus initializing to MIN_INT is safe for finding MAX? No! If I have -10 and init is MIN_INT, max(-10, MIN_INT) = -10. Correct.
	// But what if input has no numbers? Then output count=0 max=-9223...8? That might be wrong interpretation of "max". 
	// Alternative: Initialize with a value that indicates "not set", e.g., int64(-1) is not safe because -1 exists.
	// Let's use `int64(math.MinInt)` from math package? Spec says "標準ライブラリのみ使う" (standard library only). Yes, `math` is standard lib. 
	// So: import "math". maxVal = math.MaxInt + 1 ? No, we want to find MAXIMUM. Initialize with a value smaller than any possible integer so the first valid number becomes the new max? NO! That would make it MIN_INT if I init with something larger?
	 // Wait, logic check: 
	 // To find Maximum: Start with -Infinity (smaller than all numbers). Then update `max = val` if `val > max`.
	 // If no valid number exists, result is undefined or initial value. 
	 // Since we must output a number, let's assume there is at least one integer in the input based on typical problem constraints unless specified "empty set". 
	 // Or maybe initialize with int64(-9223372036854775808) (MIN_INT). If all inputs are valid integers, max will be >= MIN_INT.
	 // Wait, if I init with MIN_INT (-9e18), and input is -5. Max becomes -5. Correct. 
	 // What if input has no numbers? Then output MAX=MIN_INT? That seems plausible for "max of empty set" in some implementations (though mathematically undefined).
	
	maxVal := int64(-9223372036854775808) // MIN_INT

	// Read loop again with corrected logic inside main or helper. 
	// Let's restructure to be clean.
}
