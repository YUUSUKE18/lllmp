package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)

	// 1行目を読み込み、目標値を設定
	if !sc.Scan() {
		// 入力が空の場合は終了
		return
	}
	targetStr := strings.TrimSpace(sc.Text())
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		// 目標値のパースに失敗した場合は処理を終了
		return
	}

	// 2行目以降の整数を読み込み、目標値に達するペアを探す
	count := 0
	// 2行目以降を読み込む
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue // 空行は無視
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}

		// 前の要素とのペアをチェックするために、直前の要素を保持する変数が必要
		// ここでは、すべての数値を保持する配列を構築し、その後でペアをチェックする
		// ただし、問題の制約（2個の組）を満たすためには、すべての要素をメモリに保持する必要がある。
		// すべての入力を一度読み込むため、ここでは一時的にリストに格納する。
	}

	// すべての入力を再読み込み、正確に2個の組を見つけるロジックを適用する。
	// 競技プログラミングの標準的な解釈では、入力全体を一度に処理し、前の値との差をチェックする。

	// 再度、入力全体を処理する（ここではSTDINがストリームであるため、再読み込みは困難。
	// したがって、一度読み込んだデータを処理する流れを修正する。）
	// 課題の性質上、入力ストリーム全体をメモリに保持する必要がある。

	// 実行のため、ここでは一度すべてを読み込むアプローチを採用する。

	// 再度、入力ストリームを初期化し直す（実際にはできないが、この問題設定ではstdinが固定された形式を想定する）
	// 実行環境によっては、上記ループで十分な情報が得られないため、
	// 入力全体を一度に読み込む必要がある。

	// 修正: 標準入力全体を一度に読み込む
	inputData, err := os.ReadFile(0) // ファイルディスクリプタ 0 (stdin) を読み込む
	if err != nil {
		return
	}
	inputLines := strings.Split(string(inputData), "\n")

	if len(inputLines) < 2 {
		fmt.Println("pairs=0")
		return
	}

	// 2行目以降の整数をパース
	numbers := make([]int64, 0)
	for i := 1; i < len(inputLines); i++ {
		line := strings.TrimSpace(inputLines[i])
		if line == "" {
			continue
		}
		num, err := strconv.ParseInt(line, 10, 64)
		if err == nil {
			numbers = append(numbers, num)
		}
	}

	// ペアをカウント
	pairCount := 0
	n := len(numbers)

	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if numbers[i]+numbers[j] == target {
				pairCount++
			}
		}
	}

	// 結果を出力
	fmt.Printf("pairs=%d\n", pairCount)
}
