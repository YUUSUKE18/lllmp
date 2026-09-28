package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var count int
	var sum int64

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		parts := []string{line}
		count, err := strconv.Atoi(parts[0])
		if err != nil {
			continue
		}

		sum = 0
		for i := 1; i < len(parts); i++ {
			val, err := strconv.ParseInt(parts[i], 10, 64)
			if err != nil {
				continue
			}
			sum += val
		}

		fmt.Printf("count=%d sum=%d\n", count, sum)
		return
	}
}
