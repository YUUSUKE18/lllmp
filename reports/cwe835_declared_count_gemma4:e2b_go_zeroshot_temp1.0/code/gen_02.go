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
	line1 := scanner.Text()
	count, err := strconv.Atoi(strings.TrimSpace(line1))
	if err != nil {
		// 1行目が整数でない場合は無視（仕様上、これは想定外だが堅牢性を保つ）
		return
	}

	var sum int64 = 0
	actualCount := 0

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

		// 実際に読み取れた整数だけを対象とする
		sum += num
		actualCount++
	}

	// 結果の出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
