package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	memoizedValues := make(map[int64]int64)

	var total int64
	scanner := bufio.NewScanner(reader)

	for scanner.Scan() {
		line, _ := scanner.ReadBytes('\n')
		if len(line) == 0 {
			continue
		}

		var n int64
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}

		if n == 1 {
			total += 0
		} else if existingValue, exists := memoizedValues[n]; exists {
			total += existingValue
		} else {
			steps := int64(0)
			currentN := n
			for currentN != 1 {
				if currentN%2 == 0 {
					currentN = currentN / 2
				} else {
					currentN = 3*currentN + 1
				}
				steps++
				if existingValue, exists := memoizedValues[currentN]; exists {
					memoizedValues[n] = steps - int64(len(memoizedValues) - 1)
					break
				} else {
					memoizedValues[currentN] = steps
					currentN = currentN / 2
				}
			}
			total += memoizedValues[n]
		}
	}

	fmt.Printf("total=%d\n", total)
}
