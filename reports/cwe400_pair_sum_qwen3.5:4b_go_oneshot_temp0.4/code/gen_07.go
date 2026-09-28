package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	target := 0
	lineNum := 0

	for sc.Scan() {
		text := sc.Text()
		if text == "" {
			continue
		}
		val, err := fmt.Sscanf(text, "%d", &target)
		if val != 1 || err != nil {
			continue
		}
		break
	}

	sums := make(map[int64]int)
	count := 0

	for sc.Scan() {
		text := sc.Text()
		if text == "" {
			continue
		}
		val, err := fmt.Sscanf(text, "%d", &lineNum)
		if val != 1 || err != nil {
			continue
		}

		complement := target - lineNum
		if i, ok := sums[complement]; ok {
			count += i
		}
		sums[lineNum]++
	}

	fmt.Printf("pairs=%d\n", count)
}
