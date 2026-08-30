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
	sums := make(map[int]int64)

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}
		n, err := strconv.Atoi(part)
		if err != nil {
			continue
		}
		counts[n]++
		sums[n] += int64(n)
	}

	var maxKey int
	for k := range counts {
		if k > maxKey {
			maxKey = k
		}
	}

	fmt.Printf("count=%d sum=%d\n", counts[maxKey], sums[maxKey])
}
