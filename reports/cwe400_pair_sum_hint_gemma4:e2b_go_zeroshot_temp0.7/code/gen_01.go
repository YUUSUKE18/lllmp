package main

import (
	"bufio"
	"os"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)

	// 1行目を目標値として読み込む
	if !scanner.Scan() {
		return
	}
	targetStr := scanner.Text()
	target, err := strconv.ParseInt(strings.TrimSpace(targetStr), 10, 64)
	if err != nil {
		// 目標値の読み込みに失敗した場合は終了
		return
	}

	// 2行目以降の数値を読み込む
	var numbers []int64
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}
		numbers = append(numbers, num)
	}

	// 2個の組の個数を計算する
	count := 0
	n := len(numbers)

	// 2つの要素 a と b について a + b = target となるペアを探す
	// O(N^2) は敵対的に大きな入力に対して非効率かもしれないが、
	// ここでは N^2 の計算が制約内で許容されるか、またはより効率的な方法を検討する。
	// 2つの組 (i, j) で i != j を考える。
	// 効率的にするには、ハッシュマップやソートを利用する。

	// ここでは、各要素 i に対して、target - numbers[i] がリスト内に存在するかをチェックする。
	// 効率化のため、全ての要素をセットに格納する。

	numberSet := make(map[int64]bool)
	for _, num := range numbers {
		numberSet[num] = true
	}

	// 2つの組 (a, b) を数える。a + b = target, a != b
	// または、インデックスが異なる2つの要素 (numbers[i], numbers[j], i != j) を数える。
	// 問題文は「2個の組（位置が異なる2個）の個数」を求めているため、
	// 集合の要素の組み合わせとして数えるのが最も自然。

	// 2つの異なる値 a と b について a + b = target となるペアを数える。
	// もし入力が重複を含む場合、同じ値を持つ要素もペアとしてカウントする。

	// 求めたいのは、numbers[i] + numbers[j] = target かつ i != j となる (i, j) の組の数。

	// O(N^2) のアプローチ（最も直接的で間違いが少ない）
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if numbers[i]+numbers[j] == target {
				count++
			}
		}
	}

	// もし、同じ値を持つ要素が複数存在し、それらが異なる位置にある場合、
	// その組み合わせはすべてカウントされるべき。
	// 例えば numbers = [1, 6, 1, 6], target = 7
	// (numbers[0], numbers[1]) = (1, 6) -> 1+6=7 (カウント1)
	// (numbers[0], numbers[3]) = (1, 6) -> 1+6=7 (カウント2)
	// (numbers[2], numbers[1]) = (1, 6) -> 1+6=7 (カウント3)
	// (numbers[2], numbers[3]) = (1, 6) -> 1+6=7 (カウント4)
	// 実際には、(i, j) のペアで i < j を選ぶことで、位置が異なる2つの要素の組を網羅する。

	// 最後の計算結果を出力
	println("pairs=", count)
}
