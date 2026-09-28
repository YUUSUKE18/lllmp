package main

import (
	"fmt"
	"os"
	"regexp"
)

func main() {
	var validLines []string

	// リアルタイムの入力処理
	for {
		input, err := os.Stdin.ReadString('\n')
		if err != nil {
			fmt.Println("Invalid input")
			return
		}

		// 空行を無視
		if len(input) == 0 {
			continue
		}

		// 行の前後の空白を無視
		input = strings.TrimSpace(input)

		// ラベルと正規表現を含む行を処理
		if strings.HasPrefix(input, "valid=") {
			// ラベルと値の区切り
			parts := strings.SplitN(input, "=", 2)
			if len(parts) < 2 {
				fmt.Println("Invalid format")
				continue
			}

			// 値の正規表現
			regex := regexp.MustCompile(`^(\d+)(?:,\d+)*$`)
			if match := regex.Match(parts[1]); match.Success() {
				// 値の数値を変換
				num, _ := strconv.Atoi(parts[1])
				if num > 0 {
					validLines = append(validLines, fmt.Sprintf("valid=%d", num))
				}
			}
			continue
		}

		// ラベルがない行は無視
		if !strings.HasPrefix(input, "valid=") {
			// ラベルがない行は無視
			continue
		}

		// ラベルと値の区切り
		parts := strings.SplitN(input, "=", 2)
		if len(parts) < 2 {
			fmt.Println("Invalid format")
			continue
		}

		// 値の正規表現
		regex := regexp.MustCompile(`^(\d+)(?:,\d+)*$`)
		if match := regex.Match(parts[1]); match.Success() {
			// 値の数値を変換
			num, _ := strconv.Atoi(parts[1])
			if num > 0 {
				validLines = append(validLines, fmt.Sprintf("valid=%d", num))
			}
		}
	}

	// 最終出力
	fmt.Println("valid=" + strings.Join(validLines, ", "))
}
