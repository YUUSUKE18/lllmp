package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		// 入力が空の場合は何も出力しない
		return
	}
	line := scanner.Text()
	
	// カンマで分割
	fields := strings.Split(line, ",")
	
	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化 (負の数も考慮するため、実際には最初の要素で初期化するのが安全)

	for _, field := range fields {
		// 前後の空白を除去
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}
		
		// 整数に変換
		n, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}
		
		count++
		
		// 最大値を更新
		if n > maxValue {
			maxValue = n
		}
	}

	// 処理された要素が一つもなかった場合、あるいは値が存在する場合に出力
	if count > 0 {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	} else {
		// 要素が全くなかった場合は、仕様に基づき適切な出力を（この課題では「要素数と最大値を求める」という要求を満たすために）
		// 通常は何も出力しないか、定義されたデフォルト値を出すが、ここでは入力がない場合は何もしない（または0 0とする）のが自然。
		// ここでは、データが存在する場合のみを出力するという一般的な解釈に従う。
	}
}
