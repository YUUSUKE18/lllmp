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
		return
	}
	// 目標値はここでは直接使わず、次の行から読み始める

	// 2行目以降の入力を読み込む
	var numbers []int64
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}
		if num, err := strconv.ParseInt(line, 10, 64); err == nil {
			numbers = append(numbers, num)
		}
	}

	if len(numbers) < 2 {
		fmt.Println("pairs=0")
		return
	}

	// 目標値を計算のために別途保持する。
	// 問題文の仕様「標準入力の 1 行目に目標値が与えられます」を考慮し、
	// 最初の読み取り値を目標値とする。
	target := int64(0)
	// 最初の行を再度読み込むか、最初の読み取り値を目標値として扱う。
	// ここでは、最初の読み取り行を目標値と見なす。
	// 実際に入力が1行目(目標値)と2行目以降(整数)であると仮定する。
	// 今回のコード構成上、最初のスキャンが目標値であり、その後のスキャンが整数リストとなる。
	// 最初のスキャンが目標値(target)であり、残りのスキャンがnumbersになる。
	
	// 実行環境での入力順序を再確認:
	// 1行目: 目標値 T
	// 2行目以降: 数値 a1, a2, a3, ...

	// 最初のスキャンで得られた値が目標値
	if scanner.Text() != "" {
		if t, err := strconv.ParseInt(strings.TrimSpace(scanner.Text()), 10, 64); err == nil {
			target = t
		}
	}
	
	// 再度、データ処理を明確にするため、入力全体を一度に処理し直す方が安全。
	// 今回は標準入力全体が与えられると仮定して、目標値とリストを分離する。
	
	// 再実装: 入力を全て読み込む
	inputLines := []string{}
	for scanner.Scan() {
		inputLines = append(inputLines, scanner.Text())
	}

	if len(inputLines) == 0 {
		fmt.Println("pairs=0")
		return
	}
	
	// 1行目が目標値
	targetStr := strings.TrimSpace(inputLines[0])
	if targetStr == "" {
		fmt.Println("pairs=0")
		return
	}
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		fmt.Println("pairs=0")
		return
	}

	// 2行目以降を数値リストとする
	var actualNumbers []int64
	for i := 1; i < len(inputLines); i++ {
		line := strings.TrimSpace(inputLines[i])
		if line == "" {
			continue
		}
		if num, err := strconv.ParseInt(line, 10, 64); err == nil {
			actualNumbers = append(actualNumbers, num)
		}
	}
	
	n := len(actualNumbers)
	if n < 2 {
		fmt.Println("pairs=0")
		return
	}

	count := 0
	// 2つの組 (i, j) で a[i] + a[j] = target を探す (i != j)
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if actualNumbers[i]+actualNumbers[j] == target {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
