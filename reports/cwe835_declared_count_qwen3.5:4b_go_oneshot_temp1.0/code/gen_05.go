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
	sum := int64(0)
	countLines := -1

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		idx := 0
		err := fmt.Sscanf(line, "%d", &countLines)
		if err != nil || countLines <= 0 {
			continue
		}

		rest := strings.TrimPrefix(line, fmt.Sprintf("%d\n", countLines))
		nums := strings.Fields(rest)

		for _, n := range nums {
			v, err := strconv.ParseInt(n, 10, 64)
			if err != nil {
				continue
			}
			sum += v
			count++
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
