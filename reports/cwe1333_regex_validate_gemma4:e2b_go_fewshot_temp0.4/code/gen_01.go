package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validLines := 0

	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())

		if line == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマを除去して、カンマで区切られた数字列が残っているか確認する
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// カンマのみ、またはカンマで終わる行（例: ",," または "1,"）は妥当ではない
			continue
		}

		// カンマで区切られた要素をチェックする
		parts := strings.Split(line, ",")
		
		// 少なくとも1つの要素があり、かつその要素が数字のみで構成されているかを確認する
		isValid := true
		for _, part := range parts {
			// 各部分が空でないことを確認
			if strings.TrimSpace(part) == "" {
				// 末尾のカンマが原因で空の要素が生成される場合（例: "1," -> ["1", ""]）
				// ただし、仕様では「1個以上の数字列がカンマで区切られて並んでいること」が重要。
				// 末尾のカンマは許容されるため、空の要素が複数ある場合は注意が必要。
				// ここでは、数字とカンマ以外を含む行は妥当ではないという制約を優先する。
				// 厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する。
				
				// 末尾のカンマが許容されるため、最後の要素が空でもOKとする。
				// ただし、数字とカンマ以外を含む行はNG。
				// 以下のチェックで十分と判断する。
			}
			
			// 各部分が数字のみで構成されているかを確認する（数字とカンマ以外を含む行はNG）
			if !strings.TrimRight(part, ",") == part {
				// このチェックは、入力が「カンマ区切りの整数列」であるという前提を厳密に適用する。
				// 実際には、入力が「数字とカンマのみ」で構成されているかを確認する。
				
				// より簡単なチェックとして、行全体が数字とカンマのみで構成されているか確認する。
				// もし、各要素が整数であるという制約を厳密に適用するなら、以下のようにする。
			}
		}

		// 最終的な妥当性の判定ロジックを再検討する。
		// 「1 個以上の数字列がカンマで区切られて並んでいる」
		// 「空行、および数字とカンマ以外を含む行は妥当ではない」

		// 1. 空行は除外済み。
		// 2. 数字とカンマ以外を含む行は除外する。
		
		// 妥当な行の判定を、各要素が整数であるか、および形式が整っているかに基づいて行う。
		
		allPartsAreValid := true
		for _, part := range parts {
			// 各部分が整数であるかチェック
			if _, err := fmt.Sscanf(strings.TrimSpace(part), "%d", new(int)); err != nil {
				allPartsAreValid = false
				break
			}
		}

		if allPartsAreValid {
			// 少なくとも1つの要素が存在すれば妥当
			if len(parts) > 0 {
				validLines++
			}
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
