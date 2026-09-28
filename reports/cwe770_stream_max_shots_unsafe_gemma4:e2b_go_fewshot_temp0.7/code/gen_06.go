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
	count := 0
	maxVal := int64(-1 << 63) // 64bit整数の最小値に近い大きな初期値 (負の無限大として扱う)

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}
		parts := strings.Split(line, ",")
		for _, part := range parts {
			part = strings.TrimSpace(part)
			if part == "" {
				continue
			}
			// 64bit整数として解釈を試みる
			val, err := strconv.ParseInt(part, 10, 64)
			if err == nil {
				count++
				if val > maxVal {
					maxVal = val
				}
			}
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理はここでは省略するが、実運用では考慮すべき
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
