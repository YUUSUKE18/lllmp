package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validLines := 0

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())

		if line == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマを除去して、カンマで分割
		// 末尾のカンマが許容されるため、TrimSpaceで前後の空白を除去した後、
		// 分割処理を行う。
		
		// 末尾のカンマがあれば削除して分割する。
		trimmedLine := line
		if strings.HasSuffix(trimmedLine, ",") {
			trimmedLine = trimmedLine[:len(trimmedLine)-1]
		}

		if trimmedLine == "" {
			// カンマのみ、または空文字列のみだった場合（例: "," または ""）
			// これは「1個以上の数字列がカンマで区切られて並んでいる」という条件を満たさない
			// ただし、元の行が「カンマで区切られた」という構造を評価する必要がある。
			// 仕様：「1 個以上の数字列がカンマで区切られて並んでいることです。末尾のカンマは許容します。」
			// 空行は妥当ではないとされているため、ここでは数字列が存在するかどうかをチェックする。
			continue
		}

		// カンマで分割
		parts := strings.Split(trimmedLine, ",")
		
		// 1個以上の数字列がカンマで区切られているかを確認する。
		// 各部分が空でない（数字列が存在する）ことを確認する。
		isValid := false
		for _, part := range parts {
			if strings.TrimSpace(part) != "" {
				isValid = true
				break
			}
		}
		
		if isValid {
			validLines++
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常はここでは無視されることが多いが、厳密に処理する場合）
	}

	fmt.Printf("valid=%d\n", validLines)
}
