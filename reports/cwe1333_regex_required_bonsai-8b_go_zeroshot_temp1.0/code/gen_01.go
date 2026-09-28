package main

import (
	"fmt"
	"os"
	"regexp"
	"strings"
)

func main() {
	// コンソールから行を入力
	input := strings.NewReader(os.Stdin)
	for {
		input.ScanString()
		if input.Err() {
			break
		}
		// 空行を処理
		if strings.TrimSpace(input.Text) {
			fmt.Println("valid=0")
			continue
		}
		// ラベルを除去
		line := strings.TrimSpace(input.Text)
		label, _ := strings.SplitN(line, " ", 2)
		// ラベルを除いた後のみ検証
		content := label + ": "
		// ラベル以外の部分を処理
		if len(content) == 0 {
			fmt.Println("valid=0")
			continue
		}
		// ラベル以外の部分を分割
		parts := strings.Split(content, "[:]+")
		// 数値列の検証
		validCount := 0
		for _, part := range parts {
			if !regexp.MatchString(`^-?[0-9]+(?:$|,)|$`, part) {
				// 設計的に数値列を区切るコマンドで、正規表現が不一致している部分を検出
				// カンマを割って見る
				splitParts := strings.SplitN(part, ",", 2)
				// 数値列が存在するか確認
				for _, s := range splitParts {
					if s != "" && !regexp.MatchString(`^-?[0-9]+(?:$|,)|$`, s) {
						validCount++
						break
					}
				}
			}
		}
		// 勜当は1〜N個
		if validCount > 0 {
			fmt.Printf("valid=%d\n", validCount)
		} else {
			fmt.Println("valid=0")
		}
	}
}
