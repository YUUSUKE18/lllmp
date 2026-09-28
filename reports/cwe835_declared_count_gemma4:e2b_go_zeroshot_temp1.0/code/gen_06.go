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
	
	// 1行目を読み取る
	if !scanner.Scan() {
		// 入力が空の場合
		return
	}
	
	// 1行目の値（期待される個数）を読み取る
	line1 := strings.TrimSpace(scanner.Text())
	countStr := line1
	
	// 2行目以降の整数を読み取る
	var actualCount int
	var sum int64 = 0
	
	// scanner.Scan()は次の行を読み込む。
	// 1行目（countStr）を読み込んだので、ここから実際の数値を読み始める。
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}
		
		// 整数として解釈を試みる
		number, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}
		
		// 読み取れた整数を対象とする
		actualCount++
		sum += number
	}
	
	if err := scanner.Err(); err != nil {
		// エラー処理（通常、この問題の制約下では必須ではないが、堅牢性のために残す）
	}
	
	// 最終的な結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
