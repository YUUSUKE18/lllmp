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

	// 1行目を読み取り、実際に存在する整数の個数を取得する
	if !scanner.Scan() {
		// 入力が空の場合
		fmt.Println("count=0 sum=0")
		return
	}
	countStr := scanner.Text()
	count, err := strconv.Atoi(strings.TrimSpace(countStr))
	if err != nil {
		// 1行目が整数として解釈できない場合（仕様上は想定されないが堅牢性のために）
		// この場合は、後続の入力も処理しないか、エラー処理を行う。ここでは最低限の出力を試みる。
		fmt.Println("count=0 sum=0")
		return
	}

	var sum int64 = 0
	actualCount := 0

	// 2行目以降を読み取り、整数を処理する
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			// 空行は無視
			continue
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		sum += num
		actualCount++

		// 読み取った数が指定された個数を超えた場合、それ以上は読み飛ばす必要がある。
		// ただし、仕様では「実際に読み取れた整数だけを対象とします」とあるため、
		// 続く行が整数でなければ、その行は無視し、読み取りを続ける。
		// 実際に読み取れた個数と、合計を計算する。
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
