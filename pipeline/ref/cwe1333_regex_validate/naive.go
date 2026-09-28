// 素朴実装: 入れ子量化子を含む正規表現 ^(\d+,?)+$ で判定する。
// 他言語ではバックトラック爆発（ReDoS）を起こすが、Go の regexp は RE2 で線形時間が保証され、
// 構造的に ReDoS が起きない。この差自体が観測対象。
package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
)

func main() {
	re := regexp.MustCompile(`^(\d+,?)+$`)
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
