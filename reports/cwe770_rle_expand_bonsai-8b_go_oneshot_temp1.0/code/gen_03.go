package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	var count, sum int
	var currentVal, currentCount int

	for {
		if !sc.Scan() {
			break
		}

		parts := strings.Fields(sc.Text())
		if len(parts) < 2 {
			continue
		}

		valueStr, countStr := parts[0], parts[1]
		if !strconv.Atoi(countStr) || count <= 0 {
			continue
		}

		n, err := strconv.Atoi(valueStr)
		if err != nil {
			continue
		}

		if currentVal != n {
			if currentCount > 0 {
				sum += currentVal * currentCount
			}
			currentVal = n
			currentCount = 0
		}
		currentCount += count

		if currentCount > 0 {
			sum += currentVal * currentCount
		}
	}

	fmt.Printf("count=%d sum=%d\n", currentCount, sum)
}
