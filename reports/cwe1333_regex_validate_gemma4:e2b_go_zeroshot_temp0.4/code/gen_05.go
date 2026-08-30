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
		// 行の前後の空白を無視する（ここでは行全体を処理するため、前後の空白は不要だが、
		// 念のためトリムして処理する）
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// 妥当性の判定ロジック
		// 1. 数字とカンマ以外を含む行は妥当ではない
		// 2. 1個以上の数字列がカンマで区切られて並んでいること
		
		// 数字とカンマのみで構成されているかを確認
		isValidFormat := true
		for _, char := range trimmedLine {
			if !('0' <= char && char <= '9' || char == ',') {
				isValidFormat = false
				break
			}
		}

		if !isValidFormat {
			continue // 数字とカンマ以外を含む行は妥当ではない
		}

		// カンマ区切りの整数列の妥当性を確認
		// 末尾のカンマは許容する。
		
		// カンマで分割してみる
		parts := strings.Split(trimmedLine, ",")
		
		// 妥当であるためには、少なくとも1つの要素（数字列）が存在する必要がある。
		// ただし、空の要素（例: ",," や ",," のようにカンマのみで区切られた場合）は許容されない。
		// 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
		
		// 1. 少なくとも1つの要素が存在すること
		if len(parts) == 0 {
			// これは strings.Split の性質上、trimmedLineが空でない限り発生しないが、念のため
			continue
		}

		// 2. 1個以上の数字列が存在すること
		// partsが空でない限り、少なくとも1つの要素は存在する。
		// ただし、空の文字列（数字列ではない）が含まれていないかを確認する必要がある。
		
		hasNumberColumn := false
		for _, part := range parts {
			// 空文字列でない、かつ数字のみで構成されているかを確認
			if part != "" {
				// 完全に数字のみで構成されているかを確認 (カンマが含まれていないことを確認)
				if strings.Trim(part, ",") != "" {
					// partが数字列（カンマを含まない）であるかを確認
					if strings.Trim(part, ",") == part {
						hasNumberColumn = true
					}
				}
			}
		}
		
		// よりシンプルな判定：カンマで分割した結果、少なくとも1つの要素が数字列であること。
		// 末尾のカンマは許容されるため、末尾がカンマで終わる場合でも、最後の要素が空文字列になる可能性がある。
		// 例: "1,2," -> ["1", "2", ""]
		// 例: "1,2" -> ["1", "2"]
		
		// 妥当なのは、カンマで区切られた要素の中に、少なくとも1つの非空の数字列が含まれている場合。
		
		isTrulyValid := false
		for _, part := range parts {
			// partが空でない、かつその部分が純粋な整数列であるかを確認する
			if part != "" {
				// その部分が数字のみで構成されているか（カンマが含まれていないか）
				if strings.Trim(part, ",") == part {
					isTrulyValid = true
					break
				}
			}
		}

		if isTrulyValid {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
