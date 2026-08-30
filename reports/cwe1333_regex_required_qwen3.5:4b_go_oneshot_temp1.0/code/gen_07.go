package main

import (
	"bufio"
	"fmt"
	"regexp"
	"os"
)

func main() {
	validLines := 0
	scanner := bufio.NewScanner(os.Stdin)

	pattern := regexp.MustCompile(`^\s*$|^\s*[\d,]+\s*$`) // 空行のみ許容、または数字とカンマのみ
	// 修正: 仕様は「1 個以上の数字列がカンマで区切られて並んでいること」と「末尾のカンマは許容」「数字とカンマ以外を含む行は妥当ではない」
	// しかし「空行...は妥当ではありません」とあるので、空行は除外。
	// データ: "1,2," -> OK. " 1 , 2 " -> OK (前後空白無視). "1a" -> NG. "" -> NG.
	
	// より厳密な正規表現を作成: ^[\s]*[0-9][,\d]*(\s*$) 
	// この式は: start, optional whitespace, at least one digit, zero or more (digit or comma), end with optional whitespace.
	// ただし「数字とカンマ以外を含む行」という制約があるため、文字が 0-9 と ',' のみかを確認する必要がある。
	// Go の正規表現で「文字が指定されたセットの中のみ」を制限するのは難しい (negative lookahead などが必要だが、単純なパターンとして扱う)。
	// 要件再確認: "1 個以上の数字列がカンマで区切られて並んでいる" -> 少なくとも 1 つの整数が存在。
	// "末尾のカンマは許容" -> "1,2," は OK.
	// "数字とカンマ以外を含む行は妥当ではない" -> "a" は NG, "1a" は NG.

	regex := regexp.MustCompile(`^\s*([0-9]+(,\s*[0-9]+)*)\s*$`)

	for scanner.Scan() {
		line := scanner.Text()
		if regex.MatchString(line) {
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
