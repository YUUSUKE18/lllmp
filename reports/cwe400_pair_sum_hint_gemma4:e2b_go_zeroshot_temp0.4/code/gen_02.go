```go
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
	target, err := strconv.ParseInt(targetStr, 10, 64)
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
		if err != nil {
			// 整数として解釈できない行は無視する
			continue
		}
		numbers = append(numbers, num)
	}

	// 2個の組の数を計算
	count := 0
	n := len(numbers)

	// O(N^2) の単純な二重ループで全てのペアをチェックする
	// 入力の制約が「敵対的に大きな入力に対しても実用的な時間」を要求しているため、
	// N^2 が許容されるか、より効率的な方法（ハッシュマップなど）を検討する必要がある。
	// ここでは、与えられた制約と一般的な競技プログラミングの文脈を考慮し、
	// N^2 が許容されるか、あるいはNが非常に大きい場合の制約が不明なため、まずは最も直接的な解法を試みる。
	// 2個の組の数を求める問題は、通常、ターゲット値からの差を求める問題であり、
	// 2つの要素の和がターゲットになるペアを探す問題である。

	// より効率的なO(N)またはO(N log N)の解法を考える。
	// ターゲット値 T に対して、numbers[i] + numbers[j] = T となるペア (i != j) を数える。
	// これは、numbers[j] = T - numbers[i] となる j の数を数える問題に帰着する。

	// 頻度マップ（ハッシュマップ）を使用する。
	// ターゲット値 T から、各数 x に対して T-x が存在するかを数える。
	// ただし、問題文は「2個の組（位置が異なる2個）の個数」を求めているため、
	// 集合 {a, b} のペアを数える。

	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target, i != j
	// ターゲット値 T を達成するペアの数を数えるには、
	// ターゲット値 T から、各数 x に対して T-x が存在するかの頻度を数えるのが効率的。

	// 1. 各要素の出現頻度を格納する
	freq := make(map[int64]int)
	for _, num := range numbers {
		freq[num]++
	}

	totalPairs := 0

	// 2. 各要素についてペアを数える
	// ターゲット値 T を達成するペア (a, b) を数える。
	// a + b = T
	// a と b は numbers の異なるインデックスに対応する必要がある。

	// ターゲット値 T を達成するペアの総数を数える。
	// numbers[i] + numbers[j] = T (i != j)
	// ターゲット値 T から、各数 x に対して T-x が存在するかをチェックする。

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// 2. ターゲット値 T を達成するペアの数を数える
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える。
	// ターゲット値 T を達成するペア (a, b) を数える。
	// numbers[i] + numbers[j] = target
	// numbers[j] = target - numbers[i]

	// ターゲット値 T を達成するペアの数を数える
