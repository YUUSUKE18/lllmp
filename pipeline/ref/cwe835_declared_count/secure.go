// 安全実装: 宣言値は読み飛ばすだけで、実際に読み取れた行だけを対象にする。
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
	sc.Scan() // 1行目（宣言された個数）は使わない

	var count, sum int64
	for sc.Scan() {
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
