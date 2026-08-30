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

	// 1行目: 目標値の読み込み
	if !sc.Scan() {
		return
	}
	targetStr := strings.TrimSpace(sc.Text())
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		// 1行目が不正な場合は処理を終了（仕様上は与えられると仮定）
		return
	}

	// 2行目以降: 整数を読み込み、ターゲットとのペアを探す
	var numbers []int64
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		n, err := strconv.ParseInt(line, 10, 64)
		if err == nil {
			numbers = append(numbers, n)
		}
	}

	// ターゲット値に達する2個の組の数を数える
	pairCount := 0
	n := len(numbers)

	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if numbers[i]+numbers[j] == target {
				pairCount++
			}
		}
	}

	// 結果の出力
	fmt.Printf("pairs=%d\n", pairCount)
}
