package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validLines := 0

	// 正規表現: カンマ区切りの整数列、末尾のカンマを含むパターンをチェック
	// ^\s*          : 行頭の空白
	// (?:          : 非キャプチャグループの開始
	//   \d+        : 1つ以上の数字
	//   ,          : カンマ
	// )*           : 上記のグループが0回以上繰り返される
	// \d+          : 最後の数字（カンマなし）
	// (?:,\s*$)    : 末尾のカンマと空白（オプション）
	// $            : 行末
	// この正規表現は、少なくとも1つの数字がカンマで区切られていることを確認する。
	// より厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認するため、
	// 以下のロジックで各行をチェックする。

	for scanner.Scan() {
		line := scanner.Text()
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// 末尾のカンマを許容しつつ、カンマで区切られた数字列が存在するかをチェックする
		// パターン: 数字とカンマのみで構成され、少なくとも1つの数字が含まれていること。
		// ^\s*                : 行頭の空白
		// (?:(\d+,\s*)+)      : 1つ以上の (数字, 空白) のペア
		// \d+                 : 最後の数字
		// (?:,\s*)*           : 末尾のカンマと空白（オプション）
		// $                  : 行末
		// この正規表現は複雑になるため、よりシンプルな方法で「数字とカンマのみ」かつ「少なくとも1つの数字」をチェックする。

		// 妥当性の判定ロジック:
		// 1. 行が空でないこと (既にチェック済み)
		// 2. 行に含まれる文字が数字とカンマのみであること。
		// 3. 少なくとも1つの数字が含まれていること。
		// 4. 末尾のカンマは許容されること。

		// 1. 数字とカンマのみで構成されているかチェック
		isNumericAndCommaOnly := true
		hasDigit := false
		for _, char := range line {
			if char >= '0' && char <= '9' {
				hasDigit = true
			} else if char == ',' {
				// カンマは許容
			} else {
				// 数字とカンマ以外の文字があれば不適
				isNumericAndCommaOnly = false
				break
			}
		}

		if !isNumericAndCommaOnly {
			continue // 数字とカンマ以外を含む行は不適
		}

		// 2. 少なくとも1つの数字が含まれているかチェック
		if hasDigit {
			// 3. 末尾のカンマは許容されるため、この条件を満たせば妥当
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
