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
	var numbers []int64

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		// カンマ区切りで読み込むことを想定するが、
		// 例1, 2, 3の形式に従い、標準入力全体を一度に処理する方式を採用する。
		// 今回の仕様は「カンマ区切りの整数列」なので、ここでは一行すべてを処理する。
		// 入力全体を読み込んで処理するのが最も一般的だが、例に合わせて文字列として扱う。

		// 標準入力全体を読み込む方法に変更し、スペースや改行で区切られたすべての数値を抽出する
	}

	data, _ := os.ReadFile(0) // 標準入力全体を読み込む

	fields := strings.Fields(string(data))
	count := 0
	var maxValue int64 = -1 // 64bit整数として、負の値で初期化（最大値を求めるため）

	for _, field := range fields {
		if field == "" {
			continue
		}
		n, err := strconv.ParseInt(field, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}
		count++
		if n > maxValue {
			maxValue = n
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
