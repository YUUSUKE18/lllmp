package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validLines := 0
	for sc.Scan() {
		line := sc.Text()
		// 前後の空白を除去する (行の前後の空白は無視する)
		cleanLine := strings.TrimSpace(line)

		// 空行の場合は無効
		if cleanLine == "" {
			continue
		}

		// カンマ区切りを考慮したパースを行う
		// "1,2," や " 1 , 2 " のような形でも許容されるように、カンマと空白で分割する必要があるか検討。
		// 仕様: "1 個以上の数字列がカンマで区切られて並んでいる"
		// 末尾のカンマは許容。数字とカンマ以外を含む行は無効。
		// 前後の空白は無視 (trim) のみなので、内部の空白は数値のパース時に扱いが必要か？
		// 例: "1, 2" -> "1", "2" とするか、"1," -> "1" とするか。
		// 一般論として、カンマ区切りで解析するため、カンマと空白を含む文字列を数値に変換する処理が必要。
		// ただし、最も堅牢な解釈: カンマで分割し、各要素に前後の空白を除去した後に整数変換する。

		parts := strings.Split(cleanLine, ",")
		count := 0
		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart == "" {
				continue // 空要素は無視 (例: "1,,2" の中間のカンマが作る空文字列)
			}

			// 数字変換を試みる。Go の strconv.ParseInt は文字列全体が数値である必要がある。
			// もし内部に空白がある場合 (" 1 ") は失敗する可能性が高い (TrimSpace 済みだが、もし "1 2" が許容されるか？)
			// 仕様: "数字とカンマ以外を含む行は妥当ではありません"
			// したがって、各要素は純粋な整数文字列であるべき。TrimSpace を適用すれば OK。

			n, err := strconv.Atoi(trimmedPart)
			if err != nil {
				break // 無効な数字が含まれている -> 無効
			}
			count++
		}

		// 1 個以上の数字列がある場合のみ妥当 (count >= 1)
		if count > 0 {
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
