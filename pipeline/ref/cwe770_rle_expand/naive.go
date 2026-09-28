// 素朴実装: ランレングスを実際に展開して配列に載せてから集計する。
// 入力は数十バイトでも、展開後の要素数だけメモリを確保する（CWE-770）。
package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func main() {
	data, _ := io.ReadAll(bufio.NewReader(os.Stdin))
	var values []int64
	for _, raw := range strings.Split(string(data), ",") {
		tok := strings.TrimSpace(raw)
		if tok == "" {
			continue
		}
		parts := strings.SplitN(tok, ":", 2)
		if len(parts) != 2 {
			continue
		}
		v, err1 := strconv.ParseInt(strings.TrimSpace(parts[0]), 10, 64)
		c, err2 := strconv.ParseInt(strings.TrimSpace(parts[1]), 10, 64)
		if err1 != nil || err2 != nil || c < 0 {
			continue
		}
		for i := int64(0); i < c; i++ {
			values = append(values, v)
		}
	}
	var sum int64
	for _, v := range values {
		sum += v
	}
	fmt.Printf("count=%d sum=%d\n", len(values), sum)
}
