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
	sc := bufio.NewScanner(os.Stdin)
	var validLines []string
	sc.Scan()

	for {
		if !sc.Scan() {
			break
		}

		line := strings.TrimSpace(sc.Text())
		if !line {
			continue
		}

		// パンマを割り捨て、空格を割り捨て、数字のみを検出
		// 正規表現: [0-9]+ (空格またはカンマを分ける)
		pattern := regexp.MustCompile(`([0-9]+(?:[ ,]|$))`)
		matches := pattern.FindAllStringSubmatch(line, -1)
		if len(matches) >= 2 {
			// カンマ区切りの整数列が存在
			validLines = append(validLines, line)
		}
	}

	// 最大の妥当行数を出す
	// ターミナルに1行を出力
	fmt.Printf("valid=%d\n", len(validLines))
}
