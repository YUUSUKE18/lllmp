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
	// 別の行を読み、目標値
	target := 0
	for _, line := range sc {
		if strings.TrimSpace(line) == "" {
			continue
		}
		val, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		target = val
	}

	var pairs int
	// 2行目以降、整数を读む
	for {
		line := sc.Text()
		if strings.TrimSpace(line) == "" {
			continue
		}
		val, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if val == target {
			pairs++
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
