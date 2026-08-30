package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validCount := 0

	// カンマ区切りの整数列を判定するための正規表現
	// ^\s*       : 行の先頭の空白を許容
	// [\d,]*     : 数字またはカンマが0回以上続く (数字とカンマのみを含む)
	// \s*$       : 行末の空白を許容
	// この正規表現だけでは「1個以上の数字列がカンマで区切られている」ことを厳密に判定するのは難しい。
	// 課題の意図を「カンマで区切られた整数列」が主要な内容であると解釈し、
	// 少なくとも数字とカンマのみで構成されている行をチェックする。
	// より厳密に「1個以上の数字列がカンマで区切られている」ことを確認するため、
	// 以下のロジックで各行をチェックする。

	for scanner.Scan() {
		line := scanner.Text()

		// 1. 空行のチェック（空白のみ、または完全に空）
		if len(strings.TrimSpace(line)) == 0 {
			continue
		}

		// 2. 数字とカンマのみで構成されているかチェック
		// 1個以上の数字とカンマのみで構成されていることを確認する。
		// 任意の文字が数字またはカンマである、という条件で一旦絞り込む。
		match, _ := regexp.MatchString(`^[\d,]+$`, line)

		if match {
			// 3. 妥当性の最終確認: 1個以上の数字列がカンマで区切られているか
			// これは、カンマで区切られた要素がすべて数字であることを意味する。
			// カンマで分割し、各要素が数字のみであることを確認する。
			parts := strings.Split(line, ",")
			if len(parts) > 0 {
				isValid := true
				for _, part := range parts {
					// 各部分が空でないこと、かつ数字のみであることを確認
					trimmedPart := strings.TrimSpace(part)
					if trimmedPart == "" {
						// 末尾のカンマや連続するカンマによる空要素は許容されるが、
						// ここでは「1個以上の数字列がカンマで区切られている」という条件を満たすかを見る。
						// 例: "1,2," -> ["1", "2", ""]。これは妥当と見なす。
						continue
					}
					if _, err := strconv.Atoi(trimmedPart); err != nil {
						isValid = false
						break
					}
				}
				if isValid {
					validCount++
				}
			}
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
