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

		// 末尾のカンマを除去した文字列をチェック
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// カンマのみ、またはカンマで終わる行（例: "," または "1," のように数字が存在しない）は不妥当
			// ただし、仕様では「1 個以上の数字列がカンマで区切られて並んでいる」ことを求めている。
			// TrimRightで空文字列になった場合は、元の行が " ," や "," のような形式だった場合を考慮する。
			// ここでは、数字が存在しない行は妥当ではないと判断する。
			continue
		}

		// カンマで分割して、全てが数字であることを確認する
		parts := strings.Split(line, ",")
		isValid := true

		// 末尾のカンマが許容されるため、最後の要素が空文字列であっても許容するが、
		// 少なくとも1つ以上の数字列が存在する必要がある。
		// trimmedLineが空でないことから、少なくとも1つの数字列は存在する。
		// 厳密に「1 個以上の数字列がカンマで区切られて並んでいる」をチェックする。

		// すべてのパートが数字列（または空文字列だが、カンマ区切りなので、実質的に数字列）であるかを確認する。
		// 妥当性の定義を再解釈する: 「1 個以上の数字列がカンマで区切られて並んでいる」
		// これは、カンマで分割した結果、少なくとも1つの要素が存在し、その要素が数字である必要があることを意味する。

		// 妥当な行であるためには、空文字列や数字以外の文字（カンマ以外の）が含まれていてはならない。
		// したがって、文字列をカンマで分割し、各要素が数値として解釈可能であるかを確認する。

		count := 0
		for _, part := range parts {
			if strings.TrimSpace(part) != "" {
				// 空でない部分があれば、それが整数であるか確認
				if _, err := fmt.Sscanf(part, "%d", new(int)); err != nil {
					isValid = false
					break
				}
				count++
			}
		}

		// 末尾のカンマが許容されるため、最終的に最低1つの数字列が抽出できれば良い。
		// ただし、元の行が "1," の場合、parts は ["1", ""] となる。
		// trimmedLineが空でないことが保証されている。
		// 妥当なのは、カンマで区切られた要素の中に少なくとも1つの有効な数値が含まれている場合。
		
		// 簡略化された判定: カンマで分割し、数字のみで構成されているかを確認する。
		// 末尾のカンマは許容される。
		
		// ここでは、文字列全体をカンマで分割した結果、少なくとも1つの要素が数字を構成しているかをチェックする。
		hasDigits := false
		for _, part := range parts {
			if strings.TrimSpace(part) != "" {
				// この部分が整数であるかチェック
				if _, err := fmt.Sscanf(part, "%d", new(int)); err == nil {
					hasDigits = true
				} else {
					isValid = false
					break
				}
			}
		}
		
		// 最後の要素が空文字列であっても、それ以前に少なくとも1つの数字列があればOKとする。
		if !hasDigits && len(parts) > 0 {
			// 例: "," や " " など、数字が一つも含まれていない場合
			isValid = false
		} else if len(parts) > 0 {
			// 少なくとも1つの数字列が含まれていれば妥当
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
