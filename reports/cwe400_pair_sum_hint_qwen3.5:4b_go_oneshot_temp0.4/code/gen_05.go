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
		if len(text) == 0 {
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

		foundPairs := false
		for i := range seen {
			if target-val == seen[i] {
				foundPairs = true
				break
			}
		}
		if foundPairs {
			total++
		}
		seen[val] = true
		lineNum++
	}

	fmt.Printf("pairs=%d\n", total)
}
