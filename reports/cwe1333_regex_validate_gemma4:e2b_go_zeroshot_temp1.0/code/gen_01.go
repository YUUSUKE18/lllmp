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

		// 末尾のカンマは許容する
		// 行全体をカンマで分割して、少なくとも1つの数値列が存在するか確認する
		parts := strings.Split(trimmedLine, ",")

		// 妥当性の判定: 1個以上の数字列がカンマで区切られて並んでいること
		// この場合、partsの長さが0以上であれば、少なくとも1つの要素が存在する。
		// ただし、空の文字列がそのまま含まれている場合（例: ",," や "1,,2"）、
		// その要素が数字列でなければならない。

		isValid := false
		for _, part := range parts {
			// 各部分が空文字列でないことを確認する
			if part != "" {
				// 部分が数字列であるかを確認する（Goのstrconv.Atoiなどを使うのが一般的だが、
				// 仕様から「数字列」というより「数字列のリスト」として解釈し、空でない要素があれば妥当とする）
				// 仕様の「1 個以上の数字列がカンマで区切られて並んでいること」を厳密に解釈する。
				// これは、カンマで区切られた各要素が「整数列」でなければならないことを意味する。

				// 各要素が整数列であるかチェック（空でないことを確認済み）
				if _, err := fmt.Sscan(part); err == nil {
					// Sscanが成功すれば、その文字列は整数列である（または整数として解釈可能）
					isValid = true
					break
				}
			}
		}

		if isValid {
			validCount++
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（ここでは無視して続行）
	}

	fmt.Printf("valid=%d\n", validCount)
}
