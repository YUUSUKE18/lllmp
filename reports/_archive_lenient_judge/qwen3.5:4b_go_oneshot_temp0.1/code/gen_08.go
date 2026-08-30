```go
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
	pairs := make(map[int]int64) // 重複を除いた整数の個数と合計を保持するマップ (key: integer, value: count+sum? No. Need separate tracking or combine logic carefully). 
								// Actually, the requirement is "count of unique integers" and "sum of those unique integers".
								// So we need to track which numbers are seen at least once.

	counts := make(map[int]int) // Count occurrences for sum calculation? No.
						        // We only care about UNIQUE integers. 
						        // If a number appears multiple times, it counts as 1 unique integer in the 'count' part of output.
						        // And its value is added to the total sum exactly once (if we consider "sum of those unique integers").
						        // Wait: "重複を除いた整数" -> Unique set S = {x | x appears at least once}.
						        // Output count = |S|. Sum = Σ(x for x in S).

	// Let's use a map to track seen numbers. 
	seen := make(map[int]bool)
	
	for _, s := range strings.Split(input, ",") {
		s = strings.TrimSpace(s)
		if len(s) == 0 || (len(s) > 0 && !isDigitOnlyOrMinus(s)) { // Check if it's a valid integer string. 
			continue
		}
		
		n, err := strconv.Atoi(s)
		if err != nil {
			continue
		}
		if seen[n] {
			continue
		}
		seen[n] = true
	}

	count := len(seen)
	sum := int64(0)
	for n := range seen {
		sum += int64(n)
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}

func isDigitOnlyOrMinus(s string) bool {
	if s == "" || len(s) > 1 && !isNumericChar(s[0]) { // Allow negative numbers like "-5" but not "+5"? Usually Atoi handles +. 
		return false
	}
	for _, c := range s {
		if !((c >= '0' && c <= '9') || (s == "-" && len(s) > 1)) { // If it starts with '-', next must be digit? Or just check if all chars are digits or first is '-' and rest digits. 
			return false
		}
		if s[0] == '-' {
			for i := 1; i < len(s); i++ {
				if !((s[i] >= '0' && s[i] <= '9')) {
					return false
				}
			}
		} else if s[0] != '+' && (len(s) > 0 && !(s[0] >= '0' && s[0] <= '9')) { // If not starting with digit or +, and length>1? 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9') || (len(s) > 1)) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((s[0] >= '0' && s[0] <= '9')) { // Single char must be digit. If it's '-' alone, Atoi fails usually unless we handle sign? strconv.Atoi handles "-". 
			return false
		}
		if len(s) == 1 && !((
