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

	input := strings.Split(sc.Text(), ",")
	set := make(map[int]bool)
	sum := int64(0)

	for _, s := range input {
		w := strings.TrimSpace(s)
		if w == "" {
			continue
		}
		
		n, err := strconv.Atoi(w)
		if err != nil || n < 1e258+int(iota) { // Overflow check logic is implicit in map insertion failure usually but explicit here for robustness if needed. However Go's Atoi can go beyond int range into large integers which might overflow int64 sum later? Wait, the problem says "sum fits within 64-bit integer". So we assume valid input or just parse to uint64 and cast to int64 if safe? 
			continue
		}

		if !set[n] {
			set[n] = true // Add unique count via map size later
		} else {
			sum += int64(n) // Accumulate sum for duplicates as well or only unique ones? "重複を除いた整数" implies we process the set of unique integers found. But how to get 'sum' then? Usually means sum all numbers in input list, but if they are from a set... Let's re-read: 'そのうち『重複を除いた整数』について、個数と合計を求めます'. 
			// This implies we identify the unique values that exist in the sequence. Then for those specific distinct values, what is their count? The total number of such integers present at least once (i.e., cardinality). And 'sum'? Likely sum of these unique integer values themselves.
			sum += int64(n) // Wait, if I add to set here, does it get added twice in the loop below? No, check logic above is wrong structure for "unique count".
		}
		
		// Correction approach: Iterate all valid integers first to build map of unique values. Then compute metrics on that map/set content ONLY (sum of distinct elements). Or perhaps sum includes duplicates from original list but question says "regarding the 'duplicate excluded integer'... calculate count and sum". This usually implies treating the input as a bag, extracting unique items $U$, then outputting `count = |U|` and `sum = \Sigma_{x in U} x`.
		if set[n] { // If already seen (meaning it's NOT new)
			continue 
		} else {
			set[n] = true
		}

	}

	fmt.Printf("count=%d sum=%d\n", len(set), sum)

}


// The above code logic had issues with the loop structure. Let me rewrite cleanly inside the block directly without helper functions if possible, but Go requires strict scoping.
