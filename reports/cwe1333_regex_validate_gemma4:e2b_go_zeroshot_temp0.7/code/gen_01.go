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
		// 行の前後の空白を無視
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマを除去して判定
		// 末尾のカンマは許容されるため、カンマで区切られた数字列が存在するかどうかをチェックする
		
		// 行全体をカンマで分割する
		parts := strings.Split(trimmedLine, ",")
		
		// 妥当である条件: 1個以上の数字列がカンマで区切られて並んでいること。
		// これは、分割された要素が少なくとも1つ存在すること、かつ、その要素が全て数字（または数字列）で構成されていることを意味する。
		// 仕様によれば、「1 個以上の数字列がカンマで区切られて並んでいる」ことが妥当である。
		// 空行は除外された。
		// 数字とカンマ以外を含む行は妥当ではない。

		// 各部分が空でないことを確認し、かつ、それが数字列のみで構成されているかを確認する。
		// ただし、仕様は「カンマ区切りの整数列」が妥当である、ということを示唆している。
		// 最もシンプルな解釈として、カンマで区切られた後に数字列が続くことを確認する。

		isValid := false
		for _, part := range parts {
			// 部分が空でないことを確認 (末尾のカンマで終わる場合、最後の要素は空文字列になる可能性がある)
			if part != "" {
				// 部分が整数列のみで構成されているかチェック
				if _, err := fmt.Sscan(part); err == nil {
					// Sscanが成功すれば、その部分が整数として解釈可能である
					isValid = true
					break // 1つでも有効な数字列があればOK
				}
			}
		}

		// 末尾のカンマの扱いの再確認:
		// 例: "1,2,3," -> parts = ["1", "2", "3", ""]
		// この場合、"1", "2", "3" は数字列であり、isValid = true となる。これは妥当。
		// 例: "abc," -> parts = ["abc", ""]
		// "abc" は数字列ではないため、isValid = false。これは妥当。
		// 例: "," -> parts = ["", ""]
		// isValid = false。これは妥当。
		// 例: "1," -> parts = ["1", ""]
		// isValid = true。これは妥当。

		if isValid {
			validCount++
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視しても良いが、堅牢性のために残す）
	}

	fmt.Printf("valid=%d\n", validCount)
}
