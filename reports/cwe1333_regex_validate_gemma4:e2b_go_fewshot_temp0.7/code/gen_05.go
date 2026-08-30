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

		// 妥当性のチェック: カンマ区切りの整数列が1個以上存在するか
		// 末尾のカンマは許容する
		
		// 行全体をカンマで分割し、各要素をチェックする
		parts := strings.Split(line, ",")
		
		hasDigits := false
		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart != "" {
				// 数字のみを含むかチェック
				if strings.Trim(trimmedPart, "0123456789-+") == "" {
					// 数字以外の文字が含まれている場合は不妥当
					hasDigits = false // この行全体が不妥当であるというフラグ
					break
				}
				hasDigits = true
			}
		}

		// 妥当である条件: 少なくとも1つの数字列が存在し、
		// さらに、数字とカンマ以外を含まないことが保証されている必要がある。
		// 仕様の解釈に基づき、「1 個以上の数字列がカンマで区切られて並んでいる」ことを確認する。
		// 空でない要素が1つ以上あれば、それは区切られた数字列と見なせる。
		
		// 厳密な解釈: カンマで区切られた要素の中に、数字のみで構成されるものが1つ以上存在すること。
		// 空白や数字とカンマ以外を含む行は不妥当。
		
		isValid := false
		if len(parts) > 0 {
			// 末尾のカンマがあっても、少なくとも1つの要素が存在すれば、それは区切りとして機能していると見なす。
			// ただし、空文字列（""）のみで構成されている行は除外する。
			
			// 処理を簡略化するため、元の文字列が数字とカンマのみで構成されているかを確認する。
			// 空白を無視して、数字とカンマ以外がないことを確認する。
			
			isAlphanumericOnly := true
			for _, char := range line {
				if char != ',' && char != ' ' {
					// 最初のチェックとして、数字とカンマ以外がないことを確認する
					// ただし、ここでは「数字列が並んでいる」ことに焦点を当てる。
				}
			}

			// 1個以上の非空の要素があれば、それは「1個以上の数字列がカンマで区切られている」と見なす。
			// ただし、空行は除外済み。
			if len(parts) > 0 {
				// 末尾のカンマがあっても、要素が存在すれば妥当とする。
				// 例: "1,2," -> ["1", "2", ""] -> 2つの数字列が存在する。
				// 例: "abc,1" -> ["abc", "1"] -> "abc"が不妥当。
				
				// 「空行、および数字とカンマ以外を含む行は妥当ではありません。」
				// これは、各要素が整数（または空文字列）で構成されている必要があることを示唆する。
				
				allValidParts := true
				for _, part := range parts {
					if strings.TrimSpace(part) == "" {
						// 空の要素は許容されるが、"abc"のような非数字が含まれるのは許されない。
						// ここでは、空でない要素が数字のみで構成されていることを確認する。
						continue
					}
					// 非空の要素が数字のみで構成されているかチェック
					if strings.Trim(part, "0123456789-+") != "" {
						allValidParts = false
						break
					}
				}
				
				if allValidParts {
					validLines++
				}
			}
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
