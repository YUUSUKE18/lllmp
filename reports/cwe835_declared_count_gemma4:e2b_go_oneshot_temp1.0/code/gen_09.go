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
	var count int
	var sum int64 = 0
	readCount := 0

	// 1行目を読み取り、整数として解釈する
	if sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			// 空行は無視
		} else {
			// 1行目に続く整数個数を読み取る
			parsedCount, err := strconv.Atoi(line)
			if err == nil {
				count = parsedCount
			} else {
				// 1行目が整数でなかった場合は、読み取りを終了するか、エラー処理を行う（ここでは無視）
				return
			}
		}
	} else {
		// 入力が空の場合
		return
	}

	// 2行目以降から整数を読み取る
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue // 空行は無視
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}

		// 実際に読み取れた整数のみを対象とする
		sum += num
		readCount++

		// 読み取るべき個数に達したら終了
		if readCount == count {
			break
		}
	}

	// 最終結果を出力
	fmt.Printf("count=%d sum=%d\n", readCount, sum)
}
