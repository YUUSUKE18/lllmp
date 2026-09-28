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
	counts := make(map[int]int64) // 重複を除いた整数の個数と合計を保持するマップ (値: int -> count + sum)
	sumTotal := int64(0)         // 全体の合計

	for _, part := range parts {
		w := strings.TrimSpace(part)
		if w == "" {
			continue
		}
		
		n, err := strconv.Atoi(w)
		if err != nil {
			continue
		}

		counts[n]++ // 個数をカウント (重複を除くため、同じ数だけ増やす)
		sumTotal += int64(n)
	}

	fmt.Printf("count=%d sum=%d\n", len(counts), sumTotal)
}
