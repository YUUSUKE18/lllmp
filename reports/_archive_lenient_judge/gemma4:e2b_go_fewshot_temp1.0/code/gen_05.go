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
	if sc.Scan() {
		line := sc.Text()
		// カンマで分割し、各要素を整数に変換してセットに格納する
		set := make(map[int]bool)
		for _, s := range strings.Split(line, ",") {
			trimmed := strings.TrimSpace(s)
			if trimmed == "" {
				continue
			}
			n, err := strconv.Atoi(trimmed)
			if err == nil {
				set[n] = true
			}
		}

		count := len(set)
		sum := int64(0)
		for num := range set {
			sum += int64(num)
		}

		// 結果を出力
		fmt.Printf("count=%d sum=%d\n", count, sum)
	}
}
