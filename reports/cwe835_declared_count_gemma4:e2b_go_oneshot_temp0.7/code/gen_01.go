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

	// 1行目を読み取り、整数として個数を取得
	if !scanner.Scan() {
		// 入力が空の場合
		fmt.Println("count=0 sum=0")
		return
	}
	line1 := scanner.Text()
	count, err := strconv.Atoi(strings.TrimSpace(line1))
	if err != nil {
		// 1行目が数値でない場合、読み取れた個数を0として扱う（仕様上、1行目は個数として扱うべきだが、ここではエラー処理として）
		// 厳密に仕様に従うため、もし1行目が個数として解釈できなければ、以降の処理は行わない。
		// ただし、問題の構造上、1行目は個数として扱うことが前提。
		return
	}

	var sum int64 = 0
	actualCount := 0

	// 2行目以降を読み取り、整数を処理
	for scanner.Scan() {
		line := scanner.Text()
		// 空行は無視
		if strings.TrimSpace(line) == "" {
			continue
		}

		// 整数として解析を試みる
		num, err := strconv.ParseInt(strings.TrimSpace(line), 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		sum += num
		actualCount++
	}

	// 最終結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
