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
	
	// 1行目を読み飛ばす（目標値）
	if !scanner.Scan() {
		return
	}
	// 目標値は64bit整数として扱う
	targetStr := strings.TrimSpace(scanner.Text())
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		// 目標値の読み込みに失敗した場合は終了
		return
	}

	count := 0
	seen := make(map[int64]int)

	// 2行目以降を読み込む
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}

		// 2個の組の条件を満たすかチェック
		// 求めたいのは、現在の数 num と、過去に見た数 num - target のペアが存在するかどうか
		
		// 1. num - target が既に観測されているかチェック
		needed := num - target
		if _, found := seen[needed]; found {
			count++
		}

		// 2. 現在の数 num を記録する
		seen[num]++
	}

	// 結果を出力
	fmt.Printf("pairs=%d\n", count)
}
