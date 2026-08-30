package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validLines := 0

	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())

		if line == "" {
			// 空行は妥当ではない
			continue
		}

		// 妥当性の判定: 1個以上の数字列がカンマで区切られて並んでいること。
		// 末尾のカンマは許容する。
		// 1. 行がカンマで分割可能であること。
		// 2. 分割された要素のいずれかが数字列であること（空でないこと）。
		//    ただし、仕様の意図を「カンマで区切られた要素が存在し、それらが数字列である」と解釈する。
		//    「1 個以上の数字列がカンマで区切られて並んでいる」を満たすためには、
		//    カンマで分割した後の要素のうち、少なくとも一つが数字（または数字列）である必要がある。

		// 末尾のカンマを許容しつつ、内容が数字列で構成されているかをチェックする。

		// 末尾のカンマを削除してチェックを容易にする
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// 末尾がカンマのみの場合 (例: "1,2," や ",")
			// 元の行がカンマのみで構成されていたり、数字列が全くなかったりするケースを考慮。
			// 「1 個以上の数字列がカンマで区切られて並んでいる」ためには、少なくとも1つの数字列が存在する必要がある。
			// したがって、trimmedLine が空の場合は妥当ではないと判断する。
			continue
		}

		// カンマで分割し、全てが数字列であることを確認する
		parts := strings.Split(trimmedLine, ",")
		
		isValid := true
		for _, part := range parts {
			if part == "" {
				// 空の要素は、数字列として数えられない（または仕様外とみなす）。
				// 例: "1,,2" のようなケースは、空の要素の存在を許容しないと解釈する。
				isValid = false
				break
			}
			// 各部分が数字のみで構成されているかチェック
			if _, err := fmt.Sscan(part); err != nil {
				isValid = false
				break
			}
		}

		if isValid {
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
