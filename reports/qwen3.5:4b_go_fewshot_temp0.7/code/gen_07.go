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

	input := sc.Text()
	count := 0
	sum := int64(0)
	seen := make(map[int]bool)

	parts := strings.Split(input, ",")
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		n, err := strconv.Atoi(part)
		if err != nil {
			continue
		}

		if !seen[n] {
			seen[n] = true
			count++
		}
		sum += int64(n)
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
