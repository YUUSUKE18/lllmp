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
	
	// 1行目を読み飛ばす (目標値)
	if !scanner.Scan() {
		return
	}
	// 目標値は使わないが、入力が続いていることを確認するため読み飛ばす

	count := 0
	// 2行目以降を読み込み、整数を処理する
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}

		fields := strings.Fields(line)
		for _, field := range fields {
			n, err := strconv.ParseInt(field, 10, 64)
			if err != nil {
				continue // 整数として解釈できないものは無視
			}
			
			// 最初の値とのペアをチェック
			if count == 0 {
				// 最初の値として記録
				// 実際には、どこか別の値との差を計算する必要があるため、ここでは一旦すべての値を保持する
			} else {
				// 2つ目の値として、以前の値との差をチェック
				// この問題の仕様「足して目標値になる2個の組」を正しく解釈するには、
				// どの値が「最初の値」で、どの値が「2番目の値」なのか、という文脈が必要。
				// 通常、このような問題では、入力されたすべての数に対して、他の数との和が目標値になるペアの数を数える。
				// ここでは、入力されたすべての整数のリストを保持し、それらのペアをチェックするアプローチを取る。
			}
		}
	}
	
	// 再度入力を読み込み、すべての整数をリストとして保持する
	allNumbers := []int64{}
	
	// 標準入力全体を再度読み込む必要があるが、Goのstdinの動作を考えると、
	// 最初の行は目標値、残りはデータという構造を考慮する。
	
	// 実際には、標準入力ストリーム全体を扱う必要がある。
	// 1行目: 目標値
	// 2行目以降: 数値
	
	// 再度、入力ストリームをリセットして処理を正しく行う。
	// ここでは、readline的な処理を行うために、全ての行を読み込む。
	
	inputLines := []string{}
	scanner2 := bufio.NewScanner(os.Stdin)
	for scanner2.Scan() {
		inputLines = append(inputLines, scanner2.Text())
	}
	
	if len(inputLines) < 2 {
		fmt.Println("pairs=0")
		return
	}

	targetStr := strings.TrimSpace(inputLines[0])
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		// 目標値の解析に失敗した場合は終了
		return
	}

	// 2行目以降の整数を抽出
	dataNumbers := []int64{}
	for i := 1; i < len(inputLines); i++ {
		line := strings.TrimSpace(inputLines[i])
		if line == "" {
			continue
		}
		
		fields := strings.Fields(line)
		for _, field := range fields {
			n, err := strconv.ParseInt(field, 10, 64)
			if err == nil {
				dataNumbers = append(dataNumbers, n)
			}
		}
	}
	
	// ペアの数を数える (位置が異なる2個の組で、足して目標値になるもの)
	pairCount := 0
	n := len(dataNumbers)
	
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if dataNumbers[i] + dataNumbers[j] == int64(target) {
				pairCount++
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairCount)
}
