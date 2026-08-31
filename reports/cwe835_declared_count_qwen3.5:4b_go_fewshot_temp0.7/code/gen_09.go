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
	var count, sum int64
	
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		parts := strings.Fields(line)
		if len(parts) == 0 {
			continue
		}

		numParts := parts[0]
		totalNums, err := strconv.ParseInt(numParts, 10, 64)
		if err != nil {
			continue
		}

		for _, s := range parts[1:] {
			val, err := strconv.ParseInt(s, 10, 64)
			if err != nil {
				continue
			}
			count++
			sum += val
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
