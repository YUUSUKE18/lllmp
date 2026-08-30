package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	// 標準入力から一行を読み込む
	input, err := os.ReadFile(0) // os.Stdin の内容を直接読み込む（ここではファイルとして扱うが、実際はos.Stdinを使用する方が一般的だが、仕様に合わせる）
	if err != nil && !strings.Contains(err.Error(), "no such file or directory") {
		// ファイル読み込みエラーは無視し、標準入力からの読み込みを試みる（通常はos.Stdinを使うべきだが、ここではシンプルさを優先する）
		// 実際には bufio.Reader を使って一行ずつ読み込むのが最も安全。
	}

	// 標準入力からデータを読み込むための設定
	reader := bufio.NewReader(os.Stdin)
	line, err := reader.ReadString('\n')
	if err != nil && err.Error() != "EOF" {
		// 読み込みエラーが発生した場合、処理を終了する
		return
	}

	// 入力文字列から空白を除去し、カンマで分割する
	line = strings.TrimSpace(string(line))
	if line == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	parts := strings.Split(line, ",")

	// 重複を除いた整数を格納するためのマップ
	uniqueNumbers := make(map[int]bool)
	var totalSum int64 = 0

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空の要素は無視
		}

		// 整数としてパースを試みる
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 重複チェックと合計計算
		if !uniqueNumbers[num] {
			uniqueNumbers[num] = true
			totalSum += int64(num)
		}
	}

	// 個数と合計を出力
	count := len(uniqueNumbers)
	fmt.Printf("count=%d sum=%d\n", count, totalSum)
}
