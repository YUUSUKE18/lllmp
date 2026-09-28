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
		// 行の前後の空白を無視するため、トリムする
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマは許容されるため、行全体をチェックする
		// 妥当なのは「1個以上の数字列がカンマで区切られて並んでいること」
		// これは、カンマで区切られた要素が存在し、かつそれが数字列で構成されていることを意味する。
		// 最も簡単な判定は、行が空でなく、数字とカンマ以外を含まないか、またはカンマで区切られているか、という点。

		// 仕様の再解釈: 「1 個以上の数字列がカンマで区切られて並んでいること」
		// これは、行がカンマで区切られた要素（数字列）で構成されている必要がある。
		// 例: "1,2,3" -> 妥当
		// 例: "1," -> 妥当 (末尾のカンマは許容)
		// 例: "abc" -> 不妥当 (数字列ではない)
		// 例: "1,a" -> 不妥当 (数字列ではない)
		// 例: "" -> 不妥当 (空行)

		// 行をカンマで分割する
		parts := strings.Split(trimmedLine, ",")

		// 妥当性の判定
		// 1. 少なくとも1つの要素が存在すること (空行でないこと)
		// 2. 各要素が数字列であること (カンマ区切りの整数列)

		isValid := false
		if len(parts) > 0 {
			// すべての要素が空文字列でなく、かつ数字列であることを確認する
			for _, part := range parts {
				// partが空文字列の場合（例: "1,,2" の中間や末尾のカンマによる空要素）
				// または、数字以外の文字が含まれている場合をチェックする
				if part == "" {
					// 末尾のカンマが許容されるため、末尾の要素が空になるのは許容されるか？
					// 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
					// "1," の場合、parts=["1", ""]。要素は2つ。1つは数字列、もう1つは空。
					// この解釈では、空要素は許容されないと考えるのが自然。
					// ただし、"1," は妥当と見なしたい。
					// "1," -> parts=["1", ""]. 1個の数字列が区切られていると解釈できる。
					// 妥当なのは、カンマで区切られたものが「整数列」であること。
					// 空要素を許容しないと厳密に「整数列」の集合とは言えない。
					continue // 空要素はスキップ（後述のロジックで全体を判定）
				}
				// partが完全に整数（数字列）であるかチェック
				if _, err := fmt.Sscan(part); err == nil {
					// Sscanが成功すれば、その文字列は整数として解釈可能（数字列）
					isValid = true
				} else {
					// 数字以外の文字が含まれている場合（例: "a"）
					isValid = false
					break
				}
			}
			
			// 最後の要素が空でなく、かつ全ての要素が数字列であれば妥当
			// ただし、"1," の場合、parts=["1", ""], isValidはtrueになるべき。
			// 妥当なのは、少なくとも1つの要素が数字列であること。
			
			// 再度、仕様を厳密に解釈: 「1 個以上の数字列がカンマで区切られて並んでいること」
			// これは、行全体が「数字列とカンマの組み合わせ」で構成されていることを意味する。
			// 空行と数字とカンマ以外を含む行は不妥当。
			
			// 簡略化された判定: 行が空でなく、カンマと数字のみで構成されているか。
			isStrictlyValid := true
			for _, char := range trimmedLine {
				if char != ',' && char < '0' || char > '9' {
					isStrictlyValid = false
					break
				}
			}
			
			if isStrictlyValid {
				// 最後に、少なくとも1つの数字列が存在するか確認する。
				// " ," や "," のような行は、isStrictlyValidでtrueになるが、数字列がないため不妥当。
				hasNumber := false
				for _, part := range parts {
					if part != "" {
						// partが数字列であるか確認（isStrictlyValidで既に数字のみ保証されているはずだが念のため）
						if _, err := fmt.Sscan(part); err == nil {
							hasNumber = true
							break
						}
					}
				}
				
				if hasNumber {
					validCount++
				}
			}
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は不要だが念のため）
	}

	fmt.Printf("valid=%d\n", validCount)
}
