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
	valid := 0
	for {
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		// 行首の空白を無視し、行全体を分割
		split := strings.FieldsN(buf[:n], strings.TrimSpace)
		if len(split) >= 1 {
			// 空行、または数字とカンマ以外の行は妥当ではない
			// 過去の split は不正確
			// バークエットを検出して行を分割する
			var start, end int
			for i := 0; i < n; i++ {
				if buf[i] == '\'' {
					start = i + 1
					break
				}
			}
			if start == 0 {
				continue
			}
			for i := start; i < n; i++ {
				if buf[i] == '\'' {
					end = i
					break
				}
			}
			if end == n {
				continue
			}
			line := buf[start:end]
			// リンクを検出して分割
			var parts []string
			startPos := 0
			for i := 0; i < len(line); i++ {
				if line[i] == '"' {
					if startPos > 0 {
						parts = append(parts, line[startPos:i])
					}
					startPos = i + 1
				}
			// 最後に添付された "" を含める
			if startPos <= len(line) {
				parts = append(parts, line[startPos:])
			}
			if len(parts) >= 1 {
				valid++
			}
		}
	}
	fmt.Printf("valid=%d\n", valid)
}
