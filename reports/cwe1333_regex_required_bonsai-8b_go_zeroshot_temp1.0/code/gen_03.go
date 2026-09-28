package main

import (
	"fmt"
	"regexp"
	"os"
)

func main() {
	r := regexp.MustCompile(`^\s*(\d+)(?:,\d+)*\s*$$`)

	var validLines []string

	for {
		line, err := os.ReadString(os.Stdin, 1024)
		if err != nil || err == os.EOF {
			break
		}
		if err == os.ErrInterrupt {
			continue
		}

		// 空行や不正な形式は無視
		if line == "" {
			continue
		}

		// 空格とタブの前後の空白を無視
		trimmedLine := regexp.MustCompile(`^\s+|\s+$`).SubString(line)

		// 正規表現を適用
		if r.MatchString(trimmedLine) {
			validLines = append(validLines, trimmedLine)
		}
	}

	// 最初の妥当な行数を出力
	if len(validLines) > 0 {
		fmt.Printf("valid=%d\n", len(validLines))
	}
}
