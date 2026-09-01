package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	target, err := strconv.ParseInt(sc.Scan(), 10, 64)
	if err != nil || target < 0 {
		fmt.Println("pairs=0")
		return
	}

	counts := make([]int32, 32) // Map to array for small range optimization if needed, but here use map
	// Actually, since we need to track frequencies and sums, a map is safer.
	// However, the problem says "integers", not necessarily small range.
	// Let's use a map to store frequency of each number encountered so far.
	
	// We need to find pairs (a, b) such that a + b == target.
	// Since order doesn't matter for the set {a,b}, we can assume a <= b.
	// If a != b: pair is (a, b). Count += freq[a] * freq[b].
	// If a == b: pair is (a, a). We need 2 elements from the same value.
	//            Number of ways to choose 2 from n is n*(n-1)/2.
	
	// But wait, the input format says "integers are one per line".
	// We process line by line.
	
	freq := make(map[int64]int64)
	totalPairs := int64(0)

	for i := 1; ; i++ {
		if !sc.Scan() {
			break
		}
		line := sc.Text()
		
		// Skip empty lines or lines that can't be parsed as integers
		if line == "" {
			continue
		}
		
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		// If we have seen the complement before (target - val), add to total
		complement := target - val
		
		// We only need to count pairs where index of first element < index of second element.
		// When processing current element 'val', any previously stored 'complement' 
		// forms a valid pair with the current 'val'.
		if complement > 0 { // Assuming positive integers? Problem says "64bit integer range". 
			// If complement is negative, it's still valid if val is also such that sum is target.
			// The constraint "empty lines ignored" doesn't restrict value sign.
			// However, typical competitive programming problems usually imply positive or non-negative unless stated.
			// Let's assume standard integer arithmetic applies regardless of sign.
			// But wait, if complement == val, we must be careful not to double count within the same step?
			// Actually, iterating sequentially: 
			// When at index j (current val), we look for i < j such that val[i] + val[j] = target.
			// So we add freq[complement] to totalPairs.
			if complement != val {
				totalPairs += freq[complement]
			} else {
				// If complement == val, we need two instances of val so far.
				// Each previous instance forms a pair with current one.
				totalPairs += freq[val]
			}
		}

		freq[val]++
	}

	fmt.Printf("pairs=%d\n", totalPairs)
}
