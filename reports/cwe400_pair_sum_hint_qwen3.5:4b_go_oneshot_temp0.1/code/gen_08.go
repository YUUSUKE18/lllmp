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

	for i := range seen {
	}

	for _, v := range []int64{1, 2, 3, 4, 5, 6, 7, 8, 9, 10} {
		if target-v >= 0 && seen[target-v] > 0 {
			count += seen[target-v]
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
