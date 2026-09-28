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
	
	// 1行目: 目標値の読み込み
	if !scanner.Scan() {
		return
	}
	targetStr := scanner.Text()
	target, err := strconv.ParseInt(strings.TrimSpace(targetStr), 10, 64)
	if err != nil {
		return
	}

	count := 0
	// 2行目以降の整数を読み込む
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}
		
		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		
		// 現在の数がターゲット値から2つ引いた値と一致するかチェック
		// (num - x) = target  => x = num - target
		// 求めたいのは、過去に現れた x が存在するかどうか。
		// 過去の数値 (x) は、target - num ではない。
		// 求めるのは、現在の数値 num と、過去に現れた別の数値 x のペア (num + x = target)
		// つまり、x = target - num となる x が過去に存在するかどうか。
		
		// 過去に現れた数値の集合を保持する
		// 過去の数値が与えられた後で、現在の数値 num と過去の数値 x の和が target になるかを確認する。
		// num + x = target  => x = target - num
		
		// ここでは、読み込んだ数 num と、それ以前に読み込んだ数 x のペア (num + x = target) の個数を数える。
		// したがって、読み込んだ数 num に対して、 target - num が過去に存在するかどうかをチェックする。
		// 過去に読み込んだ数（history）に、target - num が含まれているか？
		
		// 簡略化のため、読み込んだ数そのものを履歴として保持し、その履歴内でペアを探す。
		// ただし、問題文は「2行目以降の整数のうち、足して目標値になる2個の組（位置が異なる2個）の個数」なので、
		// 読み込み順に「現在の数」と「過去の数」のペアで数える必要がある。
		
		// 履歴を保持するリスト
		history := make([]int64, 0)
		
		// 再度読み込み処理を、履歴を保持しながら行う
		// 実際には、入力全体を一度に読み込んでから処理するのが効率的だが、
		// ストリーム処理の制約があるため、ここでは入力全体を一度バッファリングするアプローチを修正する。
		
		// 再度、入力全体をバッファリングして処理する
		
		// 最初の処理で、入力全体を一度読み込むための準備を再構成する。
		
		// --- 処理の再構成 ---
		// 最初の1行はターゲット。以降は整数。
		
		// 入力をすべて読み込む
		allLines := []string{}
		// すでに読み込んだターゲット行は除く
		for scanner.Scan() {
			allLines = append(allLines, scanner.Text())
		}
		
		if err := scanner.Err(); err != nil {
			// エラー処理
		}

		// 最初の行がターゲット
		if len(allLines) == 0 {
			fmt.Println("pairs=0")
			return
		}
		
		targetStr = allLines[0]
		target, _ = strconv.ParseInt(strings.TrimSpace(targetStr), 10, 64)
		
		// 2行目以降を処理
		history = make([]int64, 0)
		
		for i := 1; i < len(allLines); i++ {
			line := strings.TrimSpace(allLines[i])
			if line == "" {
				continue
			}
			num, err := strconv.ParseInt(line, 10, 64)
			if err != nil {
				continue
			}
			
			// 読み込んだ数 num と、過去の履歴 history 内の数 x について、num + x = target をチェックする。
			// 履歴には、i番目の行より前の全ての数が入っている。
			for _, x := range history {
				if num + x == target {
					count++
				}
			}
			
			// 現在の数 num を履歴に追加
			history = append(history, num)
		}

	fmt.Printf("pairs=%d\n", count)
}
