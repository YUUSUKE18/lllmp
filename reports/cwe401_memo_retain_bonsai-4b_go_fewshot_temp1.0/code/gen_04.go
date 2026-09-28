package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int]int)
var total = 0

func main() {
	sc := bufio.NewScanner(os.Stdin)
	for {
		line := ""
		n, err := sc.Scan()
		if err != nil {
			break
		}
		line = line + "\n" + n + "\n"
		if err != nil {
			break
		}
		if strings.TrimSpace(line) == "" {
			continue
		}
		if s, err := strconv.Atoi(line); err != nil {
			continue
		}
		if memo[s] != 0 {
			continue
		}
		// 値をメモ化
		memo[s] = 0
		// nが1のときの手数は0
		if s == "1" {
			total += 0
			continue
		}
		// 值は1で始まり、nは1時まで処理
		turns := 0
		current := s
		for current != "1" {
			// nを1に変換するため、2n+1に近い値
			next := int(current * 1.5)
			// 値が整数で、次回の値を整数で計算
			if next == 0 {
				next = 1
			}
			current = strconv.Itoa(next)
			turns++
		}
		// 1に到達したときに終了
		// 1と2の処理は同じ（1→1は0、2は3*2+1=5）
		// 複数の値が同じなら、複数の処理
		// 然て、最終的な値をメモ化
		if current == "1" {
			total += turns
		}
		// nが1の場合は0
		if current == "1" {
			break
		}
		// 1で到達した値
		// 1から n/2で1を渡る
		// 隊数は n/2
		// 奇数は 3n+1 → 3(1)+1=4
		// 複数のクエリは並列処理で扱い
		// なぜなら、反复処理
		// 然て、nは1で終了
		// メモを更新
		total += turns
	}
	fmt.Printf("total=%d\n", total)
}
