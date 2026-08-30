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

	// 1行目から読み取る
	if !scanner.Scan() {
		// 入力が空の場合
		fmt.Println("count=0 sum=0")
		return
	}

	// 1行目から整数個数を読み取る
	countStr := strings.TrimSpace(scanner.Text())
	count, err := strconv.Atoi(countStr)
	if err != nil {
		// 1行目が整数でない場合は、読み取れた個数を0として扱う（仕様上、1行目は整数個数と仮定）
		fmt.Println("count=0 sum=0")
		return
	}

	var sum int64 = 0
	var actualCount int = 0

	// 2行目以降から整数を読み取る
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
		actualCount++

		// 読み取った数が指定された個数を超えた場合、それ以上読み込むのは停止するが、
		// 仕様では「実際に読み取れた整数だけを対象」とあるため、ここでは読み込んだものを集計する。
		// ただし、もし厳密に「count」と一致させたい場合は、ここでbreakする処理が必要になるが、
		// 「実際に読み取れた整数だけを対象」という記述に基づき、読み取れたもの全てを対象とする。
	}

	// 最終結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
