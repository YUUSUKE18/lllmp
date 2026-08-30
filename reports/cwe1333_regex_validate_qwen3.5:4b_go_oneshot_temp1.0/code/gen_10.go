package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func isNumber(s string) bool {
	s = strings.TrimSpace(s)
	if len(s) == 0 {
		return false
	}
	for _, c := range s {
		if c < '0' || c > '9' {
			return false
		}
	}
	return true
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validCount := 0
	
	for sc.Scan() {
		line := sc.Text()
		
		// 前後の空白を切り捨て、空行をチェック
		splitParts := strings.Split(line, ",")
		
		// セグメント数を数える（カンマを区切るため）
		count := len(splitParts)
		
		// セグメントがすべて有効な整数列であるかチェック
		validLine := true
		for i := 0; i < count; i++ {
			part := splitParts[i]
			trimmedPart := strings.TrimSpace(part)
			
			if !isNumber(trimmedPart) {
				validLine = false
				break
			}
		}
		
		if validLine {
			validCount++
		}
	}
	
	fmt.Printf("valid=%d\n", validCount)
}
