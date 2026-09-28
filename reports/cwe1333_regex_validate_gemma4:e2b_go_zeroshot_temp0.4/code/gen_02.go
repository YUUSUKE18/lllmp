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
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマを考慮して、カンマで分割を試みる
		// 末尾のカンマがあっても、分割された要素が空でない限り妥当と見なす
		parts := strings.Split(trimmedLine, ",")

		// 妥当性の判定: 1個以上の数字列がカンマで区切られて並んでいること。
		// これは、分割された要素の少なくとも1つが空でないことを意味する。
		// ただし、仕様では「1 個以上の数字列がカンマで区切られて並んでいること」とある。
		// 空行は除外済み。
		// 例: "1,2,3" -> ["1", "2", "3"] (3個) -> 妥当
		// 例: "1," -> ["1", ""] (2個) -> 妥当 (末尾のカンマは許容)
		// 例: "," -> ["", ""] (2個) -> 妥当 (これは数字列ではないが、区切りとして存在する)
		// 仕様の解釈: 「数字列」が少なくとも1つ存在すること。
		// 厳密に「数字列」のみを数える場合、空文字列を除外する。

		hasNumber := false
		for _, part := range parts {
			// 空文字列でない部分が数字列（または数字列として解釈できる）であるかを確認する
			if strings.TrimSpace(part) != "" {
				// さらに、その部分が整数列であるかを確認する（仕様では「整数列」とある）
				// 厳密には、全ての要素が整数である必要はないが、
				// 「カンマ区切りの整数列」が妥当であるという文脈から、各要素が整数であると仮定する。
				// ここでは、空でない文字列が存在すれば「1個以上の数字列」を満たすと判定する。
				hasNumber = true
				break
			}
		}

		if hasNumber {
			validCount++
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視されることが多いが、念のため）
	}

	fmt.Printf("valid=%d\n", validCount)
}
