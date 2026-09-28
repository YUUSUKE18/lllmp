package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	input, err := os.ReadFile(0)
	if err != nil {
		return
	}
	data := string(input)
	
	// カンマで区切られた各要素を処理するために、入力全体をスペースで分割するのではなく、
	// 構造的に処理する
	
	// 入力を文字列として扱い、カンマで区切って個々の "値:回数" を抽出する
	parts := strings.Split(strings.TrimSpace(data), "\n")
	
	totalCount := int64(0)
	totalSum := int64(0)
	
	for _, line := range parts {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		
		// カンマで区切られた複数の "値:回数" を処理する
		segmentParts := strings.Split(line, ",")
		
		for _, segment := range segmentParts {
			segment = strings.TrimSpace(segment)
			if segment == "" {
				continue
			}
			
			// "値:回数" の形式で分割
			kv := strings.Split(segment, ":")
			if len(kv) != 2 {
				continue // 形式が不正な場合は無視
			}
			
			valueStr := strings.TrimSpace(kv[0])
			countStr := strings.TrimSpace(kv[1])
			
			// 値と回数を整数に変換
			value, errV := strconv.ParseInt(valueStr, 10, 64)
			count, errC := strconv.ParseInt(countStr, 10, 64)
			
			if errV != nil || errC != nil {
				continue // 変換エラーがあれば無視
			}
			
			// 要素数と合計を計算
			totalCount += count
			totalSum += value * count
		}
	}
	
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
