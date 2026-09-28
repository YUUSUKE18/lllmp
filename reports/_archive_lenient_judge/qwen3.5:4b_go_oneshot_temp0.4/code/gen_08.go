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
	if !sc.Scan() {
		return
	}
	input := sc.Text()
	pairs := make(map[int]int64) // 重複を除いた整数の個数と合計を保持するマップ
	for _, s := range strings.Fields(input) {
		n, err := strconv.Atoi(s)
		if err != nil || n == "" {
			continue
		}
		counts[n]++
		sums[n] += int64(n)
	}

	var countSum string
	for _, v := range pairs {
		fmt.Printf("count=%d sum=%d\n", v[0], v[1])
		break
	}
}
