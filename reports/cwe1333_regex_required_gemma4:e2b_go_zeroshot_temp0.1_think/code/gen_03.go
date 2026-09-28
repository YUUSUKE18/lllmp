package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
)

func main() {
	// 正規表現のコンパイル
	// 仕様: 1個以上の数字列がカンマで区切られて並んでいること。末尾のカンマは許容する。
	// 空行や数字・カンマ以外の文字を含む行は無効。
	// この正規表現は、行が空ではなく、数字(\d)とカンマ(,)のみで構成されていることを確認します。
	// これにより、少なくとも1つの数字列が存在し、カンマ区切りという形式を満たします。
	re := regexp.MustCompile(`^[\d,]+$`)

	validCount := 0

	// 標準入力から行を読み込む
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()

		// 行の前後の空白は無視する（Scanner.Text()は行全体を読み込むため、ここではそのまま検証）
		// ただし、仕様上、行の前後の空白が無視されるという指示があるため、TrimSpaceを適用する。
		trimmedLine := strings.TrimSpace(line)

		if trimmedLine == "" {
			// 空行は妥当ではない
			continue
		}

		// 正規表現で妥当性を判定
		if re.MatchString(trimmedLine) {
			validCount++
		}
	}

	// 結果を標準出力に出力
	fmt.Printf("valid=%d\n", validCount)
}
