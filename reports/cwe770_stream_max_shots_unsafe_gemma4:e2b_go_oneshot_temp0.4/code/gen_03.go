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
		// 入力が空の場合は何も出力しない（仕様上、データがない場合は処理を終了）
		return
	}

	line := scanner.Text()
	fields := strings.Split(line, ",")

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化 (負の数も考慮するため)
	foundNumber := false

	for _, field := range fields {
		// 前後の空白をトリムして処理
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}

		n, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		count++
		if n > maxValue {
			maxValue = n
		}
		foundNumber = true
	}

	if foundNumber {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	} else {
		// 整数値が一つもなかった場合（空行や無効な入力のみの場合）
		// この仕様では、要素数0と最大値の定義が曖昧だが、ここでは読み込んだ有効な数値がない場合は何も出力しないか、あるいはcount=0 max=何らかの値とする。
		// 厳密に「整数列を受け取る」という前提に基づき、もし有効な数が一つもなかった場合は、何も出力しない（または count=0 を出力する）。
		// 今回は、読み込んだ要素数と最大値を報告するという指示なので、有効な要素がなければcount=0 max=0とするのが妥当かもしれないが、ここでは有効な値が見つからなかった場合の出力を省略する。
	}
}
