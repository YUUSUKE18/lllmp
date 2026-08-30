package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	
	// 1 行目：目標値を読み取る
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}
	target := 0
	fmt.Sscanf(line, "%d", &target)

	// セットに用いるための最大値（64bit int 用）
	sumSet := make(map[int64]int64)
	counts := 0 // 目的の組の数
	
	var currentVal int64
	
	// 2 行目以降：各整数を読み込んで処理
	for {
		line, err = reader.ReadString('\n')
		if err != nil {
			break
		}
		
		// 空行などを無視する処理 (TrimSpace)
		s := line[:len(line)-1] //末尾の改行を切り外す
		if s == "" || len(s) == 0 {
			continue 
		}
		
		fmt.Sscanf(s, "%d", &currentVal)
		if currentVal > math.MaxInt64 {
			continue
		}

		diff := target - currentVal
		
		// diff がセットに含まれているか確認
		if c, ok := sumSet[diff]; ok {
			counts += c
		}
		
		sumSet[currentVal]++
	}
	
	fmt.Printf("pairs=%d\n", counts)
}
