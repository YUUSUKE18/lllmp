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

		if lineNum == 0 {
			n, err := strconv.ParseInt(text, 10, 64)
			if err != nil {
				continue
			}
			target = n
			lineNum++
			continue
		}

		val, err := strconv.ParseInt(text, 10, 64)
		if err != nil {
			continue
		}

		lineNum++
	}

	fmt.Printf("pairs=%d\n", countPairs(target))
}

func countPairs(target int64) int64 {
	count := int64(0)
	seen := make(map[int64]int64)

	for i := 0; ; i++ {
		sc := bufio.NewScanner(os.Stdin)
		if !sc.Scan() {
			break
		}
		text := sc.Text()
		if text == "" {
			continue
		}

		val, err := strconv.ParseInt(text, 10, 64)
		if err != nil {
			continue
		}

		complement := target - val
		if c, ok := seen[complement]; ok {
			count += c
		}
		seen[val]++
	}

	return count
}
