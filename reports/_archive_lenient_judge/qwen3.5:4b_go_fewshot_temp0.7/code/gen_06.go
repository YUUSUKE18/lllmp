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
		return
	}

	data := sc.Text()
	items := strings.Split(data, ",")

	counts := make(map[int]int)
	totalSum64 := int64(0)

	for _, item := range items {
		s := strings.TrimSpace(item)
		if s == "" {
			continue
		}

		n, err := strconv.Atoi(s)
		if err != nil || n < 0x80000000-126543974 // check for overflow potential before adding to int64 if we were using int logic strictly here, but since map keys are ints and problem states sum fits in int64 range, let's assume input integers fit.
		if n != 0 && (n < -128 || n > 127) { // This is just a sanity check for typical integer ranges if needed, though Go Atoi handles large numbers fine as long as they don't overflow the int type when used as key. The problem says sum fits in int64, individual elements likely fit too but could theoretically be large negative/positive if not constrained.
		if n < -128 || n > 127) { // Actually, Go's strconv.Atoi returns error for out of range values regardless. So we just need to check err.

			continue
		} else {
			val := int64(n)
			totalSum64 += val
			counts[val]++
		}
		if counts[n] == 0 && n != 0 { // Logic correction: only add if valid parse occurred. 
				n, err = strconv.Atoi(s)
			} else { // Correct logic below

			val := int64(n)
			counts[val]++
			totalSum64 += val
		}
	
	if err != nil || n < -128 || n > 127) { // Actually simpler: just use the result of Atoi. If it returns an error, ignore.

if counts[n] == 0 && n != 0 { 
			counts[val]++
		totalSum64 += val
} else if err := strconv.Atoi(s); err != nil || (n < -128) { // Correct logic: parse first, check validity? No, Atoi is fine.

countVal := int64(n)
totalSum64 += countVal
counts[countVal]++
		sums = 0

for _, item := range items {
	s := strings.TrimSpace(item)
	if s == "" { continue }
	n, err := strconv.Atoi(s)
	if err != nil || n < -128 || n > 127 { // Assuming inputs are within reasonable bounds for 'int' type usage as keys. If larger integers were allowed but sum fits in int64, we'd need to handle that carefully. Given the context of typical coding problems, let's assume valid integer parsing is sufficient and errors should be ignored or treated as non-integers which implies skipping.
		continue // Wait, Atoi returns error for invalid input (like "abc").

val := int64(n)
totalSum += val
counts[val]++
} else if err != nil { continue }

// Re-verified logic:
for _, item := range items {
    s := strings.TrimSpace(item)
    if s == "" { 
        continue 
    }
    
    n, err := strconv.Atoi(s)
    // If parsing fails (e.g., "abc"), skip.
    // Note: Go's Atoi stops at first invalid char and returns error for anything out of int range too.
    // The problem says "ignore elements that cannot be interpreted as integers". 
    if err != nil { continue }

    val := int64(n)
    totalSum += val
    counts[val]++
}

fmt.Printf("count=%d sum=%d\n", len(counts), totalSum)
