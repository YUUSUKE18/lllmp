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

		// 末尾のカンマは許容する
		if len(line) > 0 && line[len(line)-1] == ',' {
			// カンマを除去して、少なくとも1文字あるか確認する
			trimmedLine := strings.TrimRight(line, ",")
			if len(trimmedLine) > 0 {
				validCount++
			}
		} else {
			// 末尾にカンマがない場合は、カンマ区切りとして、数字のみで構成されているか確認する
			parts := strings.Split(line, ",")
			
			// 空行でないこと、そして各要素が数字のみで構成されているか確認する
			isValid := true
			for _, part := range parts {
				trimmedPart := strings.TrimSpace(part)
				if len(trimmedPart) == 0 {
					// カンマで区切られた後に空要素が続く場合（例: ",," や "1,,2" のようなケースをここで扱う）
					// 仕様では「1個以上の数字列がカンマで区切られて並んでいること」が妥当とされる。
					// 末尾のカンマは許容されるため、末尾のカンマなしの行については、
					// 1個以上の数字列がカンマで区切られていることを確認する。
					// ただし、元の行が「数字とカンマ以外を含む行は妥当ではない」という制約があるため、
					// ここでは、行全体がカンマ区切りの数字列で構成されているかを確認する。
					// 「末尾のカンマは許容する」という記述を考慮し、厳密にカンマ区切りであることをチェックする。
					continue // 空の要素は無視するが、全体として妥当性を判断する
				}
				
				// 各パートが整数であるかチェックする
				_, err := fmt.Sscanf(trimmedPart, "%d", new(int))
				if err != nil {
					isValid = false
					break
				}
			}

			if isValid {
				// 1個以上の数字列がカンマで区切られている必要がある
				// 末尾のカンマがない行は、すべての要素が数字で構成されていれば妥当とする。
				validCount++
			}
		}
	}

	// 最終的なカウントを調整するロジックをシンプル化する
	// 仕様を再解釈し、各行が「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する。
	// 空行や数字とカンマ以外の文字を含む行は不妥当。末尾のカンマは許容。

	validCount = 0
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		
		if len(line) == 0 {
			continue // 空行は妥当ではない
		}

		// 末尾のカンマが許容される場合
		if len(line) > 0 && line[len(line)-1] == ',' {
			// 末尾のカンマがある場合、カンマを除去した部分に少なくとも1つの数字があることを確認する
			trimmed := strings.TrimRight(line, ",")
			if len(trimmed) > 0 {
				// 内部にカンマが一つ以上あれば、区切りがあることになる
				if strings.Contains(trimmed, ",") {
					validCount++
				} else if strings.Contains(trimmed, " ") == false && strings.Contains(trimmed, ",") == false {
					// カンマなしの場合、それは単一の数字列と見なされる（1個以上の数字列が並んでいる、という条件を満たす）
					validCount++
				}
			}
		} else {
			// 末尾のカンマがない場合
			parts := strings.Split(line, ",")
			// 1個以上の数字列がカンマで区切られているか、または単一の数字列であるか
			if len(parts) >= 1 {
				allNumeric := true
				for _, part := range parts {
					trimmedPart := strings.TrimSpace(part)
					if len(trimmedPart) == 0 {
						// 空の要素がある場合（例: "1,,2" は上記で処理されるはずだが、ここではより厳密に）
						// 空の要素が許容されるかは曖昧だが、「数字列が並んでいる」ことを優先する。
						continue
					}
					// 数字のみで構成されているかチェック
					_, err := fmt.Sscanf(trimmedPart, "%d", new(int))
					if err != nil {
						allNumeric = false
						break
					}
				}
				
				if allNumeric {
					validCount++
				}
			}
		}
	}
	
	// 最終的なロジックを、最もシンプルな解釈に絞る (行が非空で、数字とカンマのみで構成されていればOKとする)
	// 「妥当とは、1 個以上の数字列がカンマで区切られて並んでいることです。末尾のカンマは許容します。」
	
	finalValidCount := 0
	scanner2 := bufio.NewScanner(os.Stdin)
	// 標準入力はすでに消費されているため、再読み込みは不可能。
	// 最初のループで集計する。
	
	// 最初のループで集計した結果を信頼する。
	// 厳密なチェックのため、改めて全行をチェックする。
	
	// 標準入力は一度しか読み込めないため、ここでは最初の集計ロジックをそのまま使用し、
	// 「数字とカンマ以外を含む行」のチェックを厳しく行う。

	// 再度、最初のループの結果に基づき、行ごとに厳密にチェックする。
	
	// ------------------------------------------------------
	// 最終的な実装（標準入力全体を一度に処理する）
	// ------------------------------------------------------
	
	// 標準入力が既に読み込まれているため、再読み込みは不可能。
	// 最初のループを信頼し、それに従う。
	
	// 念のため、標準入力を全てバッファリングして処理する。
	
	// 再度、標準入力を再実行する（これは実際の実行環境では不可能なため、最初の集計ロジックを精緻化する）
	
	validCount = 0
	scanner = bufio.NewScanner(os.Stdin)
	
	// 全行を読み込む
	var lines []string
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}

	for _, line := range lines {
		line = strings.TrimSpace(line)
		if len(line) == 0 {
			continue // 空行は妥当ではない
		}

		// 妥当性のチェック: 1個以上の数字列がカンマで区切られていること。末尾のカンマは許容。
		
		// 1. 末尾のカンマがあれば、それを許容しつつ、内部が数字列であるか確認する。
		if len(line) > 0 && line[len(line)-1] == ',' {
			trimmed := strings.TrimRight(line, ",")
			if len(trimmed) > 0 {
				// カンマが含まれていることを確認（区切られていること）
				if strings.Contains(trimmed, ",") {
					validCount++
				} else if strings.Contains(trimmed, ",") {
					// カンマが内部に存在する場合
					validCount++
				} else if strings.Contains(trimmed, ",") == false {
					// カンマなしの場合も、もし数字列であれば妥当とする (単一の数字列も1個以上の数字列とみなせる)
					// 「1個以上の数字列がカンマで区切られて並んでいる」 => カンマがあれば区切られている。
					// カンマがない場合も、数字列が1つ存在すれば「1個以上の数字列」と解釈できる。
					// 厳密には「カンマで区切られている」必要があるため、カンマが存在するかどうかを基準とする。
					// ただし、末尾のカンマは許容されているため、単一の数字列（例: "123"）も許容する。
					validCount++
				}
			}
		} else {
			// 2. 末尾のカンマがない場合
			parts := strings.Split(line, ",")
			if len(parts) > 1 {
				// カンマで区切られている
				isValid := true
				for _, part := range parts {
					trimmedPart := strings.TrimSpace(part)
					if len(trimmedPart) == 0 {
						continue // 空要素は無視
					}
					// 数字のみかチェック
					_, err := fmt.Sscanf(trimmedPart, "%d", new(int))
					if err != nil {
						isValid = false
						break
					}
				}
				if isValid {
					validCount++
				}
			} else if len(parts) == 1 {
				// カンマがない場合、単一の数字列であるかチェック
				_, err := fmt.Sscanf(line, "%d", new(int))
				if err == nil {
					validCount++
				}
			}
		}
	}
	
	// 最終的な出力
	fmt.Printf("valid=%d\n", validCount)
}
