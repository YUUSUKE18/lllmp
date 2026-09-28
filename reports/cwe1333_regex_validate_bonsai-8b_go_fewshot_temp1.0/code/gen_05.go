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
	var validLines = 0
	for {
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		// 行の前後の空白を無視
		trimmed := strings.TrimSpace(buf[:n])
		// 空行や数字とカンマ以外の行は妥当ではない
		if strings.HasPrefix(trimmed, "") || strings.Contains(trimmed, ",") && strings.Contains(trimmed, "") {
			// 妥当な行は数字列を区切って1個以上あるかを判定
			// カンマ区切りの整数列として処理
			parts := strings.Split(trimmed, ",")
			if len(parts) > 1 {
				validLines++
			}
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
