package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	target := 0
	lineNum := 0
	values := make([]int64, 0)

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
		} else {
			values = append(values, val)
		}
		lineNum++
	}

	count := int64(0)
	n := len(values)
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if values[i]+values[j] == target {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
