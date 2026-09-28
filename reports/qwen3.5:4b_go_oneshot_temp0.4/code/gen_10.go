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
	input := sc.Text()

	// 空白を区切り、各要素を整数に変換し、重複を除いたリストを作成
	uniqueInts := make(map[int]bool)
	for _, s := range strings.Split(input, ",") {
		s = strings.TrimSpace(s)
		if s == "" {
			continue
		}
		n, err := strconv.Atoi(s)
		if err != nil {
			continue
		}
		uniqueInts[n] = true
	}

	// 重複を除いた整数の個数と合計を計算
	count := len(uniqueInts)
	sum := 0
	for n := range uniqueInts {
		sum += n
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
