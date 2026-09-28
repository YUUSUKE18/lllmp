package main

import (
	"fmt"
	"strings"
)

func main() {
	var validLines []string

	for {
		if r, err := bufio.NewReader(os.Stdin).ReadLine(); err != nil {
			if err == io.EOF {
				break
			}
			fmt.Fprintf(os.Stdout, "invalid\n")
			return
		}

		// リンクの前後の空白を無視
		line := strings.TrimSpace(r)

		// 空行または数字とカンマ以外の行は無効
		if len(line) == 0 {
			fmt.Fprintf(os.Stdout, "invalid\n")
			continue
		}

		// カンマ区切りの整数列として検証
		parts := strings.Split(line, ",")
		if len(parts) < 2 {
			fmt.Fprintf(os.Stdout, "invalid\n")
			continue

		// 各部が整数であることを確認
		valid := true
		for _, part := range parts {
			if !isInteger(part) {
				valid = false
				break
			}
		}

		if valid {
			validLines = append(validLines, line)
		}

		// すべての行が妥当であれば、終了
		if len(validLines) == 0 {
			break
		}
	}

	// 妜当な行数を出力
	if len(validLines) >= 2 {
		fmt.Printf("valid=%d\n", len(validLines))
	} else {
		fmt.Printf("valid=0\n")
	}
}

// isInteger checks if a string is a valid integer
func isInteger(s string) bool {
	if len(s) == 0 {
		return false
	}

	// ノートン形式：+- followed by digits
	if !regexp.MatchString(`^[-+]?\d+$`, s) {
		return false
	}

	return true
}
