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
		if len(line) == 0 {
			continue
		}

		parts := []string{}
		if idx, err := fmt.Sscanf(line, "%d", &count); err != nil || idx < 1 {
			continue
		} else if idx > 1 {
			sum += int64(count)
		}

		for i := 0; i < count; i++ {
			if sc.Scan() {
				val, err := strconv.ParseInt(sc.Text(), 10, 64)
				if err != nil {
					continue
				}
				sum += val
			} else if err != nil {
				break
			}
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
