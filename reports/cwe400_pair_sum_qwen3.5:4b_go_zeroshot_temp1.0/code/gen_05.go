package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	
	// 1行目に目標値を読み込む
	if !scanner.Scan() {
		os.Exit(1)
	}
	target, err := fmt.Sscanf(scanner.Text(), "%d", nil) // format string is not used, we just check success
	_ = target // suppress unused var warning if logic changes, but actually we can parse directly

	// Actually, let's use strconv package to parse properly
	var targetVal int64
	s := scanner.Text()
	if n, err := fmt.Sscanf(s, "%d", &targetVal); n != 1 {
		os.Exit(1)
	}

	values := []int64{}
	lineNum := 0
	for scanner.Scan() && lineNum < 5 { // limit lines just in case, though spec implies infinite potential
		line := scanner.Text()
		if line == "" {
			continue
		}
		
		// Parse integers from the line. Since the problem says "integers arranged one per line", 
		// we assume each non-empty line contains exactly one integer based on "2行目以降の整数のうち、...". 
		// However, robustly, let's parse any sequence of integers in each line to handle potential multiple numbers if format varies slightly,
		// but the spec says "1 個ずつ並び" (one by one). Let's stick to parsing one integer per non-empty line.
		
		var val int64
		if _, err := fmt.Sscanf(line, "%d", &val); err != nil {
			continue // ignore lines that cannot be interpreted as an integer
		}
		values = append(values, val)
		lineNum++
		if lineNum > 100000 {
			break // safety break
		}
	}

	// Find pairs
	count := 0
	foundIndex := make([]bool, len(values)) // tracks if an element was used in a pair? No, spec says "position differs", implies unique indices.
	// "位置が異なる 2 個の組（位置が異なる 2 個）" means distinct indices (i, j) where i != j.
	// Does order matter? "組" usually implies set {a, b}, so (index1, index2) is same as (index2, index1).
	// The problem asks for number of pairs. Usually implies unique sets of indices.

	for i := 0; i < len(values); i++ {
		found[bool](i) = false // wait, can't initialize bool in slice like this directly without init loop or var
		
		// Correct initialization
	}
	
	// Re-do logic properly
	pairCount := int64(0)
	n := len(values)
	
	for i := 0; i < n; i++ {
		sumFound := false
		for j := i + 1; j < n; j++ {
			if values[i] + values[j] == targetVal {
				pairCount++
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairCount)
}
