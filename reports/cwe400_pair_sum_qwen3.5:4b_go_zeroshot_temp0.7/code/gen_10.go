package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil)
	var target int64
	if _, err := fmt.Scanf("%d", &target); err != nil {
		return
	}

	sums := make(map[int64]int)

	scanner := bufio.NewScanner(reader)
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		var val int64
		scanErr := fmt.Sscanf(line, "%d", &val)
		if scanErr != nil {
			continue
		}

		count, exists := sums[val]
		if !exists {
			sums[val] = 0
		}
		sums[val] += count

		target -= val
	}

	fmt.Printf("pairs=%d\n", target)
}
