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
		fmt.Println("count=0 max=-9223372036854775808") // 空やエラーの場合のデフォルト値（問題文に明示なしだが、安全策として）
		return
	}

	text := sc.Text()
	fields := strings.Split(text, ",")
	maxVal := int64(-9223372036854775808) // 最小値（空の場合に返すため、実際のケースでは count=0 で max は任意）
	count := 0

	for _, f := range fields {
		f = strings.TrimSpace(f)
		if len(f) == 0 {
			continue
		}
		n, err := strconv.ParseInt(f, 10, 64)
		if err != nil {
			continue // 整数として解釈できない場合は無視
		}
		count++
		if n > maxVal || count == 1 {
			maxVal = n
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
