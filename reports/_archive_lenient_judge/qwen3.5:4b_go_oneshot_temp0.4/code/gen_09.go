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
	pairs := make(map[int]int64) // 重複を除いた整数の個数と合計を保持するマップ

	for _, s := range strings.Split(input, ",") {
		s = strings.TrimSpace(s)
		if len(s) == 0 || !strings.ContainsAny(s, "-0123456789.") { // 簡易的な整数チェック（負の数を考慮）
			continue
		}

		n, err := strconv.Atoi(strings.TrimFunc(s, func(r rune) bool { return r <= ' ' }) ) 
		if err != nil || n == "" {
			continue
		}

		counts[n]++ // 個数のカウント（重複を除くため、まずは一度だけカウント）
		sums[n] += int64(n) // 合計の計算
	}

	fmt.Printf("count=%d sum=%d\n", len(counts), sums[0]) 
}
