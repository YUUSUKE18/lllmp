package main

import (
	"bufio"
	"fmt"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var firstLine string
	var count, sum int64
	rowIndex := 0

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		rowIndex++
		if rowIndex == 1 {
			n, err := strconv.Atoi(line)
			if err != nil {
				continue
			}
			expectedCount := int64(n)
			break
		}

		var val int64
		fmt.Sscanf(line, "%d", &val)
		count++
		sum += val
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
