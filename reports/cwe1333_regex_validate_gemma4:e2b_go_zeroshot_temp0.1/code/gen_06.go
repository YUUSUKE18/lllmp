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
		// 行の前後の空白を無視する（ここでは行全体を処理するため、TrimSpaceで前後の空白を除去）
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマは許容する
		// 妥当なのは「1個以上の数字列がカンマで区切られて並んでいること」
		// これは、カンマで区切られた要素が少なくとも1つ存在し、かつ、その区切りが数字のみで構成されていることを意味する。

		// 処理のロジック：
		// 1. 行が空でないこと (既にチェック済み)
		// 2. 数字とカンマ以外を含まないこと
		// 3. 少なくとも1つの数字列が存在すること

		// 行をカンマで分割する
		parts := strings.Split(trimmedLine, ",")

		// 妥当性の判定
		// 妥当であるためには、少なくとも1つの要素（数字列）が存在する必要がある。
		// ただし、空の要素が複数連続したり、数字以外の文字が含まれていたりしないことを確認する必要がある。

		isValid := false
		if len(parts) > 0 {
			// 各部分が数字列のみで構成されているか、または空文字列でないかを確認する
			// 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
			// これは、各要素が数字列である、または空文字列（末尾カンマなど）である、という解釈が自然。
			// ただし、「数字とカンマ以外を含む行は妥当ではない」という制約があるため、
			// 各要素が完全に数字のみで構成されていることを確認する。

			allPartsAreValid := true
			for _, part := range parts {
				// 各部分が数字のみで構成されているかチェック
				if part == "" {
					// 末尾のカンマによる空文字列は許容される（例: "1,2," -> ["1", "2", ""]）
					// ただし、もし行全体が数字列のみで構成されているなら、それは妥当。
					// 空文字列が許容されるのは、カンマの直後に来る場合のみ。
					// ここでは、空文字列が許容されることを前提とし、数字以外の文字が含まれていないかを確認する。
					continue
				}
				// 数字のみで構成されているかチェック
				if _, err := fmt.Sscan(part); err != nil {
					// 数字以外の文字が含まれている場合、妥当ではない
					allPartsAreValid = false
					break
				}
			}

			if allPartsAreValid {
				// 少なくとも1つの要素が存在すれば妥当
				isValid = true
			}
		}

		if isValid {
			validCount++
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視されることが多いが、念のため）
	}

	fmt.Printf("valid=%d\n", validCount)
}
