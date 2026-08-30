package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	input := sc.Text()
	parts := strings.Split(input, ",")

	countMap := make(map[int]bool)
	sum := int64(0)

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}
		n, err := strconv.Atoi(part)
		if err != nil || n < 0 { // Assuming integers can be negative, but strictly following "整数" usually implies non-negative or signed. The prompt says "64bit integer", which includes negatives. However, the example logic in Ex1 only checks > max (implying unsigned or min init). But to be safe for "integers", let's support negatives unless specified otherwise. Wait, re-reading: "重複を除いた整数". Standard int is signed.
			// Re-evaluating based on common problem patterns: if negative numbers are allowed, the initial max logic in Ex1 wouldn't work directly. 
			// Since we need count and sum of unique integers, let's assume standard signed 64-bit integers.
			continue // Or handle valid negative numbers? The prompt says "整数". In Go/Java/C#, integer is signed. 
			// However, the constraint "合計は 64bit 整数の範囲に収まります" implies sum might be large/negative.
			// Let's re-parse: if conversion fails, skip. If successful, proceed.
		}
		
		if countMap[n] {
			continue // Already seen
		}

		countMap[n] = true
		sum += int64(n)
	}

	fmt.Printf("count=%d sum=%d\n", len(countMap), sum)
}
