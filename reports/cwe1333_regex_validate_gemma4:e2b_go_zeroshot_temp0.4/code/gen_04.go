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
		// 行の前後の空白を無視（ここでは行全体を処理するため、trimは必須ではないが念のため）
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマは許容する
		// 妥当な行とは「1 個以上の数字列がカンマで区切られて並んでいること」
		// これは、行内に数字とカンマのみが含まれており、少なくとも1つの数字列が存在すれば良い、と解釈する。
		// ただし、「カンマ区切りの整数列」が求められているため、カンマで区切られた要素が存在する必要があります。
		// 妥当性の判定基準を「カンマで区切られた数字の並びが存在するか」と解釈し、
		// 以下の条件で判定します。
		// 1. 数字とカンマ以外を含まないこと。
		// 2. 少なくとも1つの数字が含まれていること（カンマのみの行は除外）。

		isValid := false
		
		// 行をカンマで分割する
		parts := strings.Split(trimmedLine, ",")
		
		// 妥当性の判定: 1個以上の数字列がカンマで区切られていること
		// これは、分割された要素のうち、少なくとも1つが空でない（つまり数字列が存在する）ことを意味する。
		// ただし、仕様は「1 個以上の数字列がカンマで区切られて並んでいることです」なので、
		// 空の要素（例: ",," や "1,,2" のようなケース）を考慮する必要があります。
		
		// 厳密に「数字列」が存在するかどうかをチェックする
		hasNumber := false
		for _, part := range parts {
			// 空白を除去した部分が数字のみで構成されているかチェック
			if strings.TrimSpace(part) != "" {
				// その部分が整数であるかチェック
				if _, err := fmt.Sscanf(strings.TrimSpace(part), "%d", &hasNumber); err == nil {
					// 成功すれば、その部分には整数が含まれている
					hasNumber = true
				}
			}
		}
		
		// 補足：仕様を再解釈します。「カンマ区切りの整数列」が並んでいること。
		// これは、行がカンマで区切られた要素の集合であり、その要素がすべて整数である、ということを意味します。
		// 「空行、および数字とカンマ以外を含む行は妥当ではありません。」という制約から、
		// 妥当な行は「数字とカンマのみ」で構成され、かつ「1個以上の数字列」が存在する場合とします。
		
		// 簡略化された判定: 行がカンマで区切られた要素を持ち、その要素がすべて整数（または空でない）であること。
		// 末尾のカンマは許容。
		
		// 1. 数字とカンマ以外を含まないか？
		isAlphanumericOnly := true
		for _, char := range trimmedLine {
			if !('0' <= char && char <= '9' || char == ',') {
				isAlphanumericOnly = false
				break
			}
		}
		
		if !isAlphanumericOnly {
			continue // 数字とカンマ以外を含む行は不妥当
		}
		
		// 2. 1個以上の数字列がカンマで区切られているか？
		// 末尾のカンマは許容。
		// 例: "1,2,3" -> 3要素。妥当。
		// 例: "1," -> 2要素 (1, "")。1個の数字列が存在する。妥当。
		// 例: "," -> 2要素 ("", "")。数字列は0個。不妥当。
		
		// 妥当な行は、カンマで分割した際に、少なくとも1つの要素が数字列（空でない）であること。
		// ただし、空の要素が許容される場合（例: "1,,2"）、その要素が数字列でない場合は不妥当。
		
		// 最終的な妥当性の判定を、最もシンプルな解釈に戻します。
		// 「1 個以上の数字列がカンマで区切られて並んでいる」
		// これは、行がカンマで区切られたときに、少なくとも1つの非空の数字列が存在すれば良い、と解釈します。
		
		// 空の要素をフィルタリングし、残った要素がすべて数字列であることを確認する。
		hasValidNumberSequence := false
		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart != "" {
				// その部分が完全に整数であるかチェック
				if _, err := fmt.Sscanf(trimmedPart, "%d", &hasValidNumberSequence); err == nil {
					// 成功すれば、その部分が整数である
					hasValidNumberSequence = true
				} else {
					// 数字列ではない文字が含まれている場合（仕様違反）
					isValid = false
					break
				}
			}
		}

		if !isValid {
			continue
		}
		
		// 少なくとも1つの数字列が存在すれば妥当
		if hasValidNumberSequence {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
