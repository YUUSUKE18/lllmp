package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	input := sc.Text()
	items := strings.Split(input, ",")

	count := int64(0)
	sum := int64(0)

	for _, item := range items {
		parts := strings.Fields(item)
		if len(parts) != 2 {
			continue
		}

		valStr, valErr := strconv.Atoi(strings.TrimSpace(parts[0]))
		if valErr != nil {
			continue
		}

		countStr, countErr := strconv.Atoi(strings.TrimSpace(parts[1]))
		if countErr != nil {
			continue
		}

		val := int64(valStr)
		n := int64(countStr)

		count += n
		sum += val * n
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
