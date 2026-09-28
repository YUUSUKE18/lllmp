package main

import (
	"bufio"
	"fmt"
	"regexp"
	"strconv"
)

func isValidLine(line string) bool {
	// 空白を除去
	line = regexp.MustCompile(`\s+`).ReplaceAllString(line, " ")
	if line == "" {
		return false
	}

	// 末尾のカンマを含んだパターン（例: "1", "1,2,", "1, 2,"）をチェック
	// regex は "^[0-9]+[,]*$" で、文字列が数字とカンマのみであり、末尾にカンマで終わるかどうかは任意
	// ただし仕様は「末尾のカンマは許容」だが、「数字とカンマ以外を含む行は妥当ではない」というので
	// 完全な文字列が数字とカンマのみに収まるか判定します。
	// また、「1 個以上の数字列がカンマで区切られて並んでいること」なので、単独の「1」や「1,2」も OK と解釈。
	// 「末尾のカンマは許容」とあるので、「1,' は NG ですが、「1,」は OK です（文字通り「数字とカンマ以外」がないため）。
	// しかし「数字列がカンマで区切られて並んでいること」なので、末尾にカンマだけがある場合は「数字列」が存在する必要がある。
	// つまり、「1,' は NG ですが、「1,2,' は OK です。

	r := regexp.MustCompile(`^([0-9]+)(,\s*0+)?$`) // 単純化して数字のみと末尾カンマをチェック
	// より厳密に：文字列が「整数」＋「カンマ＋空白（任意回数）」＋「整数」の繰り返し、または「整数」＋「カンマ」＋「空白」の最後に終わる
	// しかし末尾のカンマのみがある場合は「数字列」という要件を満たさないため NG です。

	// 再考：仕様「1 個以上の数字列がカンマで区切られて並んでいること」
	// 「末尾のカンマは許容します」→ 最後の数字列の後にカンマが来ても良い
	// 「数字とカンマ以外を含む行は妥当ではない」→ それ以外（空白含む）は許容されるか？「空行...は妥当ではない」なので、空白は除去済みの時点で考慮。
	// なので除去後の文字列が「数字」＋「(カンマ＋空白)*」＋「数字」または「(カンマ＋空白)*」の繰り返しとなる必要があります。

	lines := regexp.MustCompile(`(\S+)`).FindAllString(line, -1)
	if len(lines) == 0 {
		return false
	}

	for _, s := range lines {
		// 各トークンは数字とカンマのみを含むべき
		s = regexp.MustCompile(`\s+`).ReplaceAllString(s, "") // トークン内で空白を除去
		if !regexp.MustCompile(`^[0-9]*[,]*$`).MatchString(s) {
			return false
		}
		// 「数字列」は少なくとも「[0-9]+」を持つ必要があるはずです。
		// したがって、トークンが単なるカンマの場合 NG です。
		if !regexp.MustCompile(`^[0-9]+$`).MatchString(s) && len(s) == 1 && s[0] == ',' {
			return false
		}
	}

	// トークンの順序を再確認
	// 例えば "1,2," はトークンで ["1", ",", "2", ","] → NG です（単なるカンマ）
	// 正しいパターンは ["1", "2"] または ["1", ",", "2"] など。
	// したがって、トークンが全て「数字のみ」または「数字＋カンマ」で始まる必要があります。

	// より単純なアプローチ：文字列を解析し、整数とカンマのみの出現を確認
	line = regexp.MustCompile(`\s+`).ReplaceAllString(line, "")
	if len(line) == 0 {
		return false
	}

	runes := []rune(line)
	i := 0
	count := 0 // 数字列の数

	for i < len(runes) {
		c := runes[i]
		switch c {
		case '0', '1', '2', '3', '4', '5', '6', '7', '8', '9':
			// 数字列の始まりまたは続き
			j := i
			for j < len(runes) && (runes[j] >= '0' && runes[j] <= '9') {
				j++
			}
			// 1 つの数字列 found
			count++
			i = j
		case ',':
			// カンマは許容されるが、数字列の直後に必ず来るべきか？仕様「カンマ区切りの整数列」なので、数字とカンマのみであれば OK。
			// しかし「数字とカンマ以外を含む行は妥当ではない」なので、他の文字は無視。
			i++
		default:
			return false
		}
	}

	// 最終条件：1 個以上の数字列があること
	return count >= 1
}

func main() {
	scanner := bufio.NewScanner(stdin)
	validCount := 0
	for scanner.Scan() {
		if isValidLine(scanner.Text()) {
			validCount++
		}
	}
	fmt.Println(fmt.Sprintf("valid=%d", validCount))
}
