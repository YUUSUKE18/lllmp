package main

import (
	"bufio"
	"fmt"
	"io"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(io.Discard) // 標準入力を読み込まず、空列として扱う（仕様により「標準入力から受け取る」が空の場合や無効な場合の挙動は指定されていないため、空の出力とする）
	
	// 実際の問題では stdin を使うべきだが、ここでは spec に従い「標準入力から...受け取る」ので
	// スタンダードインプットを読む。ただし、例 `7:3,2:2` が与えられた場合のみ処理する。
	// Go の標準ライブラリのみを使うため、bufio を使用。

	var line string
	if _, err := fmt.Scanln(&line); err != nil {
		fmt.Printf("count=0 sum=0\n")
		return
	}

	line = strings.TrimSpace(line)
	if line == "" {
		fmt.Printf("count=0 sum=0\n")
		return
	}

	parts := strings.Split(line, ",")
	count := 0
	sum := 0

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		pair := strings.SplitN(part, ":", 2)
		if len(pair) != 2 {
			continue
		}

		valStr, err1 := strconv.Atoi(strings.TrimSpace(pair[0]))
		countStr, err2 := strconv.Atoi(strings.TrimSpace(pair[1]))
		
		if err1 != nil || err2 != nil {
			continue
		}

		val := int64(valStr)
		repeat := int64(countStr)

		if repeat < 0 {
			continue // 回数は 0 以上であること
		}

		count += repeat
		sum += val * repeat
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
