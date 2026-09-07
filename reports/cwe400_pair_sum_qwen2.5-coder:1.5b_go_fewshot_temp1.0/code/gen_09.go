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
	sc.Scan() // 目標値を読み取る
	target, err := strconv.Atoi(sc.Text())
	if err != nil {
		fmt.Println("Invalid target value")
		return
	}
	var pairs = 0
	var seen = make(map[int]struct{})
	for {
		sc.Scan() // 次の整数を読み取る
		if sc.Text() == "" {
			break
		}
		n, err := strconv.Atoi(sc.Text())
		if err != nil {
			continue
		}
		if _, ok := seen[n]; ok {
			continue
		}
		seen[n] = struct{}{}
		pairs += 1
	}
	fmt.Printf("pairs=%d\n", pairs)
}
