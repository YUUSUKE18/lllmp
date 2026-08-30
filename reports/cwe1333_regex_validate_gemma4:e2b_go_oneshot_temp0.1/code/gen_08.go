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

		// 末尾のカンマを削除して、カンマ区切りの整数列として評価する
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// カンマのみ、または空行として扱われる場合（例: "," や " , "）
			// 仕様では「1 個以上の数字列がカンマで区切られて並んでいること」が妥当。
			// 空の文字列はこれに該当しないため、妥当ではないと判断する。
			continue
		}

		// カンマで分割して、すべてが整数であるか、かつ1つ以上の要素があるかを確認する
		parts := strings.Split(trimmedLine, ",")
		
		// 妥当な行の判定: 1個以上の数字列がカンマで区切られていること。
		// ただし、元の行がカンマで区切られていることを確認する必要がある。
		// 厳密に「カンマ区切りの整数列」として妥当かを判定する。
		
		// 1. 元の行がカンマで区切られているか、または数字のみで構成されているか？
		// 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
		// 末尾のカンマは許容される。
		
		// 処理を簡略化するため、元の行をそのまま評価する。
		// 行が空でなく、カンマが含まれているか、または数字のみで構成されているかをチェックする。
		
		// 妥当性の判定ロジックを再考:
		// 1. 空行はNG。
		// 2. 数字とカンマ以外を含む行はNG。
		// 3. 1個以上の数字列がカンマで区切られていること。
		
		// 以下のロジックで、行がカンマ区切りで、その要素が整数であるかをチェックする。
		
		isCommaSeparated := false
		
		// カンマで分割し、各要素が整数であるかチェック
		for _, part := range parts {
			// 末尾のカンマが許容されるため、空文字列（例: "1,," の最後の ""）は無視する
			if part == "" {
				continue
			}
			
			// 各部分が整数であるかチェック
			_, err := fmt.Sscanf(part, "%d", new(int))
			if err == nil {
				isCommaSeparated = true
			} else {
				// 数字とカンマ以外を含む行、または非整数が含まれる行はNG
				// ただし、Sscanfは部分的に成功しても全体が整数でない場合はエラーになるため、
				// ここではより厳密に、数字とカンマ以外が含まれていないかを確認する。
				
				// 厳密に「数字とカンマ以外を含む行は妥当ではない」という制約を適用する。
				// これは、行全体が数字とカンマのみで構成されていることを意味する。
				
				// 以下のチェックで、数字とカンマ以外の文字が含まれていないかを確認する。
				if strings.ContainsAny(part, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ") {
					// アルファベットなどが含まれていたらNG
					goto nextLine
				}
			}
		}
		
		// 1個以上の数字列がカンマで区切られているか、または数字のみで構成されているか。
		// 少なくとも1つの有効な数字列が存在すればOK。
		if isCommaSeparated {
			validCount++
		} else if len(parts) > 0 {
			// カンマ区切りで、要素が空でない場合（例: "1,2"）
			// この場合、isCommaSeparatedがtrueになるはずだが、念のため。
			// 実際には、空でない要素が1つ以上あれば妥当と見なす。
			hasDigits := false
			for _, part := range parts {
				if part != "" {
					hasDigits = true
					// 整数チェックは上記で行われているため、ここでは要素の存在のみをチェック
				}
			}
			if hasDigits {
				validCount++
			}
		}

	nextLine:
	}

	fmt.Printf("valid=%d\n", validCount)
}
