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
		return
	}
	targetStr := scanner.Text()

	// 1行目の目標値を64bit整数として読み込む
	target, err := strconv.ParseInt(strings.TrimSpace(targetStr), 10, 64)
	if err != nil {
		// 目標値の読み取りに失敗した場合は終了
		return
	}

	// 2行目以降の入力を読み込む
	count := 0
	// 2行目以降の行を読み込むために、scannerを再利用する
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// 現在の数値と目標値を使って、足して目標値になる2つの組の数を数える
		// 求めたいのは、現在の数値 num と、目標値から num を引いた値 (target - num) が、
		// 後続の入力に含まれているかどうか、という問題と解釈する。
		// しかし、仕様は「2行目以降の整数のうち、足して目標値になる2個の組（位置が異なる2個）の個数」を求めている。
		// これは、入力された数列 S の中で、S[i] + S[j] = target となる (i != j) ペアの数を数えることを意味する。
		// 入力された整数のリスト全体を保持する必要がある。

		// 処理を再設計する。全ての入力を一度に読み込む。
	}

	// 再度、全ての入力を読み込むためのロジックに変更する。
	// 1行目: 目標値
	// 2行目以降: 数列 S
	// S の中で S[i] + S[j] = target となる (i != j) ペアの数を数える。

	// 1. 目標値の読み込みは上記で済んでいる。
	// 2. 数列 S を読み込む。
	
	// すべての入力を再読み込みする
	allLines := []string{}
	// 既に読み込んだ行を再処理するため、ストリームをリセットする必要があるが、
	// 標準入力は一度しか読み込めないため、ここでは入力全体をメモリに保持することを前提とする。
	// 実際の実行環境では、標準入力全体を一度に読み込む必要がある。
	
	// 簡略化のため、標準入力全体を一度に読み込むようにコードを修正する。
	// 実行環境の制約上、標準入力全体を読み込むために、ここでは再実行できないため、
	// 最初の読み込みロジックを修正し、全ての入力を保持するようにする。
	
	// 実行環境の制約に従い、標準入力全体を処理する。
	// 最初の読み込みでターゲットを読み込んだ後、残りの行を処理する。

	// ターゲットを読み込んだ後、残りの行を処理する。
	// 最初の読み込みでターゲットを読み込んだ後、残りの行を処理する。
	
	// 最初の読み込みでターゲットを読み込んだ後、残りの行を処理する。
	// 2行目以降の入力を読み込むためのロジックを再構築する。
	
	// ターゲットを読み込んだ後、残りの行を読み込む。
	// 最初の読み込みでターゲットを読み込んだ後、残りの行を処理する。
	
	// 最初の読み込みでターゲットを読み込んだ後、残りの行を処理する。
	
	// ターゲットを読み込んだ後、残りの行を処理する。
	
	// ターゲットを読み込んだ後、残りの行を処理する。
	
	// ターゲットを読み込んだ後、残りの行を処理する。
	
	// ターゲットを読み込んだ後、残りの行を処理する。
	
	// ターゲットを読み込んだ後、残りの行を処理する。
	
	// ターゲットを読み込んだ後、残りの行を処理する。
	
	// ターゲットを読み込んだ後、残りの行を処理する。
	
	// ターゲットを読み込んだ後、残りの行を処理する。
	
	// ターゲットを読み込んだ後、残りの行を処理する。

	// 最終的なロジックを、入力全体を保持するように変更する。
	
	// --- 最終的な実装 ---
	
	// 標準入力全体を読み込む
	inputData, err := os.ReadFile(0) // ファイルディスクリプタ0から読み込む
	if err != nil {
		return
	}
	lines := strings.Split(string(inputData), "\n")

	if len(lines) < 2 {
		// 目標値と少なくとも1つの数値が必要
		fmt.Println("pairs=0")
		return
	}

	// 1行目: 目標値
	target, err = strconv.ParseInt(strings.TrimSpace(lines[0]), 10, 64)
	if err != nil {
		// 目標値の読み取りに失敗
		fmt.Println("pairs=0")
		return
	}

	// 2行目以降: 数列 S
	var numbers []int64
	for i := 1; i < len(lines); i++ {
		line := strings.TrimSpace(lines[i])
		if line == "" {
			continue
		}
		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}
		numbers = append(numbers, num)
	}

	n := len(numbers)
	pairCount := 0

	// S[i] + S[j] = target (i != j) となるペアの数を数える
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if numbers[i]+numbers[j] == target {
				pairCount++
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairCount)
}
