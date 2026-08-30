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
	counts := make(map[int]int64) // 重複を除いた整数の個数と合計を保持するマップ (値: int -> count+sum)
	totalCount := int64(0)
	sumTotal := int64(0)

	for _, part := range parts {
		w := strings.TrimSpace(part)
		if w == "" {
			continue
		}
		
		n, err := strconv.Atoi(w)
		if err != nil {
			continue
		}

		counts[n]++
		sumTotal += int64(n)
		totalCount++
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, sumTotal)
}
