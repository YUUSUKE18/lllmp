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
	
	// 1行目を読み取り、個数を取得
	if !scanner.Scan() {
		// 入力が空の場合
		return
	}
	
	countStr := scanner.Text()
	count, err := strconv.Atoi(strings.TrimSpace(countStr))
	if err != nil {
		// 1行目が整数でない場合は処理を終了（仕様上は想定されないが安全のため）
		return
	}
	
	actualCount := count
	var sum int64 = 0
	
	// 2行目以降を読み取り、整数を処理
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			// 空行は無視
			continue
		}
		
		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}
		
		// 実際に読み取れた整数のみを対象とする
		sum += num
		actualCount++
	}
	
	// 最終的な結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
