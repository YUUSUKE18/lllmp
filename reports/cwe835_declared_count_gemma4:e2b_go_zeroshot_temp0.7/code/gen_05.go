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
	var count int
	var sum int64 = 0
	actualCount := 0

	// 1行目を読み取る
	if scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			// 空行は無視
		} else {
			// 1行目の整数を読み取る
			if c, err := strconv.Atoi(line); err == nil {
				count = c
			} else {
				// 1行目が整数でない場合は、以降の読み取りを続行しない、またはエラー処理を行うが、
				// 仕様に従い、読み取れた整数だけを対象とするため、ここでは続行する。
				// ただし、ここでは「続く整数の個数が書かれています」という前提に基づき、
				// 1行目が読み取れた値が個数として扱われることを想定する。
				// 厳密には、この行が個数として失敗した場合、次の行がデータとなる。
				// 仕様の解釈：「1行目に、続く整数の個数が書かれています」
				// 読み取れた値が個数として使われる。
			}
		}
	}

	// 2行目以降を読み取る
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}

		// 整数として解釈できるか試みる
		if c, err := strconv.ParseInt(line, 10, 64); err == nil {
			// 読み取れた整数を対象とする (個数に関わらず)
			sum += c
			actualCount++
		}
	}

	// 最終結果を出力
	// 実際に読み取れた整数のみを対象とする。
	// 1行目の値は「続く整数の個数」として与えられたが、実際に読み取れたデータが
	// 1行目と一致しない可能性があるため、actualCountとsumを使用する。
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
