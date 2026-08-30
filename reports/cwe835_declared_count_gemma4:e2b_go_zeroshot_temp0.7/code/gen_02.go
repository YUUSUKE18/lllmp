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

	// 1行目を読み取り、続く整数の個数を取得
	if !scanner.Scan() {
		// 入力が空の場合は終了
		return
	}
	countStr := scanner.Text()
	count, err := strconv.Atoi(strings.TrimSpace(countStr))
	if err != nil {
		// 最初の行が整数でない場合は処理を終了（仕様上は1行目は整数と仮定されるが、堅牢性を高める）
		return
	}

	var sum int64 = 0
	actualCount := 0

	// 2行目以降から整数を読み取り、合計を計算する
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

		// 読み取れた整数のみを対象とする
		sum += num
		actualCount++
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
