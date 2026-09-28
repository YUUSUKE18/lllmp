package main

import (
	"regexp"
	"strconv"
	"strings"
	"os"
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
		// 空格とタブを無視
		sc.Text = strings.ReplaceAll(sc.Text, " ", "")
		sc.Text = strings.ReplaceAll(sc.Text, "\t", "")
		// カンマ区切りの正規表現
		re := regexp.MustCompile(`^(\d+)(?:,\d+)*$`)
		if re.MatchString(sc.Text) {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
