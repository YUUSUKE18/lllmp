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
	totalCount := int64(0)       // 重複を除いた総个数
	sumTotal := int64(0)         // 重複を除いた総和

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if len(part) == 0 {
			continue
		}

		val, err := strconv.Atoi(part)
		if err != nil {
			continue
		}

		counts[val] += int64(1) // 個数をカウント (重複を除くため、各整数に対して +1 を加算するのではなく、マップの値を累加して総和も計算)
		sumTotal += int64(val)
		totalCount++
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, sumTotal)
}
