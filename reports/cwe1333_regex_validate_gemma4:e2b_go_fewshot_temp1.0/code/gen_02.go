package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validLines := 0

	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())

		if line == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマを除去した文字列
		trimmedLine := strings.TrimRight(line, ",")

		// 妥当性の判定: 1個以上の数字列がカンマで区切られているか
		// 空白を許容し、数字とカンマ以外を含まないことを確認する必要がある。
		// 仕様より「1 個以上の数字列がカンマで区切られて並んでいること」が妥当。
		// 数字列が一つ以上存在すれば良い。

		if trimmedLine != "" {
			// 少なくとも1つの数字が含まれているかを確認する
			hasNumber := false
			for _, char := range trimmedLine {
				if char >= '0' && char <= '9' {
					hasNumber = true
					break
				}
			}
			if hasNumber {
				validLines++
			}
		} else {
			// 行がカンマのみ（例: "," や ",,"）の場合、空の数字列のみとなり妥当ではない。
			// ただし、仕様では「1個以上の数字列がカンマで区切られて並んでいること」が条件。
			// 空の数字列のみ（例: "" や ","）は妥当ではない。
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
