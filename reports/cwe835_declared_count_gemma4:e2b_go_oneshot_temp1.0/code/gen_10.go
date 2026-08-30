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
	
	// 1行目を読み込み、整数個数を取得
	if !scanner.Scan() {
		// 入力が空の場合は終了
		return
	}
	countStr := scanner.Text()
	
	// 読み取れた個数を整数に変換（これはあくまで期待値であり、実際に読み取れる個数を追跡する）
	expectedCount, err := strconv.Atoi(strings.TrimSpace(countStr))
	if err != nil {
		// 最初の行が不正な場合は処理を終了
		return
	}

	var actualCount int = 0
	var sum int64 = 0
	
	// 2行目以降を読み込む
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}

		// 行が空でなければ、整数として解釈を試みる
		if num, err := strconv.ParseInt(line, 10, 64); err == nil {
			// 実際に読み取れた整数を対象とする
			actualCount++
			sum += num
		}
	}

	// 厳密に count=<実際に読み取れた個数> sum=<合計> を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
