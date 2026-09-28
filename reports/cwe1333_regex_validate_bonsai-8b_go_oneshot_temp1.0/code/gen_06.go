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
	sc.Scan()
	var validLines int
	for _ ; !sc.End() ; {
		sc.Scan()
		if sc.Text() == "" {
			continue
		}
		// 1 個以上の数字列で、カンマで区切られたかをチェック
		parts := strings.Fields(sc.Text())
		if len(parts) >= 1 {
			for _, part := range parts {
				if part == "" {
					// 空格や空白を含む部分は無視
					continue
				}
				n, err := strconv.Atoi(part)
				if err != nil {
					// 数値がなければ無視
					continue
				}
			}
			// 最大値がなければ無視（これは前提なので無視）
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
