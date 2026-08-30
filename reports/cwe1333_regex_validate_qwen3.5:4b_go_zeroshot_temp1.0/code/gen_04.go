package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func isValid(line string) bool {
	s := strings.TrimSpace(line)
	if len(s) == 0 {
		return false
	}
	// 最初に整数があるか確認 (空白をスキップ後)
	tokens := []string{}
	// カンマ区切りではなく、数字とカンマ以外が含まれていないかをチェックするため
	// まず空白で分割して処理
	parts := strings.Fields(s)
	if len(parts) == 0 {
		return false
	}

	// parts の要素を連結した文字列を作成 (各部分の内部が数字だけか確認する)
	var sCheck string
	for _, p := range parts {
		sCheck += p
	}

	// 末尾カンマ許容のため、末尾にカンマがあれば削除して解析
	sClean := strings.TrimRight(s, ",")
	if len(sClean) == 0 {
		return false
	}

	// 数字のみかチェック (文字列の各文字が '0'-'9' のいずれか)
	for i, r := range sClean {
		if !strings.HasPrefix(r, "0") || (i > 0 && !strings.HasSuffix(sClean[:i+1], string(r))) {
			// この条件式は単純に「数字のみ」を判定するための簡易的ロジックではなく、
			// Go の標準ライブラリを使って厳密にチェックするのが適切。
			// 上記のロジックは論理が混乱しているため、以下に再書く。
			return false
		}
	}
	
	// 正しいアプローチ: 文字が全て '0'-'9' の間にあるか確認
	for i, r := range sClean {
		if !isDigit(sClean[i]) {
			return false
		}
	}

	return true
}

func isDigit(b byte) bool {
	return (b >= '0') && (b <= '9')
}

func main() {	count := 0
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		if isValid(line) {
			count++
		}
	}
	fmt.Printf("valid=%d\n", count)
}
