package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		return
	}
	targetStr := scanner.Text()

	// 1行目から目標値を読み取る（ここでは1行目全体が目標値と解釈する）
	// 仕様の解釈として、1行目が目標値であり、2行目以降が整数列であると仮定する。
	// ただし、例題の形式に従い、1行目を目標値として読み取る。
	target, err := strconv.ParseInt(strings.TrimSpace(targetStr), 10, 64)
	if err != nil {
		// 目標値の読み取りに失敗した場合は終了
		return
	}

	// 2行目以降の整数を読み取る
	var numbers []int64
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}
		num, err := strconv.ParseInt(line, 10, 64)
		if err == nil {
			numbers = append(numbers, num)
		}
	}

	n := len(numbers)
	count := 0

	// 2個の組 (i, j) を探す (i != j)
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			// numbers[i] + numbers[j] が目標値になるかチェック
			if numbers[i]+numbers[j] == int64(target) {
				count++
			}
		}
	}

	// 結果を出力
	fmt.Printf("pairs=%d\n", count)
}
