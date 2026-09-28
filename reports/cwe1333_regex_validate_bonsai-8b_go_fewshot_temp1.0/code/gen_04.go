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
		// 行の前後の空白を無視
		sc.Text = strings.TrimSpace(sc.Text())
		// カンマ区切りの整数列を判定
		fields := strings.Fields(sc.Text)
		if len(fields) > 1 {
			valid++
		}
	}
	fmt.Printf("valid=%d\n", valid)
}
