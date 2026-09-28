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
		// 入力が空の場合は何も出力しない（仕様上は入力がある前提だが安全のため）
		return
	}

	line := scanner.Text()
	fields := strings.Split(line, ",")

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化（負の数も考慮するため）
	foundNumber := false

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
		if n > maxValue {
			maxValue = n
		}
		foundNumber = true
	}

	if foundNumber {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	} else {
		// 整数が一つもなかった場合（空行や無効な入力のみの場合）
		// このケースの具体的な出力要件がないため、ここでは何も出力しないか、0, -1などを出力するが、
		// 入力に有効な数値が一つもない場合は count=0 max=??? となる。
		// 課題の意図を尊重し、数値が見つからなかった場合は何もしない（またはcount=0 max=0など）とする。
		// 今回は「要素数と最大値」を求めるため、要素がない場合は何も出力しないのが最も安全かもしれないが、
		// 例に従い、読み込んだものに基づいて出力する。ここでは、数値が見つからなかった場合は何もしない（またはcount=0 max=0として扱う）
		// 厳密には「整数列を受け取る」ので、空の入力は無視されるべきだが、今回は処理した結果を出力する。
		// 数値が一つもなかった場合、count=0, maxValue=-1 (初期値) となるため、ここでは何も出力しないことにする。
	}
}
