package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	target := int64(0)
	lineNum := 0

	for scanner.Scan() {
		text := scanner.Text()
		if text == "" {
			continue
		}

		if lineNum == 0 {
			val, err := strconv.ParseInt(text, 10, 64)
			if err != nil {
				continue
			}
			target = val
			lineNum++
			continue
		}

		if lineNum == 1 {
			val, err := strconv.ParseInt(text, 10, 64)
			if err != nil {
				continue
			}
			counts[val]++
			lineNum++
			continue
		}

		lineNum++
	}

	if counts == nil || len(counts) < 2 {
		fmt.Printf("pairs=%d\n", 0)
		return
	}

	var pairs int64
	for v1, c1 := range counts {
		diff := target - v1
		c2 := counts[diff]
		if diff >= v1 {
			if diff > v1 {
				pairs += c1 * c2
			} else if diff == v1 {
				pairs += c1 * (c1 - 1) / 2
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
