package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	var count string
	var sum string

	// 第1行からcountを読み取る
	count = strings.TrimSpace(os.Stdin.readline())
	if count == "" {
		fmt.Println("count=<0> sum=<0>")
		return
	}

	// 2行以降から整数を読み取る
	for {
		line := strings.TrimSpace(os.Stdin)
		if line == "" {
			break
		}
		if m, err := strconv.Atoi(line); err == nil {
			if count == "" {
				continue
			}
			// countと一致しない場合は、その行を無視
			if m != count {
				continue
			}
			// sumを追加
			sum = strings.TrimSpace(sum) + m + " "
		}
	}

	// 最後のスラッシュとスペースを削除
	sum = strings.TrimSpace(sum)
	if len(sum) > 0 && sum[len(sum)-1] == " " {
		sum = strings.TrimSpace(sum[:len(sum)-1])
	}

	fmt.Printf("count=%s sum=%s\n", count, sum)
}
