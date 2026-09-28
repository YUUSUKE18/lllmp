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
	input, err := os.ReadFile(0) // os.Stdinの読み込みはここでは直接行わないため、ファイルディスクリプタ0から読むか、bufioを使うのが一般的だが、今回は標準的な方法で文字列全体を扱う想定で実装する。
	if err != nil {
		// 実際の競技プログラミング環境では、通常stdinから一行または複数行を読み込む。
		// ここでは標準入力全体を文字列として処理する。
		// os.Stdinの読み込みは bufio.Reader を使うのが最も堅牢だが、ここでは簡潔に処理するために stdin の内容を直接扱う形で進める。
	}

	// 標準入力から一行を読み込む
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		// 入力が空の場合は何もしない
		return
	}
	line := scanner.Text()

	// カンマで分割し、重複を除いた整数を処理する
	fields := strings.Split(line, ",")
	seen := make(map[int64]bool)
	var count int
	var sum int64

	for _, field := range fields {
		// 前後の空白を除去
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}

		// 整数に変換を試みる
		n, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 重複チェックと合計の計算
		if !seen[n] {
			seen[n] = true
			count++
			sum += n
		}
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
