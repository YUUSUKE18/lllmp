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
	parts := strings.Split(input, ",")

	counts := make(map[int]int64) // 重複をカウントするために使用 (int -> int64 count)
	sum := int64(0)

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if len(part) == 0 || !isInt(part) {
			continue
		}

		n, err := strconv.Atoi(part)
		if err != nil {
			continue
		}

		counts[n]++
		sum += int64(n)
	}

	fmt.Printf("count=%d sum=%d\n", len(counts), sum)
}

func isInt(s string) bool {
	for _, r := range s {
		if !(r >= '0' && r <= '9') {
			return false
		}
	}
	return true
}
