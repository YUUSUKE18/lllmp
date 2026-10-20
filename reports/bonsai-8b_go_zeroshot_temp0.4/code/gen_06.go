package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	// stdinから入力取得
	input := strings.NewReader(os.Stdin)
	// 全くの行を読み取って、空白と空格を除き、分割
	line := input.ReadString('\n')
	// パースして整数リストを構築
	var nums []int
	for _, s := range line {
		if s == ',' {
			continue
		}
		// 空格や空白を除き、整数として解析
		parsed := strings.TrimSpace(s)
		if num, err := strconv.Atoi(parsed); err == nil {
			nums = append(nums, num)
		}
	}
	// 重複を除いた整数の個数と合計を計算
	unique := make(map[int]bool)
	count := 0
	sum := 0
	for _, num := range nums {
		if !unique[num] {
			unique[num] = true
			count++
			sum += num
		}
	}
	// 出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
