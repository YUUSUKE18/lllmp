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
	if !sc.Scan() {
		return
	}

	line := sc.Text()
	parts := strings.Split(line, ",")

	counts := make(map[int]int64)
	sumTotal := int64(0)

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if len(part) == 0 {
			continue
		}

		val, err := strconv.Atoi(part)
		if err != nil {
			continue
		}

		counts[val]++
		sumTotal += int64(val)
	}

	fmt.Printf("count=%d sum=%d\n", len(counts), sumTotal)
}
