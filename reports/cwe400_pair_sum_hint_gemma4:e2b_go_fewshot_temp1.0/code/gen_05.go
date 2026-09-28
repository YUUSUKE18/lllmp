package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	// 1行目: 目標値の読み込み
	targetLine, err := reader.ReadString('\n')
	if err != nil {
		// 入力が空の場合は終了
		return
	}
	targetStr := strings.TrimSpace(targetLine)
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		// 目標値の解析エラー（問題の制約上、これは通常発生しないはずだが念のため）
		return
	}

	// 2行目以降の入力を読み込む
	count := 0
	currentSum := int64(0)
	
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break // EOFまたはエラー
		}

		// 空行または不正な行は無視
		trimmedLine := strings.TrimSpace(line)
		if trimmedLine == "" {
			continue
		}

		// 整数として解析を試みる
		num, err := strconv.ParseInt(trimmedLine, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}

		// 合計値に加算
		currentSum += num

		// 合計値が目標値を超えたら、現在の要素を現在の合計から引いて、ペアの数を更新する
		// このロジックは、現在の要素 'num' と過去の要素のペアを数えることを意味する。
		// 求めるのは、累積和 $S_i = \sum_{j=1}^{i} a_j$ で $S_i - a_i = S_k$ ($k < i$) となる組の数、つまり $a_i + a_k = \text{target}$ の組の数である。

		// ここでは、累積和アプローチで解く。
		// $S_i$ を $i$番目の要素までの合計とすると、
		// $S_i$ から $a_i$ を引いた値 $S_{i-1}$ が、目標値からの差を表す。
		// 求めるのは $a_i + a_k = \text{target}$ の組の数。

		// 累積和アプローチを再考する:
		// 2つの要素 $a_i$ と $a_j$ ($i \neq j$) が $\text{target}$ になるのは、
		// $a_i + a_j = \text{target}$ の場合。

		// ここでは、より単純に、現在の要素 $a_i$ と、それより前の要素 $a_k$ ($k<i$) のペアを数えることを考える。
		// これは、累積和 $S_i = a_1 + a_2 + \dots + a_i$ を使って解くのが効率的である。
		// $a_i + a_k = \text{target}$ となるのは $a_k = \text{target} - a_i$ のとき。
		// $a_k$ は $a_i$ より前に出現した値である必要がある。
		
		// 各要素 $a_i$ を読み込むたびに、これまでに読み込んだ値の中に $\text{target} - a_i$ がいくつ存在したかを数える必要がある。
		// これは、ハッシュマップまたはソートされた配列を使って効率的に行うことができる。
		
		// 入力全体を保持し、最後にペアを数える方が、逐次処理で複雑になるため、入力全体を保持する方式に切り替える。
		// ただし、今回は「2個の組」の数を求めるので、入力全体を保持する必要がある。
	}
	
	// --- 再実装: 全ての入力を読み込んでからペアを数える ---

	// 再度読み込み開始
	reader = bufio.NewReader(os.Stdin)
	
	// 1行目: 目標値の読み込み (再度読み込むため、stdinをリセットする必要があるが、本番では一度だけ実行される前提なので、今回は入力全体をメモリに保持する設計に戻す)
	// 課題の仕様に従い、標準入力全体を処理する。
	
	// 実際には、標準入力が一度だけ提供されるため、最初の読み込みから始める。

	// 再度、初期化
	lines := []string{}
	scanner := bufio.NewScanner(os.Stdin)
	
	// 1行目 (目標値)
	if scanner.Scan() {
		targetStr = scanner.Text()
		target, err = strconv.ParseInt(strings.TrimSpace(targetStr), 10, 64)
		if err != nil {
			return
		}
	} else {
		return // 入力がない
	}
	
	// 2行目以降の整数を読み込む
	data := []int64{}
	for scanner.Scan() {
		line := scanner.Text()
		trimmedLine := strings.TrimSpace(line)
		if trimmedLine == "" {
			continue
		}
		num, err := strconv.ParseInt(trimmedLine, 10, 64)
		if err != nil {
			continue // 不正な行は無視
		}
		data = append(data, num)
	}
	
	// 2個の組の数を計算する (二重ループ)
	pairCount := 0
	n := len(data)
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if data[i]+data[j] == target {
				pairCount++
			}
		}
	}

	// 結果を出力
	fmt.Printf("pairs=%d\n", pairCount)
}
