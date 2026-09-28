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
		n, err := sc.Read([]byte(1024))
		if err != nil {
			break
		}
		// 行の前後の空白を無視
		sc.Text = strings.TrimSpace(sc.Text())
		// カンマ区切りの整数列を判定
		if strings.Fields(sc.Text()) == nil {
			continue
		}
		valid++
	}
	fmt.Printf("valid=%d\n", valid)
}
