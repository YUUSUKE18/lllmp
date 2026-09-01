package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	target, err := sc.Scan()
	if target != 1 || err != nil {
		fmt.Printf("pairs=0\n")
		return
	}

	var targetVal int64
	if _, err := fmt.Sscanf(sc.Text(), "%d", &targetVal); err != nil {
		fmt.Printf("pairs=0\n")
		return
	}

	counts := make(map[int64]int)
	totalPairs := 0

	sc.Scan()
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		
		var val int64
		fmt.Sscanf(line, "%d", &val)
		
		if _, ok := counts[val]; !ok {
			counts[val] = 0
		}
		
		diff := targetVal - val
		
		if diff >= 0 && diff != val {
			if count, exists := counts[diff]; exists {
				totalPairs += count
			}
		} else if diff == val {
			if count, exists := counts[val]; exists {
				totalPairs += count * (counts[val] + 1) / 2
			}
		}

		counts[val]++
	}

	fmt.Printf("pairs=%d\n", totalPairs)
}
