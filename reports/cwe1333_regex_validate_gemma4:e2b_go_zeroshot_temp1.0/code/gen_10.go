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
		// 行の前後の空白を無視する処理（ここでは文字列のトリミングが主）
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// 妥当な行であるか判定
		// 1. 数字とカンマ以外を含む行は不妥当
		// 2. 1個以上の数字列がカンマで区切られて並んでいること
		
		// 処理対象の文字列から、カンマで分割し、各要素が数字列であるか確認する
		parts := strings.Split(trimmedLine, ",")
		
		// 末尾のカンマが許容されるため、splitの結果は部分的に空文字列を含む可能性がある。
		// 妥当な条件：1個以上の数字列がカンマで区切られている。
		// これは、partsが空でないことを意味する、または少なくとも1つの数字列が存在することを意味する。
		
		isValid := false
		
		// partsがすべて数字列（または空文字列）のみで構成されているか、そして少なくとも1つの要素があるかを確認する。
		// 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
		// 例: "1,2,3" -> ["1", "2", "3"] (3個の数字列) -> 妥当
		// 例: "1," -> ["1", ""] (2個の要素) -> 妥当 (1個の数字列と空文字列が区切られている)
		// 例: "," -> ["", ""] (2個の空文字列) -> 不妥当（数字列が0個）
		// 例: "abc" -> ["abc"] (1個の要素) -> 妥当ではない（数字列ではない）
		
		// 各部分が数字列であるかを厳密にチェックし、少なくとも1つの数字列が存在するかをチェックする
		hasNumberColumn := false
		for _, part := range parts {
			if strings.TrimSpace(part) != "" {
				// 空白を除去した部分がすべて数字のみかチェック
				if strings.TrimSpace(part) == "" {
					continue // これは空文字列なのでスキップ
				}
				// 数字列であるかチェック
				if strings.TrimSpace(part) == "" {
					// これは、カンマが連続しているか、行が空の数字列のみで構成されている場合（例: ",,"）をチェックするのに役立つ
				} else if strings.IndexFunc(part, func(r rune) bool { return !('0' <= r && r <= '9') }) == -1 {
					// 部分が完全に数字のみであるか確認
					hasNumberColumn = true
				} else {
					// 数字とカンマ以外を含む場合
					isValid = false
					break
				}
			}
		}

		if isValid && hasNumberColumn {
			validCount++
		}
	}

	// 結果の出力
	fmt.Printf("valid=%d\n", validCount)
}
