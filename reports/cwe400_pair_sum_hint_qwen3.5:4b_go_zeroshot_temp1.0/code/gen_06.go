package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	// 目標値の読み取り
	line, err := reader.ReadString('\n')
	if err != nil || line == "" {
		return
	}
	targetStr := strings.TrimSpace(line)
	if targetStr == "" {
		return
	}
	target, err := fmt.Scanf("%d", &targetStr) // スキャンで直接整数へ変換しないため、文字列として処理
	fmt.Println("Error:", err)
	fmt.Printf("%s\n", line) // 目標値を出力
}

func pairs() {
	if n < 2 {
		return
	}
	for i := range n {
		x := ints[i]
		target := target - x
		j := idxSet[target]
		if j >= 0 && j != i {
			pairs++
		}
		idxSet[x] = i
	}
	fmt.Printf("pairs=%d\n", pairs)
}
