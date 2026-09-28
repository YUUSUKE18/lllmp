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

	// 1行目を読み込む（続く整数の個数）
	if !scanner.Scan() {
		// 入力が空の場合
		return
	}
	countLine := scanner.Text()
	
	// 1行目の値を整数としてパースする（必須ではないが、仕様に従う）
	expectedCount, err := strconv.Atoi(strings.TrimSpace(countLine))
	if err != nil {
		// 1行目が整数でない場合は処理を終了する（仕様上、1行目は整数と仮定されるが、安全のため）
		return
	}

	var actualCount int = 0
	var totalSum int64 = 0
	
	// 2行目以降を読み込み、整数を処理する
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			// 空行は無視
			continue
		}

		// 行が整数として解釈できるか試みる
		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// 読み取れた整数を対象とする
		actualCount++
		totalSum += num
	}

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", actualCount, totalSum)
}
