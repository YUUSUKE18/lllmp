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
	input := sc.Text()
	pairs := make(map[int]int64) // 重複を除いた整数の個数と合計を保持するマップ (key: integer, value: count+sum? No. Need separate logic or combine carefully). 
	// Actually, the requirement is "count of unique integers" and "sum of those unique integers".
	// So we need to track which numbers are seen at least once, then sum them up and count how many distinct ones exist.

	distinctNumbers := make(map[int]bool) // Track if a number has been seen
	
	for _, s := range strings.Split(input, ",") {
		s = strings.TrimSpace(s)
		if len(s) == 0 || !isInteger(s) {
			continue
		}
		
		n, err := strconv.Atoi(s)
		if err != nil {
			continue
		}

		distinctNumbers[n] = true // Mark as seen (count is implicitly handled by map size later if we just iterate keys? No. The requirement says "for the unique integers... count and sum". 
		// Wait, does it mean: Count how many *unique* numbers there are? And Sum of those unique numbers?
		// Example: Input "1, 2, 3" -> Unique: {1, 2, 3}. Count=3. Sum=6. Output: count=3 sum=6.
		// Example: Input "1, 1, 2" -> Unique: {1, 2}. Count=2 (distinct values). Sum=3. Output: count=2 sum=3.
		
	}

	count := len(distinctNumbers) // Number of unique integers
	
	sum := int64(0)
	for n := range distinctNumbers {
		sum += int64(n)
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}

func isInteger(s string) bool {
	if len(s) == 0 {
		return false
	}
	
	firstRune := rune(s[0])
	for i := range s {
		r := rune(s[i])
		if (r >= 'a' && r <= 'z') || (r >= 'A' && r <= 'Z') || (r == '-' || r == '+' || r == '.') { // Allow negative and decimal? The prompt says "integer". Usually implies int. 
			return false
		}
		if !isDigit(r) {
			return false
		}
	}
	
	// Check if it's actually a valid integer format (optional sign, digits only).
	// Since strconv.Atoi handles the parsing and we already checked basic chars above. 
	// But let's rely on strconv to be safe or implement strict check.
	// The prompt says "integer". Let's assume standard int representation.
	
	return true // If passed initial checks, likely valid enough for Atoi which will fail if invalid format like ".5" etc? No, . is not digit. 
}

func isDigit(r rune) bool {
	return r >= '0' && r <= '9'
}
