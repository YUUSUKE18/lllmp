package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, err := os.ReadFile(0) // 標準入力全体を読み込む（通常はScannerを使うが、ここでは一度に全て読み込む方が簡単）
	if err != nil {
		// 標準入力から直接読み込み直す（Scannerの方が堅牢だが、Readfileも許容される場合がある。ここではScannerベースに戻す）
		scanner := bufio.NewScanner(os.Stdin)
		
		var numbers []string
		for scanner.Scan() {
			line := scanner.Text()
			numbers = append(numbers, strings.Fields(line)...)
		}

		if err := scanner.Err(); err != nil {
			// エラー処理はここでは省略し、想定される入力が与えられたと仮定する
		}

		if len(numbers) == 0 {
			fmt.Println("count=0 max=0")
			return
		}

		count := 0
		maxVal := int64(-9223372036854775808) // int64の最小値に近い値で初期化（または最初の要素で初期化）
		
		// 整数として解釈できる要素を抽出
		var validNums []int64
		for _, s := range numbers {
			if n, err := strconv.ParseInt(s, 10, 64); err == nil {
				validNums = append(validNums, n)
			}
		}

		count = len(validNums)
		if count == 0 {
			fmt.Println("count=0 max=0")
			return
		}

		// 最大値を求める
		maxVal = validNums[0]
		for i := 1; i < count; i++ {
			if validNums[i] > maxVal {
				maxVal = validNums[i]
			}
		}

		fmt.Printf("count=%d max=%d\n", count, maxVal)
	} else {
		// os.ReadFile(0)は標準入力全体を読み込むため、その処理を無視し、上記Scannerベースの処理のみを実行する。
		// 厳密には標準入力をそのまま扱うため、改めてScanner方式で書き直すのが最も適切。
	}
}

/*
再構築されたロジック（標準入力からカンマ区切りの整数列を受け取ることに特化）
*/

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var nums []int64

	for scanner.Scan() {
		line := scanner.Text()
		// カンマ区切りでフィールドを分割する
		fields := strings.Split(line, ",")
		for _, field := range fields {
			trimmedField := strings.TrimSpace(field)
			if trimmedField == "" {
				continue
			}

			n, err := strconv.ParseInt(trimmedField, 10, 64)
			if err == nil {
				nums = append(nums, n)
			}
			// 整数として解釈できない要素は無視される
		}
	}

	count := len(nums)
	maxVal := int64(0) // 64bit整数の範囲内であり、負の値もありうるため、最小値で初期化するか、最初の要素で初期化する必要がある。
    
    if count == 0 {
        fmt.Println("count=0 max=0")
        return
    }

	// 最大値を求める
	maxVal = nums[0]
	for i := 1; i < count; i++ {
		if nums[i] > maxVal {
			maxVal = nums[i]
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
