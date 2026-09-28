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

		// 末尾のカンマを削除して、カンマ区切りの整数列として検証する
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// カンマのみ、または空文字列（trimSpaceで既にチェック済みだが念のため）
			// 末尾のカンマのみの行は妥当とする（例: "1,2," や "," のようなケースを考慮）
			// 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
			// 末尾のカンマは許容される。
			// 例: "1,2," -> "1,2" は2つの数字列。
			// 空行は妥当ではない。
			// 空白のみの行は妥当ではない。
			// カンマのみの行（例: "," または ",,"）は、数字列が0個になるため不適。
			// ただし、行全体が数字とカンマのみで構成されていれば、それは「数字列が並んでいる」と解釈できる。
			// ここでは、数字列が1つ以上存在するかどうかをチェックする。

			// カンマのみの行は、数字列が0個なので不適とする。
			// 例: " , " -> "" (空行として処理される)
			// 例: "," -> "" (数字列0個)
			// 例: ",," -> "" (数字列0個)
			// 空白のみの行は、行全体が空白で構成されているため、数字列がないと判断。
			continue
		}

		// カンマで分割し、各要素が数字列であるか、または空でないかをチェックする
		parts := strings.Split(line, ",")
		
		hasDigits := false
		for _, part := range parts {
			// 各部分をトリムして、数字のみが残っているかチェックする
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart != "" {
				// 数字列として妥当かチェック
				if _, err := fmt.Sscanf(trimmedPart, "%d", new(int)); err == nil {
					hasDigits = true
				} else {
					// 数字以外の文字が含まれている場合（例: "a,1"）
					// 仕様では「数字とカンマ以外を含む行は妥当ではない」とある。
					// ここでは、数字とカンマ以外の文字が含まれていれば不適とする。
					// ただし、Splitの結果、数字以外の文字が含まれる場合、その部分が数字列ではないことになる。
					// 厳密に「数字列」として判断するため、数字以外の文字を含まないか確認する。
					if strings.ContainsAny(trimmedPart, "0123456789") {
						// 数字が含まれているが、数字以外の文字も含まれている場合（例: "1a"）
						// このケースは「数字列」ではないため、hasDigitsを更新しない。
					} else {
						// 数字もカンマも含まない場合（例: "a"）
					}
				}
			}
		}

		// 1個以上の数字列がカンマで区切られて並んでいるか？
		// これは、分割された部分のうち、空でない部分が1つ以上存在し、かつそれらがすべて数字列である必要がある。
		// 仕様の解釈に基づき、数字列が存在するかどうかを判定する。
		
		// 簡略化された判定: 空でない要素が1つ以上存在し、その要素が数字のみで構成されているか。
		// 例: "1,2" -> ["1", "2"] (2個) -> 妥当
		// 例: "1," -> ["1", ""] (2個) -> 妥当 (末尾のカンマは許容)
		// 例: "," -> ["", ""] (2個) -> 不適 (数字列0個)
		
		// 妥当性の再評価:
		// 1. 空行は不適。
		// 2. 数字とカンマ以外を含む行は不適。
		// 3. 1個以上の数字列がカンマで区切られて並んでいること。

		// 1. 空行チェックは既に実施済み (line == "")
		// 2. 数字とカンマ以外を含む行チェック:
		allValidChars := true
		for _, char := range line {
			if !strings.ContainsRune("0123456789, ", char) {
				allValidChars = false
				break
			}
		}
		if !allValidChars {
			continue
		}

		// 3. 1個以上の数字列がカンマで区切られて並んでいるか
		// 妥当なのは、カンマで分割した結果、少なくとも1つの要素が数字列である場合。
		// ただし、末尾のカンマは許容される。
		
		// 末尾のカンマを無視して、カンマで分割した後の要素を評価する
		effectiveLine := strings.TrimRight(line, ",")
		if effectiveLine == "" {
			// 末尾がカンマのみの場合 (例: "1,") -> "1" が残る
			// 末尾がカンマのみの場合 (例: ",") -> "" になる
			// この場合、元の行が "1," なら effectiveLine は "1" となり、Splitの結果は ["1", ""]
			// この場合、数字列が1つ存在するため妥当。
			
			// カンマのみの行（例: ","）は、effectiveLineが""となり、数字列0個となるため不適。
			if strings.TrimSpace(line) == "," || strings.TrimSpace(line) == ",," {
				continue
			}
		}
		
		// 最終的な判定ロジックをシンプルにする:
		// 行が空でなく、数字とカンマのみで構成されているか、そして少なくとも1つの数字列が存在するか。
		
		// 厳密に「1個以上の数字列がカンマで区切られて並んでいる」
		// これは、カンマで分割した結果、空でない要素が1つ以上存在し、それらがすべて数字列であること。
		
		validCount := 0
		parts = strings.Split(line, ",")
		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart != "" {
				// 数字列として検証
				if _, err := fmt.Sscanf(trimmedPart, "%d", new(int)); err == nil {
					validCount++
				} else {
					// 数字以外の文字が含まれている場合は、この行全体は不適
					goto nextLine
				}
			}
		}

		if validCount > 0 {
			validLines++
		}

	nextLine:
	}

	fmt.Printf("valid=%d\n", validLines)
}
