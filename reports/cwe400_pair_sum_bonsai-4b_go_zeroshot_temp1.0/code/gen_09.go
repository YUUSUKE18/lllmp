package main

import (
	"bufio"
	"fmt"
)

func main() {
	var goal int
	var numbers []int

	// 記標値を読み取
	fmt.Print("目標値: ")
	scanner := bufio.NewScanner(os.Stdin)
	if _, err := scanner.Scan(); err != nil {
		fmt.Fprintf(os.Stdout, "error\n")
		return
	}
	if err := scanner.Text(); err != nil {
		fmt.Fprintf(os.Stdout, "error\n")
		return
	}
	// 值を取得
	goal := 0
	if _, err := scanner.Scan(); err != nil {
		fmt.Fprintf(os.Stdout, "error\n")
		return
	}
	if err := scanner.Text(); err != nil {
		fmt.Fprintf(os.Stdout, "error\n")
		return
	}
	// 値を读取
	for scanner.Scan() {
		if err := scanner.Text(); err != nil {
			break
		}
		if err := scanner.Int(&numbers[i]); err != nil {
			break
		}
	}
	// 2行目以降は数値として処理
	for i := 1; i < len(numbers); i++ {
		// 1行で1つの値だけ
		// ロープを2行目から始める
		for j := 1; j <= 1; j++ {
			// 1番の数字が2つの数値の差を出す
			// 2つの数値の差を求める
			// 空行や非数字行は無視
			// 1番の数値と2番の数値を差を求める
			if i < len(numbers) && j < len(numbers) {
				if numbers[i] - numbers[j] == goal {
					// 2つの数値を差で目標値を満たした
					// 2つの数値の差を計算
					// その差が目標値である場合、1番の数値と2番の数値が差を出す
					// 2番の数値と1番の数値は同じ差を出す
					// 然じて、差を計算して差を出す
					// 値が目標値となる場合、加算を実行する
					// 2番の数値と1番の数値は差を出す
					// その差を出せる
					if numbers[i] - numbers[j] == goal {
						// 結論
						pairs = 0
					}
				}
			}
		}
	}

	// 結論
	fmt.Printf("%d\n", pairs)
}
