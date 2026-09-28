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
		fmt.Printf("count=0 sum=0\n")
		return
	}

	input := sc.Text()
	counts := make(map[int]int64) // 重複を除いた整数の出現回数をカウント (map のキーは一意な整数、値はその個数)
	sum := int64(0)

	for _, w := range strings.Split(input, ",") {
		w = strings.TrimSpace(w)
		if len(w) == 0 {
			continue // 空要素は無視
		}

		n, err := strconv.Atoi(w)
		if err != nil {
			continue // 整数として解釈できない場合は無視
		}

		counts[n]++
		sum += int64(n)
	}

	fmt.Printf("count=%d sum=%d\n", len(counts), sum)
}
