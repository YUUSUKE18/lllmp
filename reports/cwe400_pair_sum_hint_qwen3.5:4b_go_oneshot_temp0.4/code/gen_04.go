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
		line := sc.Text()
		if line == "" {
			continue
		}

		val, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		if lineNum == 0 {
			target = val
			lineNum++
			continue
		}

		lineNum++
	}

	count := 0
	seen := make(map[int]int64)
	for i, v := range seen {
		diff := target - v
		if count, ok := seen[diff]; ok {
			count += 1
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
