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
		// 行の前後の空白を無視するため、文字列全体を処理する
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマを許容するため、行全体をそのままチェックする
		// 妥当である条件: 1個以上の数字列がカンマで区切られていること。
		// つまり、カンマで区切られた要素が少なくとも1つ存在し、
		// それらの要素がすべて整数で構成されている必要がある。

		// 行が空でなければ、少なくとも1つの要素（数字列）が存在する。
		// 妥当性の判定は、行が「カンマ区切りの整数列」として妥当かどうか。
		// 仕様によれば、「1 個以上の数字列がカンマで区切られて並んでいること」が妥当。

		// 1. 行がカンマで区切られた文字列として解釈できるか？
		// 2. 区切られた各部分が整数であるか？

		// 空白や数字とカンマ以外の文字が含まれていないかチェックする
		isValidFormat := true
		for _, r := range trimmedLine {
			if r != ',' && !('0' <= r && r <= '9') {
				isValidFormat = false
				break
			}
		}

		if !isValidFormat {
			continue // 数字とカンマ以外を含む行は妥当ではない
		}

		// 区切り文字で分割する
		parts := strings.Split(trimmedLine, ",")

		// 1個以上の数字列がカンマで区切られているか？
		// 空行は除外済みなので、partsの長さが0以上であることは保証される。
		// ただし、"1," や "," のようなケースも考慮する必要がある。

		// 各部分が空でない（つまり、数字列が存在する）ことを確認する。
		// 末尾のカンマは許容されるため、最後の要素が空になる可能性がある。

		// 妥当であるためには、少なくとも1つの非空の数字列が存在する必要がある。
		hasValidNumber := false
		for _, part := range parts {
			// 空文字列でないことを確認
			if strings.TrimSpace(part) != "" {
				// その部分がすべて数字のみであることを確認する（既に上記のisValidFormatで大枠はチェック済みだが、念のため）
				if _, err := fmt.Sscan(part); err == nil {
					hasValidNumber = true
					// 妥当な数字列が1つでもあればOK
					break
				}
			}
		}

		if hasValidNumber {
			validCount++
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は不要だが念のため）
	}

	fmt.Printf("valid=%d\n", validCount)
}
