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
		// 行の前後の空白を無視する（ここでは行全体を処理するため、トリミングは不要だが、
		// 後の処理で空白を無視するロジックを適用する）

		// 行から前後の空白を削除して、実質的な内容をチェックする
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// 妥当性の判定ロジック
		// 妥当とは、「1 個以上の数字列がカンマで区切られて並んでいること」
		// 末尾のカンマは許容する。

		// 1. 末尾のカンマを取り除く（末尾のカンマは許容されるため、まずはチェック対象を調整する）
		// ただし、行全体が数字とカンマのみで構成されているかを確認する必要がある。

		// 行が完全に数字とカンマのみで構成されているかを確認する
		isValidFormat := true
		for _, char := range trimmedLine {
			if char != ',' && char != '0' && char != '1' && char != '2' && char != '3' && char != '4' && char != '5' && char != '6' && char != '7' && char != '8' && char != '9' {
				isValidFormat = false
				break
			}
		}

		if !isValidFormat {
			// 数字とカンマ以外を含む行は妥当ではない
			continue
		}

		// 2. カンマ区切りの整数列が1個以上存在するかをチェックする
		// 妥当な行は、カンマで区切られた複数の数字列が存在する場合。
		// 最小の妥当なケースは「1個以上の数字列がカンマで区切られている」こと。
		// 例: "1,2,3" -> 3つの数字列
		// 例: "1," -> 2つの数字列 (1と空の列) または 1つの数字列と末尾のカンマ
		// 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」

		// カンマで分割し、各要素が空でないことを確認する
		parts := strings.Split(trimmedLine, ",")
		
		// 末尾のカンマの扱いを考慮する。
		// 例: "1,2,3" -> ["1", "2", "3"] (長さ3)
		// 例: "1,2," -> ["1", "2", ""] (長さ3)
		// 例: "1," -> ["1", ""] (長さ2)
		// 例: "," -> ["", ""] (長さ2)

		// 妥当なのは、少なくとも1つの非空の数字列が存在する場合。
		hasValidNumberSequence := false
		for _, part := range parts {
			// 空文字列でない部分が数字列として存在すればOK
			if strings.TrimSpace(part) != "" {
				hasValidNumberSequence = true
				break
			}
		}

		if hasValidNumberSequence {
			validCount++
		}
	}

	// 結果の出力
	fmt.Println("valid=", validCount)
}
