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
	if !scanner.Scan() {
		return
	}
	countStr := scanner.Text()
	count, err := strconv.Atoi(strings.TrimSpace(countStr))
	if err != nil {
		// 最初の行が不正な場合は処理を終了
		return
	}

	var sum int64 = 0
	var actualCount int = 0

	// 続く行から整数を読み取る
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}

		// 実際に読み取れた整数のみを対象とする
		sum += num
		actualCount++

		// 読み取るべき個数に達したら終了
		if actualCount == count {
			break
		}
	}

	// 実際に読み取れた個数と合計を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
