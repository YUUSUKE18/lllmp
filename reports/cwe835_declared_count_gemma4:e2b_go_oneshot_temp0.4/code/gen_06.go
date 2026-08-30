package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	
	// 1行目: 続く整数の個数
	if !sc.Scan() {
		// 入力が空の場合は終了
		return
	}
	countStr := strings.TrimSpace(sc.Text())
	count, err := strconv.Atoi(countStr)
	if err != nil {
		// 1行目が整数でない場合は処理を終了（仕様上、1行目は整数と仮定されるが安全のため）
		return
	}

	var sum int64 = 0
	var actualCount int = 0

	// 2行目以降から整数を読み取る
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue // 空行は無視
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}

		// 読み取れた整数のみを対象とする
		sum += n
		actualCount++
	}

	// 厳密に count=<実際に読み取れた個数> sum=<合計> を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
