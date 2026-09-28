package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, err := os.ReadFile(0) // 標準入力全体を読み込む
	if err != nil {
		return
	}
	data := string(input)

	// カンマで分割し、空白を除去して整数に変換する
	parts := strings.Split(strings.TrimSpace(data), ",")

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化 (負の数も考慮するため、ここでは非常に大きな正の数で初期化し、最初の有効な値で上書きする)
	found := false

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		count++
		if num > maxValue {
			maxValue = num
		}
		found = true
	}

	if count == 0 {
		// 要素が一つもなかった場合、最大値は定義できないか、あるいは仕様に依存するが、ここでは0を出力する（空の入力に対する一般的な対応）
		// ただし、問題文から「要素数と最大値」を求めるため、要素がない場合は count=0, max=? となる。
		// 厳密には、データが存在しない場合の挙動は仕様に明記されていないが、ここでは読み取れた有効な数値のみを対象とする。
		// 空の入力の場合、count=0, maxValueは初期値のままになるか、-1などが適切だが、ここでは読み取った要素数と最大値を出す。
		// 0個の要素があれば、最大値は定義できないため、例えば count=0 max=-1 などとするが、ここでは単純に読み取れたものだけを扱う。
		// もし入力が空文字列やカンマのみだった場合、count=0となる。
	}

	if found {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	} else {
		// 有効な整数が一つもなかった場合 (例: 空行のみ)
		fmt.Printf("count=0 max=-1\n") // または、問題の意図に従って適切な値を出力する。ここでは読み取れた要素がない場合は count=0, max=0 とする。
	}
}
