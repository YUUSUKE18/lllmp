package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力からすべての行を読み込む
	input, err := os.ReadFile(0)
	if err != nil {
		// 入力がない場合は終了
		return
	}
	lines := strings.Split(string(input), "\n")

	// 処理結果を格納するマップ（メモ化）
	memo := make(map[int]int)
	totalCount := 0

	for _, line := range lines {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// メモ化された値があるかチェック
		if _, found := memo[n]; found {
			// 既に計算済みの場合はスキップ
			continue
		}

		// 計算処理（操作の繰り返し）
		current := n
		steps := 0

		// n が 1 になるまで繰り返す
		for current != 1 {
			if current == 1 {
				break // 1に到達したらループを抜ける（ただし、この条件は外側のforループの条件でもカバーされるが安全のため）
			}

			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			steps++
		}

		// 1に到達したときのステップ数をメモ化
		memo[n] = steps
		totalCount += steps
	}

	// 合計を1行で出力
	fmt.Printf("total=%d\n", totalCount)
}
