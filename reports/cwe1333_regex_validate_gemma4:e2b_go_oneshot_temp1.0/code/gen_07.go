package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validCount := 0

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())

		if line == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマがあっても良い
		// 数字とカンマのみで構成されているかを確認する
		if strings.Contains(line, ",") {
			// カンマで区切られた文字列を分割し、すべてが整数に変換可能か確認する
			parts := strings.Split(line, ",")
			isValid := true
			for _, part := range parts {
				trimmedPart := strings.TrimSpace(part)
				if trimmedPart == "" {
					// 区切り文字のみ（例: ","や連続した","）は許可されるが、数字列がない場合は厳密な仕様に反する可能性がある。
					// 仕様：「1 個以上の数字列がカンマで区切られて並んでいることです。」
					// 数字列が一つも存在しない場合は不適。
					// ただし、"1,," のようなケースは区切られた要素が空文字列になるため注意が必要。
					// ここでは、数字列として評価できるものは空文字列ではない、と解釈する。
				}
			}

			// より厳密に、各要素が数字列（または空文字列）で構成されているかを確認する。
			// 1個以上の数字列がカンマで区切られていること。
			// 妥当な行は、数字とカンマのみで構成されており、最低1つの数字列を含むこと。

			// 全体を数字とカンマのみで構成されているかチェックし、
			// 数字列が一つ以上存在するかチェックする。
			hasNumber := false
			for _, part := range parts {
				trimmedPart := strings.TrimSpace(part)
				if trimmedPart != "" {
					// 数字列として評価できるか
					if _, err := fmt.Sscan(trimmedPart); err == nil {
						hasNumber = true
					} else {
						// 数字以外の文字が含まれている場合は不適
						isValid = false
						break
					}
				}
			}

			if isValid && hasNumber {
				validCount++
			}
		} else {
			// カンマがない場合、行全体が数字列のみで構成されている必要があるか？
			// 仕様：「1 個以上の数字列がカンマで区切られて並んでいることです。」
			// カンマがない場合、これは0個の区切り文字で区切られていると見なせるが、
			// カンマ区切りの形式を要求しているため、カンマがない行は不妥当と判断する。
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
