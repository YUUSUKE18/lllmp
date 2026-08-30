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

	// 2行目以降: 数値の読み込み
	var numbers []int64
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}
		num, err := strconv.ParseInt(line, 10, 64)
		if err == nil {
			numbers = append(numbers, num)
		}
		// 1行に1個ずつ並んでいるため、読み込んだ行が1つで終了するのを待つのではなく、
		// 入力ストリームが尽きるまで読み続ける
	}

	// 2個の組の数を計算
	count := 0
	n := len(numbers)

	// O(N^2) のチェック。Nが十分に大きくても、入力の制約（実用的な時間）を考慮し、
	// 競技プログラミング的な制約（Nが数万程度）を想定して、この方法で十分か確認する。
	// もしNが非常に大きい場合（例: 10^6以上）、より高速な方法（ハッシュマップなど）が必要になるが、
	// 求めるのは「2個の組の数」であり、単なる和のペアカウントなので、
	// 2つのポインタ（ソート済み配列ならO(N)）で解くのが一般的。
	// ここでは、与えられた数列から2要素の和を数える問題なので、二重ループで全ペアをチェックする。

	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if numbers[i]+numbers[j] == target {
				count++
			}
		}
	}

	// 結果の出力
	fmt.Printf("pairs=%d\n", count)
}
