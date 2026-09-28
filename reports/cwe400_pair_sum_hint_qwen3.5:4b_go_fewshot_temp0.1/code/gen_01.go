package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	if !sc.Scan() {
		return
	}
	fmt.Sscanf(sc.Text(), "%d", &target)

	targetSum := make(map[int64]int)
	count := 0
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		var val int64
		fmt.Sscanf(line, "%d", &val)
		if err := sc.Err(); err != nil {
			break
		}

		diff := target - val
		if c, ok := targetSum[diff]; ok {
			count += c
		}
		targetSum[val]++
	}

	fmt.Printf("pairs=%d\n", count)
}
