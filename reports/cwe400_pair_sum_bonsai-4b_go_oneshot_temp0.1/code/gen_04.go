package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var target int
var pairs int

func main() {
	sc := bufio.NewScanner(os.Stdin)
	// 第1行は目標値
	line, err := sc.Scan()
	if err != nil {
		return
	}
	if err != nil {
		return
	}
	if strings.TrimSpace(line) {
		target = strconv.Atoi(line)
	}
	
	// 2行目以降は整数
	for {
		line, err := sc.Scan()
		if err != nil {
			break
		}
		if strings.TrimSpace(line) {
			n, err := strconv.Atoi(line)
			if err != nil {
				continue
			}
			if n == target {
				pairs++
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
