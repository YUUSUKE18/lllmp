package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validCount := 0
	linePattern := regexp.MustCompile(`^\s*(.+)\s*$`)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		
		// カンマ区切り整数列として妥当かどうか判定します。
		// 1 個以上の数字列がカンマで区切られて並んでいることです。
		// 末尾のカンマは許容します。
		// 空行、および数字とカンマ以外を含む行は妥当ではありません。
		match := linePattern.FindStringSubmatch(line)
		if len(match) == 2 {
			content := match[1]
			
			// レギュラー表現：文字列の両端が空白のみで、内部が (整数 [,]+整数|,) と一致するか
			validContentMatch := regexp.MustCompile(`^(\d+(\s*,\s*\d+)*)?$`).MatchString(content)
			
			// 簡易的な検証ロジック（正規表現は冗長になりやすいので直接解析します）
			if !regexp.MustCompile(`^[,\s]+(1|[0-9])+[,\s]+(1|[0-9])+$`).MatchString(content) && content != "" {
				// より堅実な検証：カンマ区切り整数列とすることで判定
				valid := true
				parts := regexp.MustCompile(`\s*,\s*`).Split(content, -1)
				
				var hasDigit bool
				for _, p := range parts {
					if len(p) > 0 && !regexp.MustCompile(`^[,\d\s]+$`).MatchString(p) {
						valid = false
						break
					} else if regexp.MustCompile(`\d+$`).MatchString(p) && len(p) > 0 {
						hasDigit = true
					}
				}
				
				// 1 個以上の数字列が必要
				if !hasDigit {
					valid = false
				} else if content == "" || regexp.MustCompile(`^[,\s]*$`).MatchString(content) && valid {
					// 空文字列は妥当とみなさない (1 個以上の数字列が必要)
					valid = true // ここでは空行をスキップしているため、content が空でないことを保証するため
				} else if len(parts) > 0 {
					if !regexp.MustCompile(`^\s*(.+?)\s*$`).MatchString(parts[0]) || parts[0] == "" {
						valid = false
					} else {
						hasDigit = true
					}
				}
				
				// 正しいロジックを再確認: カンマ区切りの整数列
				if valid && regexp.MustCompile(`^\s*(\d+(?:\s*,\s*\d+)*)\s*$`).MatchString(content) {
					validCount++
				}
			} else {
				// シンプルに：カンマ区切り整数列が正しいかチェック
				if regexp.MustCompile(`^\s*(\d+(\s*,\s*\d+)*|\s*,+\s*$)\s*$`).MatchString(content) && content != "" {
					validCount++
				}
			}
		}
	}
	fmt.Printf("valid=%d\n", validCount)
}
