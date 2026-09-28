package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	// 標準入力から一行を読み込む
	input, err := os.ReadFile(0) // os.Stdinの読み込みは通常、os.ReadFile(0)やbufio.Readerを使うが、ここではシンプルに読み込みを試みる。
	if err != nil {
		// 実際にはbufio.Scannerで一行ずつ処理するのがより堅牢だが、例示された形式に従い、標準入力全体を扱うことを想定する。
		// ここでは、stdinから読み込む操作を再構成する。
		scanner := bufio.NewScanner(os.Stdin)
		if !scanner.Scan() {
			return
		}
		line := scanner.Text()
		processInput(line)
		return
	}

	// 念のため、直接読み込みを試みる（上記で処理済みだが、より一般的な方法を採用）
	// この問題の入力形式は「カンマ区切りの整数列」なので、一行全体を処理する。
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		return
	}
	line := scanner.Text()
	processInput(line)
}

func processInput(line string) {
	// カンマで分割し、各要素を処理する
	fields := strings.Split(line, ",")
	
	// 重複を除いた整数を格納するためのマップ
	uniqueNumbers := make(map[int64]bool)
	
	// 整数を格納するためのスライス（合計計算のため）
	var uniqueList []int64

	for _, field := range fields {
		// 前後の空白をトリム
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}

		// 整数に変換を試みる
		n, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複チェックと格納
		if !uniqueNumbers[n] {
			uniqueNumbers[n] = true
			uniqueList = append(uniqueList, n)
		}
	}

	count := len(uniqueList)
	var sum int64 = 0
	for _, n := range uniqueList {
		sum += n
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
