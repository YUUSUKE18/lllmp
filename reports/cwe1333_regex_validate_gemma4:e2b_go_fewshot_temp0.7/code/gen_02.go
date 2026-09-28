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

		// 末尾のカンマを無視して、カンマで区切られた整数列として検証する
		// 妥当な行は、少なくとも1つの数字列がカンマで区切られて並んでいること。
		// 末尾のカンマは許容される。
		
		// カンマで分割する前に、末尾のカンマを削除する処理を考える。
		// 例: "1,2,3," -> "1,2,3" または "1,2,3"
		
		// 念のため、文字列をカンマで分割し、空でない要素が存在するか確認する。
		// 末尾のカンマが許容されるため、strings.Splitで分割した後、最後の要素が空になる可能性がある。
		
		// 末尾のカンマを削除して分割を試みる
		trimmedLine := line
		if strings.HasSuffix(trimmedLine, ",") {
			trimmedLine = trimmedLine[:len(trimmedLine)-1]
		}

		if trimmedLine == "" {
			// 元の行がカンマのみ（例: "," や ",,"）で構成されていた場合、
			// 妥当な数字列は存在しないため、妥当ではないとする。
			continue
		}
		
		parts := strings.Split(trimmedLine, ",")
		
		// 1個以上の数字列がカンマで区切られて並んでいるか
		// 空でない要素が少なくとも1つあれば妥当とする。
		hasNumbers := false
		for _, part := range parts {
			if strings.TrimSpace(part) != "" {
				hasNumbers = true
				break
			}
		}

		if hasNumbers {
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
