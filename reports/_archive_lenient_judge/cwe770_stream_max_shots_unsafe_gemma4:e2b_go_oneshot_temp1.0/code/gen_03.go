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
		// 入力が空の場合は何も出力しない（仕様上、入力がない場合は処理しない）
		return
	}

	line := scanner.Text()
	// カンマで分割し、各要素をスペースで区切って処理する方が柔軟かもしれないが、
	// 仕様は「カンマ区切り」なのでカンマで分割する。空白は無視する。
	fields := strings.Split(line, ",")

	count := 0
	maxValue := int64(0)
	found := false

	for _, field := range fields {
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}

		n, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		count++
		if !found || n > maxValue {
			maxValue = n
			found = true
		}
	}

	// 要素が存在する場合のみ出力する（入力が完全に無効な場合も考慮し、少なくとも1つ読み取れた場合を対象とする）
	if count > 0 {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	} else {
		// 整数が見つからなかった場合は何も出力しない、または適切なデフォルトを出力する。
		// 今回は入力された値に基づいて数と最大値を出すため、0個で最大値0とするのが妥当だが、
		// 「要素数を求めます」という要求に基づき、読み取れた有効な要素数のみを反映させる。
		// ただし、もし入力が " , , " のような空のカンマのみなら count=0 となる。
		// ここでは、実際にパースできた整数が存在する場合のみ出力する。（count>0の場合）
	}
}
