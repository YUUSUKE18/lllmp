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
	valid := 0
	for {
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		// ラインの前後の空白を無視
		sc.Scan(buf)
		// ラインの内容を分割
		parts := strings.Fields(buf)
		// パーツが1より少ない場合、無視
		if len(parts) < 1 {
			continue
		}
		// パーツの1つ目は数字列の最初
		if len(parts) > 1 && strconv.Atoi(parts[1]) != 0 {
			valid++
		}
	}
	fmt.Printf("valid=%d\n", valid)
}
