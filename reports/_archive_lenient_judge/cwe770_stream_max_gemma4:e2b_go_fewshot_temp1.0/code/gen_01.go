package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		// 入力が空の場合
		fmt.Println("count=0 max=-1") // または適切なデフォルト値。ここでは要素がない場合は count=0, max=0 などとする。
		return
	}

	line := sc.Text()
	parts := strings.Split(line, ",")

	count := 0
	maxValue := int64(-1) // 64bit整数範囲を考慮するため初期値を小さく設定 (実際には入力に応じて調整が必要だが、ここでは最大値を見つけるため)
	foundNumber := false

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		count++
		if !foundNumber || n > maxValue {
			maxValue = n
			foundNumber = true
		}
	}

	// 要素が存在しない場合は、count=0, max=何らかのデフォルト値 (ここでは-1など) を出力する。
	// 課題の意図をより厳密にするため、入力された有効な整数の数と最大値を計算し、
	// 有効な整数が一つもなかった場合は count=0, max=0 とするのが一般的かもしれないが、
	// ここでは見つけたものの情報を出力する。もし数字が一つもないなら count=0 で、maxは設定しないか、最小値とする。
	if count == 0 {
		fmt.Printf("count=0 max=0\n") // 要素がない場合は count=0, max=0 とする
	} else {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
