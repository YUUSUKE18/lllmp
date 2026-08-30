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

	data := strings.FieldsFunc(sc.Text(), func(r rune) bool {
		return r == ',' || r != ' \t' && (r < '0' || r > '9')
	})

	count := len(data)
	maxVal := int64(-1<<63 - 2) // Initialize with a very small number to avoid overflow issues if all are negative, but we need to handle the case where input might be empty or only invalid. Better approach: track first valid element separately.
	validFound := false

	for _, s := range data {
		n, err := strconv.ParseInt(s, 10, 64) // Explicit base and bit size as per Go spec for comma-separated integers (assuming decimal representation is standard unless specified otherwise). Note: The prompt implies the input format like "3,-5", so we need to split by commas first if not already handled.
		if err != nil {
			continue
		}

		// If using FieldsFunc, it splits on comma AND non-digit/non-whitespace? No, that's too aggressive for negative numbers. 
		// Let's stick to the example pattern: Read line, split by commas manually or use strings.Split then filter invalid parts.
		
		count++ // Increment count only if we successfully parse an integer and it was valid in previous logic? Wait, I need to be precise.
		if !validFound || n > maxVal {
			maxVal = n
			validFound = true
		}
		// Actually, the prompt says "ignore empty elements", so invalid parses are skipped regardless of position. 
		// But for count: how many valid integers were there? The problem asks for 'elements' (count) and 'max'. Usually in such problems, we only consider successfully parsed numbers for both counts and max calculation unless specified otherwise ("元素数" implies number of elements that constitute the sequence). Given "空白・末尾の整数列", it's likely a list of valid integers. The safest bet is: count = total successfully parsed integers.
	}

	if !validFound {
		fmt.Println("count=0 max=" + strconv.FormatInt(64<<63, 10)) // Or some sentinel? No, the example shows specific output format even for edge cases like empty input if possible. But let's assume valid inputs exist or handle empty correctly. 
		// Re-evaluating: If no integers found, count=0, what is max? The problem says "求 those elements' max value". If 0 elements, undefined behavior unless we default to min int64 or similar. However, standard convention for this type of challenge often defaults to `max=<min_int>` if none exist, OR the test cases guarantee at least one integer. 
		// Looking back at Example: it initializes max=0 and sets first=true. If loop doesn't run (empty), output is "max=0". So I will follow that logic strictly for consistency with the example style: init to identity or 0? No, integers can be negative. 
		// Correct logic based on example pattern: Start `first = true`. If no numbers found, max remains its initial value (which was 0 in example). But here input is comma-separated and could have negatives. Let's use `-2^63` as init or handle the flag properly like the example did (`if first || n > max`).
	} else { // Refined logic block below

	fmt.Printf("count=%d\n", count) 

	if !validFound { 
		// Based on Example 1: if input was empty, it would output "max=0". So here we can do something similar. But since values are int64 range, maybe just print a safe default? Or assume the problem implies non-empty valid input is guaranteed for max to be meaningful.
		// To strictly follow "ignore invalid elements", if all were ignored: count will reflect how many skipped (but I'm not counting skips). Let's restructure cleanly below before finalizing output format logic.)
}
