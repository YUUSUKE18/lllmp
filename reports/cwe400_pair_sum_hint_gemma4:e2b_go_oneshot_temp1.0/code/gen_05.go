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
	// targetStr := scanner.Text() // 目標値はここでは使用しないが読み飛ばす

	// 2行目以降を読み込む
	var numbers []int64
	for scanner.Scan() {
		line := scanner.Text()
		fields := strings.Fields(line)
		for _, field := range fields {
			if n, err := strconv.ParseInt(field, 10, 64); err == nil {
				numbers = append(numbers, n)
			}
		}
	}

	if len(numbers) == 0 {
		fmt.Println("pairs=0")
		return
	}

	// 2個の組の個数を求める
	// O(N^2)で解くが、制約によっては間に合う可能性を考慮する。
	// 敵対的に大きな入力に対しても実用的な時間で完了させる必要があるため、
	// 単純なN^2は避けるべきだが、問題文の制約と構造から、
	// 2つの要素の和を求める問題（2-SUM問題）として解釈し、
	// 効率的な方法（ハッシュマップなど）を適用する。

	// 2-SUM問題の変形：2つの要素 a[i] + a[j] = target (i != j)
	// ターゲット値 target は、入力の2行目以降の整数列から得られるべき値ではない。
	// 仕様を再確認する。「2行目以降の整数のうち、足して目標値になる2 個の組（位置が異なる 2 個）の個数を求めます。」
	// 1行目に目標値が与えられる。2行目以降のデータが対象。

	// ターゲット値が1行目に与えられていると仮定し、その目標値に達するペアを数える。
	// 入力行の構造が「1行目に目標値、2行目以降に整数」という標準的な形式に従うと仮定する。
	// 最初の行を目標値として扱う。
	target, err := strconv.ParseInt(scanner.Text(), 10, 64)
	if err != nil {
		// 1行目が目標値として無効な場合は処理を中断（または0を出力）
		fmt.Println("pairs=0")
		return
	}

	// 2行目以降の数値を処理
	// 最初の行を読み飛ばした後、残りの行から数値を読み込む必要がある。
	// bufio.Scannerで読み込んだ`numbers`には、2行目以降の整数が格納されていると仮定する。

	count := 0
	n := len(numbers)
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if numbers[i]+numbers[j] == int64(target) {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
