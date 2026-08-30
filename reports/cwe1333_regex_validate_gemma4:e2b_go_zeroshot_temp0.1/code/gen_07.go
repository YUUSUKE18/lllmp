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
		// 行の前後の空白を無視する（ここでは行全体を処理するため、トリムは不要だが、
		// 後の処理で空白を考慮する）

		// 末尾の空白を除去して処理
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// 妥当性の判定ロジック
		// 1. 数字とカンマ以外を含む行は妥当ではない
		// 2. 1個以上の数字列がカンマで区切られて並んでいること
		// 3. 末尾のカンマは許容する

		// 行をカンマで分割する
		parts := strings.Split(trimmedLine, ",")

		// 妥当な行であるためには、少なくとも1つの要素（数字列）が存在する必要がある。
		// ただし、空の要素が複数ある場合（例: ",," や "1,,2" のようなケース）を考慮する必要がある。

		// 妥当な行の定義を再確認:
		// 「1 個以上の数字列がカンマで区切られて並んでいること」
		// これは、分割された要素の中に、空でない文字列（数字列）が少なくとも1つ含まれていることを意味する。

		hasValidNumberSequence := false
		for _, part := range parts {
			// 各部分が空でなく、かつ数字列であるかを確認する
			if part != "" {
				// 数字列であるかどうかの厳密なチェックは仕様に明記されていないが、
				// 「カンマ区切りの整数列」という文脈から、各要素が整数を表す文字列であると仮定する。
				// ここでは、要素が空でなければ、それは「数字列」としてカウントする。
				// 厳密に「整数列」であるかどうかのチェックは、後続の処理で数字のみを抽出する際に適用する。
				hasValidNumberSequence = true
			}
		}

		// 妥当な行の判定
		// 1. 空行でないこと (既にチェック済み)
		// 2. 数字とカンマ以外を含まないこと (これは、Splitの結果が数字とカンマのみで構成されているか、またはそれ以外の文字が含まれていないことを意味する)
		// 3. 1個以上の数字列がカンマで区切られていること (hasValidNumberSequenceがtrue)

		// 念のため、行全体が数字とカンマのみで構成されているかを確認する。
		isValidFormat := true
		for _, char := range trimmedLine {
			if !('0' <= char && char <= '9' || char == ',') {
				isValidFormat = false
				break
			}
		}

		if isValidFormat && hasValidNumberSequence {
			validCount++
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視されることが多いが、念のため）
	}

	fmt.Printf("valid=%d\n", validCount)
}
