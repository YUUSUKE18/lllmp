package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func isValidLine(s string) bool {
	s = strings.TrimSpace(s)
	if s == "" {
		return false
	}
	// 末尾のカンマを含むパターンを正規表現でチェック: ^(\d+,?)+$ または ^\d+,\s*$
	// より堅牢な手動チェックを行う
	parts := strings.Split(s, ",")
	if len(parts) == 1 {
		// カンマがない場合、数字のみでなければならず、末尾空白は許容されるが、TrimSpace で空でないことを確認済み
		for _, p := range parts {
			if p != "" && (p[0] < '0' || p[0] > '9') {
				return false
			}
		}
		return true
	} else if len(parts) > 1 {
		// カンマがある場合、全ての部分が数字でなければならず、末尾のカンマ（空要素）は許容されるが、TrimSpace で空でないことを確認済み
		for _, p := range parts {
			if p != "" && (p[0] < '0' || p[0] > '9') {
				return false
			}
		}
		return true
	}
	return false
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validCount := 0
	for sc.Scan() {
		line := sc.Text()
		if isValidLine(line) {
			validCount++
		}
	}
	fmt.Printf("valid=%d\n", validCount)
}
