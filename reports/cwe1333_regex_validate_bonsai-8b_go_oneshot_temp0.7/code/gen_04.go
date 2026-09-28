package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	var validLines int
	var currentLine string

	for {
		sc.Scan()
		if sc.Err() {
			break
		}
		if sc.Err() {
			fmt.Println("valid=0")
			return
		}
		currentLine = strings.TrimSpace(sc.Text())
		if currentLine == "" {
			fmt.Println("valid=0")
			return
		}
		// 漏れがなければ、カンマで区切られた数列をチェック
		parts := strings.Fields(currentLine)
		if len(parts) < 1 {
			fmt.Println("valid=0")
			return
		}
		// パースできれば、全体が数字で構成
		var allNumbers []string
		for _, part := range parts {
			if part == "" {
				fmt.Println("valid=0")
				return
			}
			n, err := strconv.Atoi(part)
			if err != nil {
				fmt.Println("valid=0")
				return
			}
			allNumbers = append(allNumbers, part)
		}
		// 1つ以上の数字列が含まれている
		if len(allNumbers) > 1 {
			validLines++
		}
	}

	fmt.Printf("valid=%d\n", validLines)
}
