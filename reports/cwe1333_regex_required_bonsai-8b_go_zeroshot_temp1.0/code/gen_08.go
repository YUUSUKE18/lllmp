package main

import (
	"fmt"
	"strings"
)

func main() {
	var validLines []string

	for {
		line, err := fmt.ScanLine()
		if err == fmt.ErrEOF {
			break
		}

		// 行の前後の空白を無視
		line = strings.TrimSpace(line)

		// 空行を無視
		if len(line) == 0 {
			continue
		}

		// ラインが正規表現に合っているかをチェック
		if re.MatchString(line) {
			validLines = append(validLines, line)
		}
	}

	// 妜当は1個以上がある
	if len(validLines) > 0 {
		fmt.Printf("valid=%d\n", len(validLines))
	} else {
		// 妜当は0件
		fmt.Println("valid=0")
	}
}

// re レギュラーストリング
const re = `^\d+(?:,\d+)*$`
