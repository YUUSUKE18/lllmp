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

	targetSum := int64(0)
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
		targetSum += val
	}

	count := 0
	for i := int64(0); i < targetSum; i++ {
		if i <= target {
			continue
		}
		j := target - i
		if j > 0 && j <= targetSum {
			count++
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
