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

	// 1行目から読み取る (整数が続く)
	if !scanner.Scan() {
		// 入力が空の場合は終了
		return
	}
	countStr := scanner.Text()
	count, err := strconv.Atoi(strings.TrimSpace(countStr))
	if err != nil {
		// 1行目が整数でない場合は処理を終了
		return
	}

	var sum int64 = 0
	var actualCount int = 0

	// 2行目以降から読み取る
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}

		sum += n
		actualCount++

		// 読み取った個数が指定された個数を超えた場合、それ以降の読み取りを試みるが、
		// 今回の要件は「実際に読み取れた整数だけを対象とする」なので、
		// 1行目の指定値はあくまで目安として扱う。
	}

	// 厳密に「実際に読み取れた整数だけ」を対象とするため、actualCountとsumを出力する。
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
