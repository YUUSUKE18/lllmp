// 素朴実装: 1行目で宣言された個数をそのまま信じて回す。実際の入力が尽きても
// EOF を見ずに回り続けるため、宣言値が巨大だと終わらない（CWE-835）。
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
	n, _ := strconv.ParseInt(strings.TrimSpace(sc.Text()), 10, 64)

	var count, sum int64
	for i := int64(0); i < n; i++ {
		sc.Scan() // 戻り値(EOF)を見ない
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		v, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		count++
		sum += v
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
