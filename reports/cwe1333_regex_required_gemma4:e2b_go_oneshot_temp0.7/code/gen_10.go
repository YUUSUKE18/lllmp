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
	validCount := 0

	// カンマ区切りの整数列を判定する正規表現
	// ^\s* 表示行の先頭の空白
	// (?:[0-9]+(?:,\s*[0-9]+)*) 非キャプチャグループ: 1つ以上の数字、それに続くカンマと空白の繰り返し
	// \s*$ 表示行末の空白
	// このパターンは「1個以上の数字とカンマの組み合わせ」を検出する
	// 末尾のカンマも許容する (例: 1,2,3, または 1,2,3,)
	pattern := regexp.MustCompile(`^\s*(?:[0-9]+(?:,\s*[0-9]+)*)(?:,)?\s*$`)

	for scanner.Scan() {
		line := scanner.Text()
		// 行の前後の空白を無視して判定するため、line全体をパターンに適用する
		if pattern.MatchString(line) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
