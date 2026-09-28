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
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマは許容される
		// 妥当であるためには、少なくとも1個の数字列がカンマで区切られている必要がある。
		// これは、カンマで区切られた後、少なくとも1つの数字列が存在すれば良い、ということを意味する。
		// ただし、仕様の「1 個以上の数字列がカンマで区切られて並んでいること」をどう解釈するか。
		// 例: "1,2,3" -> 3つの数字列。妥当。
		// 例: "1," -> 2つの数字列 (1, 空文字列) または 1つの数字列とカンマ。
		// 仕様を「カンマで区切られた要素が1つ以上存在すること」と解釈する。

		// カンマで分割する
		parts := strings.Split(trimmedLine, ",")

		// 妥当性の判定
		// 1. 空行でないこと (既にチェック済み)
		// 2. 数字とカンマ以外を含む行でないこと (Splitの結果が数字のみで構成されているかを確認)
		// 3. 1個以上の数字列がカンマで区切られていること
		
		// 1. 数字とカンマ以外を含む行のチェック:
		// Splitの結果の各要素が数字のみで構成されているか、または空文字列であるかを確認する。
		isValid := true
		for _, part := range parts {
			// 各要素が数字のみで構成されているか、または空文字列であるかを確認する。
			// 厳密に「数字列」が求められているため、各要素が数字のみで構成されているかを確認する。
			if part != "" {
				if _, err := fmt.Sscan(part); err != nil {
					// 数字に変換できない文字が含まれている場合（例: "a,1"）
					isValid = false
					break
				}
			}
		}

		if !isValid {
			continue
		}

		// 2. 1個以上の数字列がカンマで区切られていることのチェック
		// これは、Splitの結果の要素の数が1以上であれば満たされる。
		// 例: "1" -> ["1"] (長さ1) -> 妥当
		// 例: "," -> ["", ""] (長さ2) -> 妥当 (空文字列が許容されるか？)
		// 仕様：「1 個以上の数字列がカンマで区切られて並んでいる」
		// 空文字列が数字列ではないため、空文字列が混ざっていても、実質的な数字列が1つ以上あれば良い。

		// 妥当な数字列の数を数える
		digitCount := 0
		for _, part := range parts {
			if part != "" {
				// partが数字列であるかチェック（Sscanでエラーが出なければ数字のみ）
				if _, err := fmt.Sscan(part); err == nil {
					digitCount++
				} else {
					// これは上記で既にチェックされているはずだが、念のため
					isValid = false
					break
				}
			}
		}

		if isValid && digitCount >= 1 {
			validCount++
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視しても良いが、ここでは無視）
	}

	fmt.Printf("valid=%d\n", validCount)
}
