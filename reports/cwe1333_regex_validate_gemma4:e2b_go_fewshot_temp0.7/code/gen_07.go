package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validCount := 0

	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマを除去して、カンマ区切りの整数列であることを確認する
		// 末尾のカンマがあっても許容する
		trimmedLine := strings.TrimRight(line, ",")

		if trimmedLine == "" {
			// カンマのみ、または空文字列（trimSpaceで既にチェック済みだが念のため）
			// ただし、元の行が "1,2," のような形式であれば、trimmedLine は "1,2" となり、
			// これは数字列が1個以上あることを意味する。
			// 妥当なのは「1個以上の数字列がカンマで区切られて並んでいる」こと。
			// 空行以外で、数字とカンマ以外が含まれていないかチェックする。
			// この仕様に基づくと、数字とカンマ以外の文字が含まれていれば不妥当。
			// 厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する。

			// 行が空でなければ、カンマのみ（例: "," または ",,"）は数字列ではないため、
			// 妥当ではないと判断する。
			if strings.Contains(line, ",") {
				// カンマが含まれているが、数字列がない場合（例: ","）
				// 妥当ではない
			} else {
				// カンマもなく、空行でもない場合（例: "abc" や "123"）
				// これは数字列が1個以上あると解釈できるため、妥当とする。
				validCount++
			}
			continue
		}

		// trimmedLineが数字とカンマのみで構成されているかチェックする
		isValidFormat := true
		for _, char := range trimmedLine {
			if char != '-' && char != ',' && (char < '0' || char > '9') {
				isValidFormat = false
				break
			}
		}

		if !isValidFormat {
			continue // 数字とカンマ以外を含む行は妥当ではない
		}

		// 数字列が存在するかチェックする。
		// trimmedLineが空でなければ、少なくとも1つの数字列が存在する（カンマで区切られているため）。
		// ただし、"1," の場合、trimmedLineは"1"となり、これは1つの数字列である。
		// "1,,2" の場合、trimmedLineは"1,,2"となり、これは数字列が2つある。

		// 妥当性の定義：「1 個以上の数字列がカンマで区切られて並んでいる」
		// これは、数字列が少なくとも1つ存在し、カンマで区切られている、ということを意味する。
		// 最小の妥当なケースは "1" または "1," など。

		// もし trimmedLine が空でなければ、それは少なくとも1つの数字列が存在する（カンマ区切りが成立している）。
		// ただし、"1,2" は妥当。
		// "," は妥当ではない（数字列が0個）。
		// "1," は妥当である（数字列が1個）。
		// "1,,2" は妥当である（数字列が2個）。

		// 妥当なのは、数字とカンマのみで構成され、かつ少なくとも1つの数字が含まれている行。
		hasDigit := false
		for _, char := range trimmedLine {
			if char >= '0' && char <= '9' {
				hasDigit = true
				break
			}
		}

		if hasDigit {
			validCount++
		} else if strings.Contains(line, ",") {
			// 数字が一つもないがカンマがある場合 (例: ",,,")
			// これは「1個以上の数字列」の条件を満たさないため不妥当。
		} else {
			// 数字もカンマもなく、空行でもない場合 (例: "abc")
			// これは「数字列」ではないため不妥当。
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
