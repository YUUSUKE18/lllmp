package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validLines := 0

	// 正規表現: 
	// ^\s*       -> 行頭の任意の空白
	// [0-9,]+    -> 1つ以上の数字
	// (?:,\s*[0-9,]+)* -> カンマと空白に区切られた数字のグループが0回以上繰り返される (末尾のカンマも考慮)
	// \s*$       -> 行末の任意の空白
	// この正規表現は、数字とカンマのみで構成され、1つ以上の数字が含まれていることを確認する。
	// より厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認するため、以下のロジックを採用します。

	// 行ごとに判定を行うため、各行を読み込んでから判定します。
	for scanner.Scan() {
		line := scanner.Text()
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// 妥当性のチェック: 
		// 1. 数字とカンマ以外の文字が含まれていないか (行全体が数字とカンマで構成されているか)
		// 2. 1個以上の数字が含まれているか
		
		// 数字とカンマのみで構成されているかチェック (末尾のカンマも許容)
		// これは、行が「数字」と「カンマ」だけで構成されていることを意味します。
		// 末尾のカンマは許容されるため、末尾がカンマで終わる場合も許容する必要があります。
		
		// 正規表現で「数字とカンマのみ」をチェック:
		// ^[0-9,]*$ : 任意の数の数字とカンマのみで構成されているか。
		// このチェックだけでは「1個以上の数字列」が満たされているか保証されません。

		// 1. 行をカンマで分割し、空でない要素があるかを確認する（よりロジカルなアプローチ）
		parts := strings.Split(trimmedLine, ",")
		
		isValid := false
		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart != "" {
				// 少なくとも1つの非空の数字列が存在すれば妥当
				isValid = true
			}
		}
		
		// 末尾のカンマが続く場合 (例: "1,2,")、partsの最後の要素は""になる。
		// このロジックで、"1,2," は parts = ["1", "2", ""] となり、isValidはtrueになる。
		
		if isValid {
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
