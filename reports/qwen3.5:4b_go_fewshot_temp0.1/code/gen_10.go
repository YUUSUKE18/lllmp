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
	sum := int64(0)

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		val, err := strconv.Atoi(part)
		if err != nil {
			continue
		}

		counts[val]++
		sum += int64(val)
	}

	fmt.Printf("count=%d sum=%d\n", len(counts), sum)
}
