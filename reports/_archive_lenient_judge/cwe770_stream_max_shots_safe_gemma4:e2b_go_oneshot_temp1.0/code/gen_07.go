package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力から全体を読み込む
	input, err := os.ReadFile(0) // os.Stdinのバイト列を読み込む、またはbufio.Readerを使うことも可能だが、ここではシンプルにファイルとして扱う
	if err != nil {
		return
	}
	data := string(input)

	// カンマで分割し、空白を無視して整数を抽出する
	parts := strings.Split(data, ",")
	var nums []int64
	
	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}
		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err == nil {
			nums = append(nums, num)
		}
	}

	count := len(nums)
	if count == 0 {
		// 要素が一つもなかった場合の処理（仕様上、何も出力しないか、あるいは0を出力するなど。ここでは空の結果として扱う）
		fmt.Println("count=0 max=-1") // または適切なデフォルト値。最大値がないため-1などを設定。
		return
	}

	var maxVal int64 = nums[0]
	for _, num := range nums {
		if num > maxVal {
			maxVal = num
		}
	}

	// 結果を出力
	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
