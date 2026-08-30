package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		return
	}

	line := scanner.Text()
	parts := strings.Split(strings.TrimSpace(line), " ")

	var totalCount int64 = 0
	var totalSum int64 = 0

	// 正規表現で "値:回数" の形式をマッチさせる
	// 値は整数、回数は整数
	re := regexp.MustCompile(`^(\d+):(\d+)$`)

	// カンマで区切られた要素を処理するために、カンマで分割する
	// ただし、問題の例では "7:3,2:2" のように、スペースで区切られたトークンを処理する方が適切。
	// 標準入力は "7:3,2:2" のようにスペースで区切られると仮定し、カンマ区切りのリストを扱う。
	// 仕様：「`値:回数` をカンマ区切りで並べたランレングス圧縮列を受け取ります。」
	// 入力が単一の文字列として与えられる場合、その文字列全体を処理する。

	// 入力文字列をカンマで分割して各要素を処理する
	inputParts := strings.Split(line, ",")

	for _, part := range inputParts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 各要素が "値:回数" の形式に従うかチェック
		matches := re.FindStringSubmatch(trimmedPart)
		if len(matches) != 3 {
			// 形式が一致しないものは無視する
			continue
		}

		// 値と回数をパース
		valueStr := matches[1]
		countStr := matches[2]

		value, errV := strconv.ParseInt(valueStr, 10, 64)
		count, errC := strconv.ParseInt(countStr, 10, 64)

		if errV != nil || errC != nil {
			// パースエラーが発生した場合は無視する
			continue
		}

		// 回数が 0 以上であることを確認（仕様により保証されているが念のため）
		if count >= 0 {
			totalCount += count
			// 合計は (値 * 回数) の形で計算する
			totalSum += value * count
		}
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
