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
	counts := make(map[int]int64) // 重複を除いた整数の出現回数をカウント (int -> count, int64 sum)
	sum := int64(0)

	parts := strings.Split(input, ",")
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if len(part) == 0 {
			continue
		}

		n, err := strconv.Atoi(part)
		if err != nil {
			continue // 整数として解釈できない要素は無視
		}

		counts[n]++
		sum += int64(n)
	}

	fmt.Printf("count=%d sum=%d\n", len(counts), sum)
}
