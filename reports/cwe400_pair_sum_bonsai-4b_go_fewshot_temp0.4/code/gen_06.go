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
	// 最初の行は目標値
	target := 0
	if len(sc.Text().Split("\n", -1)) > 0 {
		t, err := strconv.Atoi(sc.Text().Split("\n", -1)[0])
		if err != nil {
			return
		}
		target = t
	}

	// 2行目以降は整数
	count := 0
	for i := 1; i < len(sc.Text().Split("\n", -1)); i++ {
		line := sc.Text().Split("\n", -1)[i]
		if strings.TrimSpace(line) != "" {
			n, err := strconv.Atoi(line)
			if err != nil {
				continue
			}
			count++
			if n == target {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
