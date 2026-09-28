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
		// 目標値の読み込みに失敗した場合は終了
		return
	}

	count := 0
	sumList := []int64{}

	// 2行目以降の読み込み
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}
		sumList = append(sumList, num)
	}

	// 2個の組の数を求める
	n := len(sumList)
	if n < 2 {
		fmt.Println("pairs=0")
		return
	}

	// 2つの数 a と b について、a + b = target となる組の数を数える。
	// sumList の要素が、2つの異なる位置にある2つの数 a と b に対応する。
	// したがって、sumList 内のインデックス i と j (i != j) について sumList[i] + sumList[j] == target を満たすペアを数える。
	
	// 効率的に数えるため、ハッシュマップ（またはソートと二分探索）を使うのが一般的だが、
	// ここでは「位置が異なる2個の組」を数えるため、インデックスベースで直接数える。

	// 2つの異なるインデックス i と j (i < j) について、sumList[i] + sumList[j] == target を探す。
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if sumList[i]+sumList[j] == target {
				count++
			}
		}
	}

	// 結果の出力
	fmt.Printf("pairs=%d\n", count)
}
