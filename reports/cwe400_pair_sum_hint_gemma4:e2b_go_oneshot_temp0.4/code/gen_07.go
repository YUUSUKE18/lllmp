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
	
	// 1行目を読み飛ばす（目標値）
	if !scanner.Scan() {
		// 入力が空の場合
		return
	}
	// 目標値はここでは使用しないが、仕様に従い読み飛ばす
	// targetStr := scanner.Text() 

	count := 0
	// 2行目以降を読み込む
	for scanner.Scan() {
		line := scanner.Text()
		// 空行は無視
		if strings.TrimSpace(line) == "" {
			continue
		}
		
		// 行内の整数をすべて抽出
		fields := strings.Fields(line)
		
		for _, field := range fields {
			n, err := strconv.ParseInt(field, 10, 64)
			if err != nil {
				// 整数として解釈できない行やフィールドは無視
				continue
			}
			
			// 読み込んだ整数をリストに追加
			// 実際には、入力が「1行に1個ずつ並ぶ」という指示に基づき、
			// 各行が1つの整数を持つと解釈し、その整数を処理する。
			// ただし、例の形式と仕様の解釈が異なる可能性があるため、
			// 「2行目以降には整数が 1 行に 1 個ずつ並びます」を「各行が1つの整数」と解釈する。
			// もし「2行目以降の行全体が1つの整数」を意味するなら、以下の処理が適切。
			
			// 読み込んだ整数を一時的に保持する（ここでは、すべての整数をリストに集める）
			// 課題の意図を再確認すると、「2行目以降の整数のうち、足して目標値になる2個の組」を求めるため、
			// すべての整数を保持する必要がある。
			// したがって、読み込んだ整数をリストに追加する。
			// この問題の入力形式が「2行目以降の各行が1つの整数」であると仮定し、
			// 読み込んだ整数をリストに追加する。
			// ただし、入力が「1行に1個ずつ並ぶ」という表現が曖昧なため、
			// 実際には各行から整数を抽出する。
			
			// 読み込んだ整数をリストに追加する処理を、ループの外側で集計する形に変更する。
			// 読み込み処理を再構成する。
		}
	}

	// --- 再構成されたロジック ---
	// 1行目（目標値）を読み飛ばした後、残りの行から整数を読み込む。
	
	// 1行目（目標値）を読み飛ばす
	if !scanner.Scan() {
		// 入力が1行しかなかった場合
		fmt.Println("pairs=0")
		return
	}
	// 目標値は読み飛ばす (ここでは使用しないが、入力形式に従う)
	// targetStr := scanner.Text() 

	numbers := []int64{}
	
	// 2行目以降を読み込む
	for scanner.Scan() {
		line := scanner.Text()
		fields := strings.Fields(line)
		for _, field := range fields {
			n, err := strconv.ParseInt(field, 10, 64)
			if err == nil {
				numbers = append(numbers, n)
			}
		}
	}

	// 2個の組の数を数える
	pairCount := 0
	n := len(numbers)
	
	// 2つのインデックス i と j (i != j) について、numbers[i] + numbers[j] == target となるペアを探す。
	// ただし、目標値が読み飛ばされたため、目標値がどこにあるか不明確。
	// 仕様を再解釈する:
	// 1行目: 目標値 T
	// 2行目以降: 整数 a1, a2, a3, ...
	// 求めるのは、a_i + a_j = T となるペアの数。
	
	// 最初の行を目標値 T とする
	target, err := strconv.ParseInt(scanner.Text(), 10, 64)
	if err != nil {
		// 最初の行が目標値として無効な場合は終了
		fmt.Println("pairs=0")
		return
	}
	
	// 2行目以降の整数を再読み込みする（標準入力ストリームはポインタを進むため、再読み込みは不可能。
	// 最初の読み込み時に全てのデータを保持する必要がある。）
	
	// 最初の読み込み時に、目標値と残りのデータをすべて保持する。
	
	// --- 最終的な正しい実装方針 ---
	// 全ての行を一度に読み込み、処理する。
	
	// 再度、入力全体を読み込むための準備。標準入力は一度しか読み込めないため、
	// データをメモリに保持する必要がある。
}

// 実行可能な最終コードを生成する
func main() {
	// 1. 全ての入力を読み込む
	inputData, err := os.ReadFile(0) // 標準入力全体を読み込む
	if err != nil {
		return
	}
	
	lines := strings.Split(strings.TrimSpace(string(inputData)), "\n")
	
	if len(lines) < 2 {
		fmt.Println("pairs=0")
		return
	}
	
	// 1行目: 目標値 T
	targetStr := strings.TrimSpace(lines[0])
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		// 目標値が不正な場合は0を返すか、エラー処理を行うが、ここでは0とする
		fmt.Println("pairs=0")
		return
	}
	
	// 2行目以降: 整数リスト N
	numbers := []int64{}
	for i := 1; i < len(lines); i++ {
		line := strings.TrimSpace(lines[i])
		if line == "" {
			continue
		}
		fields := strings.Fields(line)
		for _, field := range fields {
			n, err := strconv.ParseInt(field, 10, 64)
			if err == nil {
				numbers = append(numbers, n)
			}
		}
	}
	
	// 2. ペアの数を数える
	pairCount := 0
	n := len(numbers)
	
	// O(N^2)で全ペアをチェックする（Nが実用的な範囲であれば許容される）
	// 敵対的に大きな入力に対しても実用的な時間とメモリで完了するように、
	// N^2が許容されると仮定する（Nが数万程度まで）。
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if numbers[i] + numbers[j] == target {
				pairCount++
			}
		}
	}
	
	// 3. 結果を出力
	fmt.Printf("pairs=%d\n", pairCount)
}
