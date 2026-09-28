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
		line := scanner.Text()
		// 行の前後の空白を無視する（ここでは行全体を処理するため、トリムは不要だが、念のため）
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマは許容する
		// 妥当なのは「1個以上の数字列がカンマで区切られて並んでいること」
		// これは、カンマで区切られた要素が少なくとも1つ存在し、かつ、その区切りが数字のみで構成されていることを意味する。
		// 最も簡単な判定は、カンマで区切られた文字列を分割し、その要素がすべて数字であるか、または少なくとも1つの数字列が存在するかどうかを調べること。

		// 1. 末尾のカンマを削除して処理を簡略化する
		processedLine := trimmedLine
		if strings.HasSuffix(processedLine, ",") {
			processedLine = processedLine[:len(processedLine)-1]
		}

		// 2. カンマで分割する
		parts := strings.Split(processedLine, ",")

		isValid := false
		if len(parts) > 0 {
			// 少なくとも1つの要素が存在する場合、その要素がすべて数字であるかを確認する
			// 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
			// これは、各部分が空でなく、かつ数字のみで構成されていることを意味する。
			// ただし、仕様の解釈として、「カンマで区切られた要素が数字列であること」が最も自然。
			// 空行や数字とカンマ以外を含む行は妥当ではない、という制約があるため、
			// 各要素が空でないこと、そしてその要素が数字のみで構成されていることを確認する。

			allPartsAreValid := true
			for _, part := range parts {
				// 各部分が空でないこと
				if part == "" {
					allPartsAreValid = false
					break
				}
				// 各部分が整数（数字列）のみで構成されていること
				if _, err := fmt.Sscan(part); err != nil {
					// Sscanが失敗した場合（数字以外が含まれている場合）
					allPartsAreValid = false
					break
				}
			}

			if allPartsAreValid {
				// 1個以上の数字列がカンマで区切られている（partsの長さが1以上）
				isValid = true
			}
		}

		if isValid {
			validCount++
		}
	}

	if scanner.Err() != nil {
		// エラー処理（通常は不要だが念のため）
	}

	fmt.Printf("valid=%d\n", validCount)
}
