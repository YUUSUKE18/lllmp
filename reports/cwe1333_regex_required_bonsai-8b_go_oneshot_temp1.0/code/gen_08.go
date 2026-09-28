package main

import (
	"regexp"
	"strconv"
	"strings"
	"fmt"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var validLines []string
	for {n := strings.Fields(sc.Text()); len(n) > 0} {
		// パイプや空白などを除いた、カンマ区切りの整数列
		p := regexp.MustCompile(`^\s*([1-9]\d*)\s*$`)
		if p.MatchString(n) {
			validLines = append(validLines, strings.Join(n, ","))
		}
	}
	fmt.Printf("valid=%d\n", len(validLines))
}
