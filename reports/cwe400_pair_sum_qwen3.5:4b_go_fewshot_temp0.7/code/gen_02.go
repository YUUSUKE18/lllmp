package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	if !sc.Scan() || sc.Text() == "" {
		fmt.Println("pairs=0")
		return
	}
	target, _ = fmt.Scanf("%d", &target)

	var sum int64
	pairCount := 0
	lineNum := 0

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		fmt.Sscanf(line, "%d", &sum)
		lineNum++
	}

	for i := int64(0); i < sum; i++ {
		needed := target - i
		j := int64(i + 1)
		for j <= sum; j++ {
			if needed == j {
				pairCount++
				break
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairCount)
}
