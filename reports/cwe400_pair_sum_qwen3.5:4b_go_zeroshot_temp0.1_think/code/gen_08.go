package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var target int64
	foundTarget := false

	countMap := make(map[int64]int64)
	pairs := int64(0)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		if !foundTarget {
			target = val
			foundTarget = true
		} else {
			needed := target - val
			if count, ok := countMap[needed]; ok {
				pairs += count
			}
			if _, exists := countMap[val]; !exists {
				countMap[val] = 1
			} else {
				countMap[val]++
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
