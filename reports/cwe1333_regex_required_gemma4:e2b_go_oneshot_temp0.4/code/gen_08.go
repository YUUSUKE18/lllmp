package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validCount := 0

	// カンマ区切りの整数列を判定するための正規表現
	// ^\s* 表示行の先頭の空白
	// (?:[0-9]+(?:,\s*[0-9]+)*) : 1つ以上の数字列と、それに続くカンマと空白の繰り返し
	// (?:,\s*|\s*$) : カンマと空白、または行末の空白
	// $ : 行末
	// この正規表現は、カンマ区切りの整数列が1つ以上存在することをチェックします。
	// 厳密には、行全体が数字とカンマのみで構成され、少なくとも1つの数字が含まれていることを確認する必要があります。

	// よりシンプルなアプローチとして、行を読み込み、その内容をチェックします。
	// 妥当な行の判定基準:
	// 1. 空行ではない。
	// 2. 数字とカンマのみで構成されている。
	// 3. 少なくとも1つの数字が含まれている。

	for scanner.Scan() {
		line := scanner.Text()
		trimmedLine := ""
		for _, r := range line {
			if r == ' ' || r == '\t' {
				continue
			}
			trimmedLine += string(r)
		}

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// 正規表現で数字とカンマのみで構成されているか、および数字が含まれているかをチェック
		// ^[0-9,]*$ : 行が数字とカンマのみで構成されている
		// (?=.*[0-9]) : 行内に少なくとも1つの数字が含まれている
		// この正規表現は、末尾のカンマが許容されるという要件を満たすように調整が必要です。

		// 妥当な行の判定ロジックを再定義します。
		// 1. 行が空でない。
		// 2. 行に含まれる文字が数字とカンマのみである。
		// 3. 数字が少なくとも1つ含まれている。

		isValid := true
		hasDigit := false
		for _, char := range trimmedLine {
			if char >= '0' && char <= '9' {
				hasDigit = true
			} else if char != ',' {
				// 数字とカンマ以外の文字があれば不妥当
				isValid = false
				break
			}
		}

		if !isValid || !hasDigit {
			// 妥当でない場合、次の行へ
			continue
		}

		// 妥当な行としてカウント
		validCount++
	}

	fmt.Printf("valid=%d\n", validCount)
}
