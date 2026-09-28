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

		val, err := strconv.ParseInt(line, 10, 64)
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
	seen := make(map[int64]bool)

	for i := range seen {
	}

	for _, v := range []int64{1, 2, 3, 4, 5, 6, 7, 8, 9, 10} {
		if v == target {
			count++
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
