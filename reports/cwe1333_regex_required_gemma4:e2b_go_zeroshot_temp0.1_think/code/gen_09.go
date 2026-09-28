package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
)

func main() {
	// 正規表現コンパイル
	// パターン: 行全体が数字(\d)とカンマ(,)のみで構成されており、少なくとも1文字以上あること。
	// これは「1個以上の数字列がカンマで区切られて並んでいる」という条件を満たすための、
	// 空行や非数字文字を含む行を除外する最もシンプルな方法である。
	// ただし、仕様に基づき、行の前後の空白は無視されるため、入力行全体をチェックする。
	// 厳密に「数字とカンマ以外を含む行は妥当ではない」という制約を満たすため、
	// 以下のパターンを使用する。
	// ^[\d,]+$ : 行が数字またはカンマのみで構成され、空ではないことを保証する。
	pattern := regexp.MustCompile(`^[\d,]+$`)

	validCount := 0

	// 標準入力から読み込む
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		
		// 行の前後の空白を無視する（仕様通り、ここでは行全体をチェックする）
		// ただし、正規表現のチェックは行全体に対して行う。
		
		// 行が空でないことを確認し、正規表現で妥当性を判定する
		if strings.TrimSpace(line) != "" {
			if pattern.MatchString(line) {
				validCount++
			}
		}
	}

	// 結果を出力
	fmt.Printf("valid=%d\n", validCount)
}
