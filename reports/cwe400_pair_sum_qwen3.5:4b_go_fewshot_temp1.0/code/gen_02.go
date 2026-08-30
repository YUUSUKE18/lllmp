package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	lineIdx := 0

	for sc.Scan() {
		line := sc.Text()
		if len(line) == 0 {
			continue
		}

		if lineIdx == 0 {
			n, err := strconv.ParseInt(line, 10, 64)
			if err != nil {
				break
			}
			target = n
		} else {
			v, err := strconv.ParseInt(line, 10, 64)
			if err != nil {
				continue
			}
			numbers = append(numbers, v)
		}

		lineIdx++
	}

	pairsCount := int64(0)
	for i := 0; i < len(numbers)-1; i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == target {
				pairsCount++
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairsCount)
}
