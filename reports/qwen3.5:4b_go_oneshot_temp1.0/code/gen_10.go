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
	parts := strings.Split(input, ",")

	counts := make(map[int]int)
	totalSum := 0

	for _, part := range parts {
		trimmed := strings.TrimSpace(part)
		if trimmed == "" {
			continue
		}

		n, err := strconv.Atoi(trimmed)
		if err != nil {
			continue
		}

		counts[n]++
		totalSum += n
	}

	fmt.Printf("count=%d sum=%d\n", len(counts), totalSum)
}
