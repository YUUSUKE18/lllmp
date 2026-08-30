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
			// 空行は妥当ではない (1個以上の数字列がカンマで区切られている必要がある)
			continue
		}

		// 末尾のカンマを削除して処理する
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// カンマのみ、またはカンマのみで構成されている場合 (例: "," や ",," など)
			// 妥当な数字列が1個以上存在しないため、妥当ではない
			continue
		}

		// カンマで分割して、各要素が数字のみであることを確認する
		parts := strings.Split(trimmedLine, ",")
		isValid := true
		for _, part := range parts {
			if part == "" {
				// これは、連続するカンマ（例: "1,,2"）や、末尾のカンマによる空文字列を検出する場合に対応。
				// ただし、上記で trimmedLine を使っているため、これは主に数字以外の文字が含まれているか、
				// 意図しない構造を検出するのに役立つ。
				// ここでは、数字とカンマ以外の文字が含まれていないか、数字列が一つ以上存在するかをチェックする。
				// 仕様に従い、"1,2,3" のようにカンマ区切りの整数列である必要がある。
				continue
			}
			// 各部分が整数であるかチェック
			if _, err := fmt.Sscanf(part, "%d", new(int)); err != nil {
				isValid = false
				break
			}
		}

		// 妥当であるためには、分割された結果として少なくとも1つの非空の数字列が存在する必要がある。
		// trimmedLineが数字のみで構成されているか、またはカンマで区切られているかを確認する。
		// 少なくとも1つの要素（数字列）が存在すれば妥当とする。
		if isValid {
			// trimmedLineが数字とカンマだけで構成されているかを確認する。
			// より厳密に、すべての要素が整数であることを確認する（Splitで得られた結果が空文字列でないことを確認した上で）
			// この問題の意図を「カンマで区切られた整数列」の各要素が整数であることを確認することと解釈する。
			// 以下のロジックは、空行、数字とカンマ以外を含む行を拒否する。

			// 厳密なチェック：もしtrimmedLineをカンマで分割し、空でない要素が1つ以上あればOKとする。
			// ただし、仕様は「1個以上の数字列がカンマで区切られて並んでいること」なので、空文字や非数字文字は許容されない。
			
			// 再評価: trimmedLineが完全に整数列であるか、カンマで区切られた整数列であるかを検証する。
			// 例: "1,2,3" -> 妥当
			// 例: "1,2," -> 妥当 (末尾のカンマは許容)
			// 例: "abc" -> 不妥
			
			// 妥当性の判定をシンプルにするため、空行や数字とカンマ以外の文字が含まれていないかを確認する。
			// 実際には、数字とカンマのみで構成されているか、かつ、それが意味のある区切りであるか。
			
			// ここでは、TrimSpace後の行が、数字とカンマのみで構成されていることを主軸とする。
			// 厳密に「数字列」のみを含む、という解釈で、空文字を含まないことを確認する。
			if len(parts) > 0 {
				// 空の要素（""）は許容されるが、これは前述の処理で除外されているべき。
				// 妥当であるためには、少なくとも1つの数字列が存在する必要がある。
				hasNumber := false
				for _, part := range parts {
					if part != "" {
						// 実際に数字としてパース可能かチェック (Sscanfが成功したか、または文字列が数字のみか)
						if _, err := fmt.Sscanf(part, "%d", new(int)); err == nil {
							hasNumber = true
						} else {
							// 数字としてパースできない文字が含まれている場合
							isValid = false
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

	fmt.Printf("valid=%d\n", validCount)
}
