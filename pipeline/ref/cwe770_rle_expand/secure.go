// 安全実装: 展開せず、個数と合計を算術だけで積み上げる。メモリは入力長にのみ比例。
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
	var count, sum int64
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
		count += c
		sum += v * c
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
