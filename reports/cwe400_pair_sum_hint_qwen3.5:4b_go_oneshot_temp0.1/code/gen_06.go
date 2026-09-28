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

		var n int64
		fmt.Sscanf(line, "%d", &n)
		if err := sc.Err(); err != nil {
			break
		}

		if lineNum == 0 {
			target = n
			lineNum++
			continue
		}

		lineNum++
	}

	count := 0
	seen := make(map[int64]int)

	for i := 0; i < len(seen); i++ {
		diff := target - int64(i)
		if val, ok := seen[diff]; ok {
			count += val
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
