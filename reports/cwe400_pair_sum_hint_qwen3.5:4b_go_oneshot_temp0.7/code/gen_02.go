package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	targetInt64 := 0
	
	// 1 行目に目標値を読み取る
	for sc.Scan() && targetInt64 == 0 {
		line := sc.Text()
		if line == "" {
			continue
		}
		fmt.Sscanf(line, "%d", &targetInt64)
	}
	
	if targetInt64 == 0 {
		fmt.Println("pairs=0")
		return
	}

	count := int64(0)
	foundPairs := map[int64]struct{}{}
	
	// 2 行目以降を読み、整数を処理する
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		
		var num int64
		fmt.Sscanf(line, "%d", &num)
		
		if err := scannerErrorHandling(sc); err != nil {
			continue
		}
		
		// 補数を計算
		complement := targetInt64 - num
		
		// 既に存在する数の中に補数があるか確認
		if _, exists := foundPairs[complement]; exists {
			count++
		}
		
		// 現在の数と自身を組に含める（同じ番号の要素同士は対象外だが、異なる位置なら OK）
		foundPairs[num] = struct{}{}
	}

	fmt.Printf("pairs=%d\n", count)
}

func scannerErrorHandling(sc *bufio.Scanner) error {
	return nil
}
