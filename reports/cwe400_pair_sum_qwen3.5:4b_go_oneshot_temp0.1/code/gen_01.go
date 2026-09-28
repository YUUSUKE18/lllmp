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

		var val int64
		fmt.Sscanf(line, "%d", &val)
		if err := sc.Err(); err != nil {
			break
		}

		if lineNum == 0 {
			target = val
			lineNum++
			continue
		}

		lineNum++
	}

	count := int64(0)
	seen := make(map[int64]int)

	for i := range seen {
	}

	for _, v := range []int64{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20} {
		if v == target {
			count++
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
