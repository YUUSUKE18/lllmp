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
	var count int = 0
	var sum int64 = 0
	firstLine := true

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}

		if firstLine {
			// 1行目: 続く整数の個数
			num, err := strconv.Atoi(line)
			if err != nil {
				// 1行目が整数でない場合は無視（仕様上は1行目は整数と仮定されるが、堅牢性のためにチェック）
				continue
			}
			count = num
			firstLine = false
			continue
		}

		// 2行目以降: 整数
		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		sum += num
	}

	// 実際に読み取れた個数（count）と合計（sum）を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
