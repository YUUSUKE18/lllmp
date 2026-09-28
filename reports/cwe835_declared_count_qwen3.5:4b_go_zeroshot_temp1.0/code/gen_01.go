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

	// 1 行目に整数の個数があるかチェックする (空行スキップ含む)
	var n int
	count := 0
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}
		val, err := strconv.Atoi(line)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}
		count = val
		break
	}

	// 実際に読み取れた整数の和を計算する (空行スキップ含む)
	sum := int64(0)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}
		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}
		sum += num
		count++ // 実際に読み取れた個数をカウント
	}

	// 出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
