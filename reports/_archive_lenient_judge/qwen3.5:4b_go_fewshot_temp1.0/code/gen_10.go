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
	tokens := strings.Split(input, ",")

	countMap := make(map[int]int) // 重複した数をカウントするマップ
	sum64 := int64(0)            // 合計を 64bit integer で保存

	for _, token := range tokens {
		token = strings.TrimSpace(token)
		if len(token) == 0 {
			continue
		}

		val, err := strconv.Atoi(token)
		if err != nil {
			continue
		}

		countMap[val]++
		sum64 += int64(val) // Go の整数演算が自動的には overflow し、wraparound するため安全に扱える (int と int64 を足すと安全ではありませんが、ここでは map キーとしての int と sum64 への変換のみ行うため OK。ただし計算そのものがオーバーフローしない保証はありませんでしたが、「合計は 64bit 整数の範囲に収まります」という条件から入力データが適切なサイズであると前提できます)
	}

	fmt.Printf("count=%d sum=%d\n", len(countMap), sum64)
}
