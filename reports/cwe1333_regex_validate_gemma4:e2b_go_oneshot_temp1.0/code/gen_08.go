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
		line := strings.TrimSpace(scanner.Text())

		if line == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマを除去して、カンマ区切りの整数列として評価する
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// カンマのみ、または空行からトリム後空になった場合（例: "," または ",,"）
			// 妥当なのは「1個以上の数字列がカンマで区切られている」場合。
			// 末尾のカンマは許容されるため、元の行がカンマのみでないことを確認する。
			// ただし、仕様では「1個以上の数字列がカンマで区切られて並んでいる」必要があるため、
			// 数字が含まれていない場合は妥当ではない。
			continue
		}

		// カンマで分割して、空でない要素が整数であることを確認する
		parts := strings.Split(line, ",")
		
		// 妥当なのは、分割された部分のうち、少なくとも1つが数字列である場合。
		// 末尾のカンマは許容されるため、strings.Splitの結果を利用する。
		
		hasDigits := false
		for _, part := range parts {
			// 部分文字列をトリムして数字のみが残っているか確認する。
			// 末尾のカンマが残っている場合を考慮するため、ここでは文字列が数字のみで構成されているかを確認する。
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart != "" {
				// 数字とカンマ以外を含む行は妥当ではない、という制約があるため、
				// 各部分が整数で構成されているかをチェックする必要がある。
				if _, err := fmt.Sscanf(trimmedPart, "%d", new(int)); err == nil {
					hasDigits = true
				} else {
					// 数字以外の文字が含まれていたら不適
					hasDigits = false
					break
				}
			}
		}

		// 末尾のカンマは許容される。
		// 1個以上の数字列がカンマで区切られている必要がある。
		// これは、カンマで分割した際に、数字が少なくとも1つ存在する場合に成立する。
		
		// よりシンプルに、カンマで区切られた要素をすべて取り出して、それらが整数であることを確認する。
		// 末尾のカンマは許容されるため、最後の要素が空文字列になる可能性がある。
		
		// 再評価: 「1 個以上の数字列がカンマで区切られて並んでいる」
		// 例: "1,2," -> parts = ["1", "2", ""]。数字列は2つある。妥当。
		// 例: ",," -> parts = ["", "", ""]。数字列は0個。不適。
		
		count := 0
		for _, part := range parts {
			trimmed := strings.TrimSpace(part)
			if trimmed != "" {
				// この部分が整数であることを確認
				if _, err := fmt.Sscanf(trimmed, "%d", new(int)); err == nil {
					count++
				} else {
					// 数字とカンマ以外を含む行は妥当ではない、という制約。
					// ここで、`trimmed` が純粋な整数文字列であるかを確認する必要がある。
					// 以下のチェックは、部分文字列が整数のみで構成されているかを厳密にチェックする。
					if strings.ContainsAny(trimmed, ", ") {
						// カンマやスペースが含まれている場合は不適
						// ただし、`strings.Split`で得られた部分にはカンマは含まれない。
					} else {
						// 数字以外の文字が含まれていないことを確認
						if _, err := fmt.Sscanf(trimmed, "%d", new(int)); err == nil {
							count++
						} else {
							// 整数として解析できなかった（例: "a"）
							// この行全体が不適
							goto nextLine
						}
					}
				}
			}
		}

		// 1個以上の数字列が区切られているか？
		if count >= 1 {
			validCount++
		}

	nextLine:
	}

	fmt.Printf("valid=%d\n", validCount)
}
