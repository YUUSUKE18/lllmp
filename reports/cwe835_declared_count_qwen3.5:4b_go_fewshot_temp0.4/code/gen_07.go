package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	count := 0
	sum := int64(0)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		parts := []string{}
		err := fmt.Sscanf(line, "%d", &parts[0])
		if err != nil || len(parts) < 1 {
			continue
		}

		n, err := strconv.ParseInt(parts[0], 10, 64)
		if err != nil {
			continue
		}

		for i := 1; i < n; i++ {
			valStr := ""
			err = fmt.Sscanf(line, "%d", &valStr)
			if err != nil || valStr == "" {
				break
			}

			val, err := strconv.ParseInt(valStr, 10, 64)
			if err != nil {
				continue
			}

			count++
			sum += val
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
