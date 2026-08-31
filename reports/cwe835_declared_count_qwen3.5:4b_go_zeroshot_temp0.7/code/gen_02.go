package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	// 1 行目に整数の個数を読み取ります（ただし、実際には参照しませんが仕様通り処理します）
	firstLine, err := reader.ReadString('\n')
	if err != nil {
		return
	}

	var count int
	count, _ = strconv.Atoi(firstLine) // 誤差を無視する（仕様上は実際に読み取れた個数を使うため）

	var sum int64
	validCount := 0

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}

		// 空行は無視
		if len(line) == 0 || line[0] == '\n' {
			continue
		}

		// 整数として解釈できない行も無視
		if trimmed := trimWhitespace(line); len(trimmed) == 0 {
			continue
		}

		val, err := strconv.ParseInt(trimmed, 10, 64)
		if err != nil {
			continue
		}

		sum += val
		validCount++
	}

	fmt.Printf("count=%d sum=%d\n", validCount, sum)
}

func trimWhitespace(s string) string {
	s = s[:len(s)]
	for i := 0; i < len(s); i++ {
		if !(' ' <= rune(s[i]) && rune(s[i]) <= '\t') {
			break
		}
	}
	s = s[len(s):]
	for i := 0; i < len(s); i++ {
		if !(' ' <= rune(s[i]) && rune(s[i]) <= '\t') {
			break
		}
	}
	s = s[:len(s)]
	return s
}
