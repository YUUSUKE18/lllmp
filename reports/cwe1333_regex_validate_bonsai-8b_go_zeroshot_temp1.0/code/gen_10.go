package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	var validLines []string

	for {
		line, err := fmt.ScanLine()
		if err != nil {
			break
		}

		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}

		// 空格やカタギリを除いて、数字とカンマのみのリストを作成
		parts := strings.FieldsN(line, func(c byte) bool { return !isdigit(c) && c != ',' && !isspace(c) })
		isValid := len(parts) >= 1

		// 各部が正しくかを確認
		if isValid {
			for _, part := range parts {
				if len(part) == 0 {
					isValid = false
					break
				}
				// カンマのみの列は無効
				if strings.Contains(part, ",") && len(part) > 1 {
					isValid = false
					break
				}
				// 非数字は無効
				if !strconv.IsIntPartString(part) {
					isValid = false
					break
				}
			}
			if isValid {
				validLines = append(validLines, line)
			}
		}
	}

	fmt.Println("valid=" + fmt.Sprintf("%d", len(validLines)))
}
