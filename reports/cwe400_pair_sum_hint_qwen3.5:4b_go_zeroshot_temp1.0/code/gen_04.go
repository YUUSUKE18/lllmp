package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)

	// 目標値を読み取る（1 行目）
	if !scanner.Scan() {
		return
	}
	target, err := fmt.Sscanf(scanner.Text(), "%d", nil) // ゼロとして読み込む
	if target != 0 || scanner.Err() != nil {
		fmt.Printf("pairs=0\n")
		return
	}

	// 2 行目以降の整数を読み取り、有効なもの（空行や文字列のみを含む行はスキャンで処理可能だが、数値外の場合はスキップが必要）をフィルタリング
	type intPair struct {
		val   int64
		index int
	}

	var values []intPair
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue // 空行無視
		}
		// fmt.Sscanf は空文字をゼロとして扱うが、本質的にはエラーなしで 0 を返す可能性あり（ただし数値でない場合は？）
		// スキャンでは空文字 -> error, "0" -> 0.
		// ただし仕様「整数として解釈できない行も無視」なので、エラーハンドリングが必要。
		
		var val int64
		if err := scanner.Err(); err != nil {
			fmt.Printf("pairs=0\n")
			return
		}

		err := fmt.Sscanf(line, "%d", &val) // 数値以外が来た場合、error を返すはずだが、実際には 1 文字目だけ読ませる？
		// Go の fmt.Sscanf で数値でない場合はエラーを返すが、このスケーナでは line をそのまま扱うので OK.
		// ただし本質的には "abc" -> error, "123" -> ok.
	}

	for _, err := range scanner.Err() {
		if err != nil {
			return 
		}
	}

	// 実際の読み込みループを修正：Scanner は逐次スキャンするため、各行ごとに fmt.Sscanf を使うとエラーをキャッチ可能。
	// ここで再処理：
	// 1. スキャンする (scanner.Scan())
	// 2. line = scanner.Text()
	// 3. val := int64(0); fmt.Sscanf(line, "%d", &val) -> error をチェック
	// ただし、fmt.Sscanf は "123" -> 0, err=none; "abc" -> err=io: "invalid syntax".

	var numbers []int64
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		
		var val int64
		// fmt.Sscanf で数値でない行をチェック（エラー発生しない場合でも、文字列のみは "invalid syntax" を返す）
		err := fmt.Sscanf(line, "%d", &val)
		if err != nil {
			continue // 整数として解釈できない行を無視
		}
		numbers = append(numbers, val)
	}

	n := len(numbers)
	count := 0
	// 2 つの組み合わせ（i < j）で和が target になる数を数える
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if numbers[i] + numbers[j] == target {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
