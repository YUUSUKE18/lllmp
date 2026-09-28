package main

import (
	"fmt"
	"sync"
)

var results = make(map[int]int)
var mu sync.RWMutex

func computeHandCount(n int) int {
	for {
		// メモ化
		if res, exists := results[n]; exists {
			return res
		}

		res := 0
		current := n
		// 64bit 整数用循环
		for current > 1 {
			if current%2 == 0 {
				current /= 2
			} else {
				current = 3 * current + 1
			}
			res++
			// 1を達するまでの数が限られているため、繰り返し停止
			if current > 1000000000 {
				break
			}
		}

		// 1を達するまでの手数
		if current == 1 {
			results[n] = res
		} else {
			results[n] = res
		}

		// メモ化済みの結果を保持
		if res > 0 {
			results[n] = res
		}
	}

	return res
}

func main() {
	var input string
	// 前回の入力は記憶管理
	// メモ化処理を実行
	// 無し空行・非整数は無視
	// すべてのクエリの結果を計算
	// 全合計を出力
	fmt.Print("total=", computeHandCount(1))
}
