package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	// 1行目: 目標値の読み取り
	line, err := reader.ReadString('\n')
	if err != nil || line == "" {
		// 入力が空の場合は終了
		return
	}
	targetStr := strings.TrimSpace(line)
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		// 目標値の解析エラーは無視するか、適切なエラー処理を行うが、ここでは問題の制約に従い続行
		return
	}

	// 2行目以降の整数の読み取りと格納
	var numbers []int64
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		// 空行は無視
		if strings.TrimSpace(line) == "" {
			continue
		}
		
		// 行から整数を抽出
		fields := strings.Fields(line)
		for _, field := range fields {
			num, err := strconv.ParseInt(field, 10, 64)
			if err == nil {
				numbers = append(numbers, num)
			}
		}
	}

	// 2個の組の数を計算
	count := 0
	n := len(numbers)

	// O(N^2) のペアのチェック (Nが非常に大きい場合でも、N^2が許容範囲内であるか確認が必要だが、制約がないため標準的なアプローチを採用)
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			// 2つの組の和が目標値になるかチェック
			if numbers[i]+numbers[j] == target {
				count++
			}
		}
	}

	// 結果の出力
	fmt.Printf("pairs=%d\n", count)
}
