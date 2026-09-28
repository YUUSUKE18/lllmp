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

	// 1行目: 目標値の読み取り
	if !sc.Scan() {
		return
	}
	targetStr := sc.Text()
	target, err := strconv.ParseInt(strings.TrimSpace(targetStr), 10, 64)
	if err != nil {
		// 目標値が不正な場合は処理を終了（問題の制約上、通常は発生しないはず）
		return
	}

	// 2行目以降の整数の読み取りと格納
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

	// 2個の組の数を求める
	count := 0
	n := len(numbers)

	// 2つの位置 i と j (i != j) の組が target になるものを探す
	// numbers[i] + numbers[j] = target
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if numbers[i]+numbers[j] == target {
				count++
			}
		}
	}

	// 結果の出力
	fmt.Printf("pairs=%d\n", count)
}
