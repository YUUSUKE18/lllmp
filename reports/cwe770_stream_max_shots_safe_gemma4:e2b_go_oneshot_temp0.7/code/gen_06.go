package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力から一行を読み込む
	input, err := os.ReadFile(0) // os.Stdin を直接読み込む代わりに、ここではファイルディスクリプタ 0 を使用するが、bufio.Reader を使う方が一般的で安全。今回は読み込み処理を工夫する。
	if err != nil {
		// 実際には bufio.Reader を使って行単位で読み込むのがより堅牢だが、
		// 課題の入力形式（カンマ区切りの整数列）を考慮し、ここでは標準的な読み込みを行う。
		// 標準入力を直接扱うため、bufio.Reader を使う。
	}

	reader := bufio.NewReader(os.Stdin)
	line, err := reader.ReadString('\n')
	if err != nil && len(line) == 0 {
		// 入力が空の場合
		fmt.Println("count=0 max=0")
		return
	}

	// 入力行を処理する
	line = strings.TrimSpace(line)
	if line == "" {
		fmt.Println("count=0 max=0")
		return
	}

	// カンマで分割
	parts := strings.Split(line, ",")

	var count int64 = 0
	var maxValue int64 = -1 // 64bit整数として、最小値を想定して初期化

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換を試みる
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する (仕様通り)
			continue
		}

		count++

		// 最大値を更新する
		if val > maxValue {
			maxValue = val
		}
	}

	// 最大値が設定されていない（入力されたのが全て無効だった）場合の処理。
	// 入力に有効な整数があった場合、maxValueは正しく更新されているはず。
	// 空の入力や非数値のみの場合、count=0, max=0 が適切だが、ここでは読み込んだ要素数と最大値をそのまま出力する。
	if count == 0 {
		fmt.Println("count=0 max=0")
	} else {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
