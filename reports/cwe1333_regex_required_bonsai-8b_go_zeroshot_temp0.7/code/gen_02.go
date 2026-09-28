package main

import (
	"fmt"
	"os"
	"regexp"
)

func main() {
	scanner := regexp.NewScanner(os.Stdin)
	var validLines []string

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		// 全部数字とカンマ以外を含む行は妥当ではありません
		if !regexp.MatchString(`^\s*([0-9]+(?:,[0-9]+)*\s*)$`, line) {
			continue
		}

		// 1 個以上の数字列が含まれる行は妥当
		if len(regexp.FindAllString(line, -1)) > 1 {
			validLines = append(validLines, line)
		}
	}

	// 空の行がある場合、その行は削除
	if len(validLines) > 0 {
		fmt.Println("valid=" + fmt.Sprintf("%d", len(validLines)))
		for _, v := range validLines {
			fmt.Println(v)
		}
	} else {
		fmt.Println("valid=" + fmt.Sprintf("%d", 0))
	}
}
