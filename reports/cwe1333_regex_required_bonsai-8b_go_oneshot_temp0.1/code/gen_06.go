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
		// ルートイン：空行や非数字/カンマの行は無視
		if !regexp.MustCompile(`^[0-9,]+$`).MatchString(sc.Text()) {
			continue
		}
		// ルートイン：1個以上の数字列があるかを確認
		if len(regexp.MustCompile(`^[0-9,]+$`).MatchString(sc.Text())) > 1 {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
