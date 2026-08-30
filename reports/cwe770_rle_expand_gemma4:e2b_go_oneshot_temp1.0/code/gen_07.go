package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		return
	}
	line := scanner.Text()

	// カンマで区切られた各要素を処理する
	parts := strings.Split(line, ",")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, part := range parts {
		// "値:回数" の形式にマッチする正規表現
		re := regexp.MustCompile(`^(\d+):(\d+)$`)
		matches := re.FindStringSubmatch(strings.TrimSpace(part))

		if len(matches) == 3 {
			// 値と回数を抽出
			value, errV := strconv.ParseInt(matches[1], 10, 64)
			count, errC := strconv.ParseInt(matches[2], 10, 64)

			if errV == nil && errC == nil {
				// 要素数と合計を計算
				totalCount += count
				totalSum += value * count
			}
		}
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
