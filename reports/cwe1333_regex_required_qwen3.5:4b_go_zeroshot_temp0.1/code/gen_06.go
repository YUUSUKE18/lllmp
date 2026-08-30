package main

import (
	"bufio"
	"fmt"
	"regexp"
)

func main() {
	reader := bufio.NewReader(nil) // nil として標準入力を読み込む
	validCount := 0

	// 正規表現の定義
	// ^: 行の始点
	// \s*: 前後の空白を無視 (0 回以上)
	// ([0-9]+(,[0-9]+)*|,): 
	//   - [0-9]+: 1 個以上の数字
	//   - (,[0-9]+)*: カンマと数字の列が 0 回以上続く (末尾のカンマを含むパターンも許容)
	//   - |: 2 つのパターンから 1 つを選択
	// \s*: 末尾の空白を無視
	// $: 行の終点
	pattern := `^\s*([0-9]+(,[0-9]+)*|,)\s*$`

	re := regexp.MustCompile(pattern)

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break // エラー発生または EOF 時にループを抜ける
		}
		// 空行は正規表現でマッチしないため、自動的に無効と判定される
		if re.MatchString(line) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
