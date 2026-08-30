package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	var pairs int64
	foundPairs := make([]int64, 0)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		val, err := fmt.Sscanf(line, "%d", &target)
		if val != 1 || err != nil {
			continue
		}
		foundPairs = append(foundPairs, target)
		target = 0

		val, _ = fmt.Sscanf(line, "%d", &target)
		if val == 1 {
			foundPairs = append(foundPairs, target)
		}

		for i := range foundPairs {
			if foundPairs[i] == target {
				pairs++
				foundPairs = append(foundPairs, target)
				break
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
