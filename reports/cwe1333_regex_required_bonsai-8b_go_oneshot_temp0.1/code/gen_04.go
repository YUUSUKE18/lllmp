package main

import (
	"regexp"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var validLines int
	for {
		sc.Scan()
		if sc.Err() {
			break
		}
		if sc.Text() == "" {
			break
		}
		// ループ内での行の処理
		// 1行ずつ処理
		if validLines < 1 {
			// ループ内での行の処理
			// 1行ずつ処理
			// 正規表現で検証
			if re.MatchString(sc.Text()) {
				validLines++
			}
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}

func re() regexp.MustCompile(`^[\d,]+$`)
