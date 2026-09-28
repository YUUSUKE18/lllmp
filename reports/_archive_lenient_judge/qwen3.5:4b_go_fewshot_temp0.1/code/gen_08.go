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
	sumTotal := int64(0)         // 全体の合計

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if len(part) == 0 {
			continue
		}

		val, err := strconv.Atoi(part)
		if err != nil {
			continue
		}

		counts[val]++ // 個数をカウント (重複を除くため、同じ値は追加されるが、問題文の「重複を除いた整数」について個数と合計を求めます -> これは各一意な整数に対してその出現回数和計和を求めるのか？例：1,2,3,4 の場合は count=4 sum=10。もし 1,1,2 の場合、unique integers は {1,2} で count=2 (個数) と sum=3?
		sumTotal += int64(val) // 合計に追加

		// 問題文の解釈: "重複を除いた整数"について -> これは一意な要素集合に対してその出現回数をカウントし、それらの和を計算する。
	}

	count := len(counts)
	fmt.Printf("count=%d sum=%d\n", count, sumTotal)
}
