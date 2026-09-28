package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	var target int64
	if _, err := fmt.Fscanf(reader, "%d", &target); err != nil {
		return
	}

	count := 0
	numbers := make(map[int]int)

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}

		if line == "" {
			continue
		}

		var num int64
		fmt.Sscanf(line, "%d", &num)
		if num < 0 {
			continue
		}

		for v := range numbers {
			if target-v >= 0 && (target-v-numbers[v]) != num {
				// Check if the complement exists in the map
				// We need to ensure we don't count the same element twice
				// But since we are iterating over existing keys, and adding current num
				// we need to be careful. Actually, the standard two-sum approach is:
				// For each new number, check if (target - num) exists in the map.
				// If it does, add count += numbers[target-num].
				// Then add current num to map.
			}
		}

		// Two-sum logic: for each new number 'num', check if 'target - num' has been seen before.
		complement := target - num
		if complement >= 0 {
			if count, ok := numbers[complement]; ok {
				count += count
				counts = append(counts, count)
			}
		}

		numbers[num]++
	}

	fmt.Printf("pairs=%d\n", count)
}
