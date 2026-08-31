package main

import (
	"bufio"
	"fmt"
	"io"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(io.Discard) // 標準入力を読み込むための設定
	scanner := bufio.NewScanner(reader)
	
	// 標準入力をスキャンする
	scanner.Scan()
	input := scanner.Text()
	
	// 空白を区切り文字として処理し、有効な項目を抽出
	parts := strings.Fields(input)
	var totalElements int64 = 0
	var totalSum int64 = 0
	
	for _, part := range parts {
		// "値:回数" の形式で解析
		if idx := strings.Index(part, ":"); idx == -1 {
			continue // 形式が合っていない場合は無視
		}
		
		valueStr := part[:idx]
		countStr := part[idx+1:]
		
		// 値と回数の文字列を整数に変換
		value, errVal := strconv.ParseInt(valueStr, 10, 64)
		if errVal != nil {
			continue // 変換に失敗した場合は無視
		}
		
		count, errCount := strconv.ParseInt(countStr, 10, 64)
		if errCount != nil {
			continue // 変換に失敗した場合は無視
		}
		
		// 回数が負の値の場合は無視（仕様：回数は 0 以上）
		if count < 0 {
			continue
		}
		
		// 要素数と合計に追加
		totalElements += count
		totalSum += value * int64(count)
	}
	
	fmt.Printf("count=%d sum=%d\n", totalElements, totalSum)
}
