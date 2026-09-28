package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	lineNum := 0
	
	if sc.Scan() {
		s := strings.TrimSpace(sc.Text())
		if s != "" {
			target, _ = strconv.ParseInt(s, 10, 64)
		} else {
			target = 0
		}
	}

	sums := make(map[int64]int64) // Sum -> Count of pairs with that sum
	var firstSum int64 = 0
	
	for sc.Scan() {
		line := sc.Text()
		// Skip empty lines and invalid lines
		if strings.TrimSpace(line) == "" {
			continue
		}
		
		val, err := strconv.ParseInt(strings.TrimSpace(line), 10, 64)
		if err != nil {
			continue
		}
		
		// Calculate remaining value needed to reach target with current val
		needed := target - val
		
		// Check if we've seen 'needed' before
		counts := sums[needed]
		if counts > 0 {
			firstSum = counts // Update first valid sum found
			// We need to output pairs=<count>, so accumulate the count of pairs? 
			// Wait, the problem asks for number of pairs.
			// Let's re-read carefully: "足して目標値になる 2 個の組の個数" -> Number of pairs.
			// If we use a frequency map, we can compute total pairs at the end or online.
			// But wait, if I find 'needed' now, it forms a pair (val, needed).
			// However, later if we see another instance of 'needed', it also pairs with 'val'.
			// And if we see another instance of 'val', it also pairs.
			// The standard two-sum counting approach is:
			// For each number x, count += frequency[target - x].
			// Then add current x to frequency map.
			
			// Actually, let's do it online.
		}
		
		if needed != 0 { // Avoid pairing with itself if target == 2*x and we have only one such element so far? 
			// Wait, "位置が異なる 2 個" means distinct indices.
			// If I have seen 'needed' once, and now I see 'val' which is needed, that's one pair.
			// Then if I see another 'val', does it pair with the original 'needed'? Yes.
			// So for each new x: total_pairs += frequency[target - x]
			// This correctly counts all pairs (i, j) where i < j and a[i] + a[j] = target.
			
			totalPairs += sums[needed]
		} else if needed == 0 {
			// If needed is 0, we need two numbers that sum to 0 (x + y = 0 => x = -y).
			// The logic above handles it: frequency[0] gives count of zeros seen so far.
			// If I see a zero again, pairs += frequency[0]. Correct.
			totalPairs += sums[needed] // This will add previous count of 0s
		}
		
		sums[val]++
	}

	fmt.Printf("pairs=%d\n", totalPairs)
}
