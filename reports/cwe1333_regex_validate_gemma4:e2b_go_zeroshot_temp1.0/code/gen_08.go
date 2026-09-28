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
		// 行の前後の空白を無視（今回は行全体をチェックするため、トリムする）
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// 妥当性の判定ロジック
		// 1. 数字とカンマ以外を含む行は不適
		// 2. 1個以上の数字列がカンマで区切られて並んでいること
		
		// 行をカンマで分割
		parts := strings.Split(trimmedLine, ",")

		// 妥当な行の判定
		// 妥当であるためには、少なくとも1つの区切りが存在し、
		// それらの要素が空文字列でないこと、あるいは末尾のカンマの許容性。
		
		// 仕様の解釈：
		// 「1 個以上の数字列がカンマで区切られて並んでいることです。末尾のカンマは許容します。」
		// これは、カンマで区切られた要素がすべて非空の数字列（またはそれに相当するもの）である必要があることを示唆します。
		// ただし、「数字とカンマ以外を含む行は妥当ではありません」という制約があるため、
		// splitの結果を詳細にチェックする必要があります。

		isValid := false
		if len(parts) > 0 {
			// 空行でなければ、splitの結果を評価する
			// 少なくとも1つの要素が存在し、それは空ではない、またはカンマの存在が条件となる
			
			// 例: "1,2,3" -> ["1", "2", "3"] (妥当)
			// 例: "1,2," -> ["1", "2", ""] (末尾のカンマは許容されるが、空要素が許容されるか？)
			
			// 「1 個以上の数字列がカンマで区切られて並んでいる」
			// これは、要素が数字列（数字とカンマのみで構成される）である場合に成立すると解釈します。
			
			// 各部分が数字列のみ（カンマや空白以外を含まない）であるかをチェックする
			allPartsAreValid := true
			for _, part := range parts {
				// partが空文字列であることは許容される（末尾のカンマによる）
				if part != "" {
					// 数字列のみであるかチェック
					for _, char := range part {
						if !('0' <= char && char <= '9') {
							allPartsAreValid = false
							break
						}
					}
				}
			}
			
			// 最終的な妥当性のチェック
			// 1. 行が空でない (既にチェック済み)
			// 2. 少なくとも1つの要素がある (len(parts) > 0)
			// 3. 数字とカンマ以外を含まない (上記ループでチェック)
			
			// 仕様が厳密に「カンマ区切りの整数列」を求めているため、
			// すべての要素が整数である（つまり数字のみ）ことを確認します。
			
			// 再度、仕様をシンプルに解釈します:
			// 妥当 = カンマで分割した要素が存在し、それらが全て数字または空文字列であること。
			
			// 最もシンプルな解釈に基づき、数字とカンマ以外の文字が含まれていないかをチェックします。
			
			isPotentiallyValid := true
			for _, part := range parts {
				if strings.ContainsAny(part, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ") {
					isPotentiallyValid = false
					break
				}
			}
			
			if isPotentiallyValid {
				// 1個以上の数字列がカンマで区切られて並んでいる (len(parts) >= 1)
				// 空行は除外されているため、len(parts) >= 1 は常に満たされる。
				
				// 妥当な行としてカウント
				validCount++
			}
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（ここでは省略）
	}

	fmt.Printf("valid=%d\n", validCount)
}
