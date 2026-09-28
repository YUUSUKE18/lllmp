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
	var validLines int
	for {
		sc.Scan()
		if !sc.Err() {
			if sc.Text() == "" {
				break
			}
			// 空行は無視
			if strings.TrimSpace(sc.Text()) == "" {
				continue
			}
			// カンマ区切りの整数列を分割
			parts := strings.Split(sc.Text(), ",")
			// 数値が含まれているかをチェック
			valid := false
			for _, part := range parts {
				if strings.TrimSpace(part) == "" {
					continue
				}
				n, err := strconv.Atoi(part)
				if err != nil {
					continue
				}
				valid = true
			}
			// カンマ区切りで1以上の数字列がある場合、妥当
			if valid && len(parts) > 1 {
				validLines++
			}
		}
		if validLines == 0 {
			// 空行や不妥当行がある場合、0行出力
			fmt.Println("valid=0")
			break
		}
		// 1行だけ出力
		fmt.Printf("valid=%d\n", validLines)
	}
}
