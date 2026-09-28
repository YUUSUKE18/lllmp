// 安全実装: 曖昧さの無い正規表現 ^\d+(,\d+)*,?$ で判定する（バックトラックが線形に収まる形）。
package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
)

func main() {
	re := regexp.MustCompile(`^\d+(,\d+)*,?$`)
	sc := bufio.NewScanner(os.Stdin)
	valid := 0
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		if re.MatchString(line) {
			valid++
		}
	}
	fmt.Printf("valid=%d\n", valid)
}
