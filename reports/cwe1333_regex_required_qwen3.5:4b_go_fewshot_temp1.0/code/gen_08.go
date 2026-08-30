package main

import (
	"bufio"
	"fmt"
	"regexp"
	"os"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	regex := regexp.MustCompile(`^\s*([0-9]+(\,[0-9]+)*)\s*$`)
	validCount := 0
	for {
		line, err := r.ReadString('\n')
		if err != nil {
			break
		}
		// スタンダード入力からの読み込みで改行文字は含まないが、念のため trim する
		cleanedLine := line[:len(line)-1] // \n 切り捨て
		
		// 正規表現による検証
		// 空白と数字のみを含む、末尾のカンマを許容する形式をマッチさせる
		if regex.MatchString(cleanedLine) {
			validCount++
		}
	}
	fmt.Printf("valid=%d\n", validCount)
}
