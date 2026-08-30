package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validLines := 0

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			// 空行は妥当ではない（問題文の解釈に基づき、ここでは妥当な行数に含めない）
			continue
		}

		// 末尾のカンマを除去してからスペースで分割する
		trimmedLine := strings.TrimRight(line, ",")
		parts := strings.Fields(trimmedLine)

		// 妥当性の判定: 1個以上の数字列がカンマで区切られているか
		// 実際には、カンマで区切られた要素がすべて整数であるかを厳密にチェックするべきだが、
		// 仕様「1 個以上の数字列がカンマで区切られて並んでいることです」と「空行、および数字とカンマ以外を含む行は妥当ではありません」から、
		// 以下の条件で判定する。
		isValid := true
		if len(parts) == 0 {
			// カンマのみ、または空の文字列のみ（trimしても空になる場合）
			// 例: "," や "" の場合
			// ただし、元の行が空行でなければ、末尾のカンマのみのケースも考慮する。
			if strings.TrimRight(line, ",") != "" {
				// カンマのみで構成されているが、それが「数字列」ではない場合。
				// この課題では、"1 個以上の数字列"が求められているため、数字列が一つもなければ不妥当とする。
				isValid = false
			}
		}

		// 厳密に「数字列」であるかを確認する（すべての要素が整数であるか）
		for _, part := range parts {
			_, err := fmt.Sscanf(part, "%d", &part)
			if err != nil {
				// 数字列ではない要素が含まれている場合
				isValid = false
				break
			}
		}

		// 最後の行がカンマで終わっている場合も考慮する。
		// 例: "1,2," は妥当。
		// 末尾のカンマがあっても、前後の要素が数字であればOK。

		if isValid {
			validLines++
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理は省略（標準的な競技プログラミングの文脈では通常不要だが、ここでは必須ではない）
	}

	fmt.Printf("valid=%d\n", validLines)
}
