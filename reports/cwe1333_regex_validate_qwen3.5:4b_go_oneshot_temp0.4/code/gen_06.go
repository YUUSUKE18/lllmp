package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validCount := 0

	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}

		// 前後の空白を既に除いたため、ここで再度チェックする必要がある場合があるが、
		// 仕様では「行の前後の空白は無視します」とあるので、TrimSpace で処理済み。
		// 内容を確認: 数字とカンマ以外が含まれていないか。
		
		valid := true
		for _, ch := range line {
			if ch < '0' || ch > '9' && ch != ',' {
				valid = false
				break
			}
		}

		if valid {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
