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
		// 行の前後の空白を無視する（ここでは行全体を処理するため、トリムは不要だが、念のため）
		// 仕様では「行の前後の空白は無視します」とあるため、ここでは行の内容をそのまま評価する。

		// 末尾のカンマは許容する
		// 1個以上の数字列がカンマで区切られて並んでいること
		// 空行、および数字とカンマ以外を含む行は妥当ではない

		// 行をカンマで分割する
		parts := strings.Split(line, ",")

		// 妥当性の判定ロジック
		// 1. parts が空でないこと（行が完全に空でないこと）
		// 2. parts の中に少なくとも1つの数字列が存在すること
		// 3. 各要素が数字列のみで構成されていること（数字とカンマ以外を含む行は不適）

		isValid := false
		if len(parts) > 0 {
			// 末尾のカンマの有無を考慮して、実際に数字列が存在するか確認する
			// 例: "1,2,3" -> ["1", "2", "3"] (OK)
			// 例: "1,2," -> ["1", "2", ""] (OK, 空文字列は許容されるか？)
			// 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
			// 空文字列は数字列ではないため、空文字列が含まれている場合は不適と考えるのが自然。

			hasNumber := false
			for _, part := range parts {
				// 空文字列でないこと
				if part != "" {
					// その部分がすべて数字であることを確認（整数列であること）
					if _, err := fmt.Sscan(part); err == nil {
						// Sscanが成功すれば、その文字列は整数として解釈可能（数字列である）
						hasNumber = true
					} else {
						// 数字以外の文字が含まれている場合（例: "a"）
						isValid = false
						break
					}
				}
			}

			if hasNumber {
				// 少なくとも1つの数字列が存在すれば妥当
				isValid = true
			}
		}

		if isValid {
			validCount++
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視して終了）
	}

	// 厳密に valid=<妥当な行数> を出力
	fmt.Printf("valid=%d\n", validCount)
}
