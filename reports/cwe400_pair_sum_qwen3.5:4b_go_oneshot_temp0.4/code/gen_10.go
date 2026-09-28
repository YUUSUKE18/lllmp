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
		} else {
			val, err := strconv.ParseInt(text, 10, 64)
			if err != nil {
				continue
			}
			lineNum++
		}
	}

	count := 0
	values := []int64{}

	for i := 0; i < len(values); i++ {
		for j := i + 1; j < len(values); j++ {
			if values[i]+values[j] == target {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
