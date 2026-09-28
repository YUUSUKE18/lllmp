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

		count := 0
		for i := range seen {
			if target-val >= 0 && seen[target-val] > 0 {
				count++
			}
		}
		fmt.Printf("pairs=%d\n", count)
		break
	}
}
