package main

import (
	"fmt"
	"strings"
)

func main() {
	var validLines []string

	for {
		line, err := fmt.Scanln(os.Stdin)
		if err != nil {
			break
		}

		// 空行を無視
		if line == "" {
			continue
		}

		// ルールに違反した行を無視
		if !isValidCommaSeparatedIntegerList(line) {
			continue
		}

		// 妜当は1個以上の数字列を含む
		if len(strings.Split(line, ",") > 1) {
			validLines = append(validLines, line)
		}
	}

	// 最後に1行出力
	if len(validLines) > 0 {
		fmt.Printf("valid=%d\n", len(validLines))
	} else {
		fmt.Println("valid=0")
	}
}

func isValidCommaSeparatedIntegerList(line string) bool {
	// 空行や空白行を無視
	if strings.TrimSpace(line) == "" {
		return false
	}

	// カンマ以外の文字が含まれている
	if !strings.ContainsAll(line, "0123456789,") {
		return false
	}

	// カンマで区切られた部分を分割
	parts := strings.Split(line, ",")

	// 每部が数字列である
	for _, part := range parts {
		if !strings.TrimSpace(part) || !regexp.MustCompile(`^\d+$`).Match(part) {
			return false
		}
	}

	// 1 個以上の数字列
	return len(parts) > 1
}
