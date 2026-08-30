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

		// 末尾のカンマは許容する
		if strings.HasSuffix(line, ",") {
			// カンマのみの行（例: ","）は妥当ではない
			if len(line) > 1 && line[len(line)-2] == ',' {
				continue // 連続するカンマは無視（ただし、行全体がカンマ区切りとして成立するかどうかをチェックする）
			}
		}

		// カンマで分割して、すべてが整数で構成されているか確認
		parts := strings.Split(line, ",")
		
		// 1個以上の数字列がカンマで区切られて並んでいるか？
		// 妥当なのは、少なくとも1つの要素があり、その要素が空でない、または数字として解釈できる場合。
		// ここでは、各要素が空文字列でないことを確認し、かつその要素が整数であるかを確認する。
		
		isValid := false
		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart == "" {
				// 空の要素は許容される（例: "1,,2" の " "）
				continue
			}
			// その要素が整数であるかチェック
			_, err := fmt.Sscanf(trimmedPart, "%d", new(int))
			if err == nil {
				isValid = true
			} else {
				// 数字とカンマ以外を含む、または数字ではない要素が含まれている場合は不妥当
				// 仕様では「1 個以上の数字列がカンマで区切られて並んでいること」が重要。
				// 各部分が数字であることを厳密にチェックする。
				if !strings.TrimSpace(part) == "" {
					// 空でない部分が数字でない場合は不妥当
					isValid = false
					break
				}
			}
		}

		// 妥当性の再評価：空行は除外済み。
		// 妥当とは「1 個以上の数字列がカンマで区切られて並んでいること」
		// 空白やカンマのみの行を除外し、数字列が含まれている行を数える。
		if isValid {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
