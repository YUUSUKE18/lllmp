package main

import (
	"regexp"
	"strconv"
	"strings"
	"fmt"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var validLines int
	for {
		sc.Scan()
		if sc.Err() {
			break
		}
		if strings.TrimSpace(sc.Text()) == "" {
			continue
		}
		// カンマ区切りの整数列を検出
		re := regexp.MustCompile(`^(\d+)(?:,(\d+))*$`)
		if re.MatchString(strings.TrimSpace(sc.Text())) {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
