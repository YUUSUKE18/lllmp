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
		// 行の前後の空白を無視する（ここでは行全体を処理するため、TrimSpaceで前後の空白を除去）
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマは許容する
		// 妥当なのは「1個以上の数字列がカンマで区切られて並んでいること」
		// これは、カンマで区切られた要素が存在し、その要素が数字列である、ということを意味する。
		// 厳密には、カンマで区切られた要素がすべて整数である必要がある。

		// 行をカンマで分割する
		parts := strings.Split(trimmedLine, ",")

		// 妥当性の判定
		// 1. 少なくとも1つの要素があること (空行で除外済み)
		// 2. 各要素が数字列であること (カンマ区切りの整数列)
		// 3. 末尾のカンマは許容される (Splitの結果、最後の要素が空文字列になる可能性がある)

		isValid := false
		if len(parts) > 0 {
			// 末尾のカンマが許容されるため、最後の要素が空文字列であっても良い。
			// 例: "1,2," -> ["1", "2", ""]
			// 妥当なのは、少なくとも1つの数字列が存在すること。
			for _, part := range parts {
				if strings.TrimSpace(part) != "" {
					// 要素が空でない場合、それが数字列であるかチェック
					_, err := fmt.Sscanf(part, "%d", new(int))
					if err == nil {
						// 成功すれば、その要素は整数である
						isValid = true
						break
					}
				}
			}
		}

		if isValid {
			validCount++
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常、この問題では無視されることが多いが、堅牢性のために残す）
	}

	fmt.Printf("valid=%d\n", validCount)
}
