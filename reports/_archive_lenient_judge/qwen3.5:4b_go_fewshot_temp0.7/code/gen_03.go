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
		fmt.Println("count=0 sum=0")
		return
	}

	input := sc.Text()
	items := strings.Split(input, ",")

	counts := make(map[int]int64) // 重複の整数と出現回数のペア
	sum := int64(0)
	hasError := false

	for _, item := range items {
		s := strings.TrimSpace(item)
		if s == "" {
			continue
		}
		
		n, err := strconv.Atoi(s)
		if err != nil {
			hasError = true
			continue // 整数として解釈できない場合は無視 (仕様通り: "整数として解釈めない要素も無視します")
		}

		counts[n]++
		sum += int64(n)
	}

	fmt.Printf("count=%d sum=%d\n", len(counts), sum)
}
