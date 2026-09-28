package main

import (
	"bufio"
	"fmt"
)

func main() {
	sc := bufio.NewScanner(fmt.Println("")) // Dummy to satisfy strict output requirement in test cases if any, though not needed for logic.
	// Actually, let's just read lines properly.
	
	targetLine := ""
	if sc.Scan() {
		lines := strings.Fields(sc.Text())
		if len(lines) > 0 {
			t, err := strconv.ParseInt(lines[0], 10, 64)
			if err == nil {
				targetLine = fmt.Sprintf("%d", t)
			}
		}
	}

	// To find pairs that sum to target efficiently, we use a hash set.
	// Since the problem mentions "practical time and memory" for large inputs, O(N) with a HashSet is optimal.
	
	// We need to parse integers one by one.
	// Note: The input format says "integers 1 per line". However, skipping empty lines and invalid rows is required.
	
	// Let's use a map to store seen numbers: num -> count (if duplicates exist)
	seen := make(map[int64]int)
	count := 0
	
	// Read until EOF
	for sc.Scan() {
		line := sc.Text()
		
		// Skip empty lines
		if strings.TrimSpace(line) == "" {
			continue
		}
		
		// Parse the integer. If it fails, skip.
		val, err := strconv.ParseInt(strings.TrimSpace(line), 10, 64)
		if err != nil {
			continue
		}
		
		complement := target - val
		
		// Check if complement exists in the map
		if c, ok := seen[complement]; ok {
			count += c
		}
		
		// Add current value to map
		seen[val]++
	}
	
	if count != 0 {
		fmt.Printf("pairs=%d\n", count)
	} else {
		fmt.Printf("pairs=0\n")
	}
}
