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
		// 1行に1個ずつ並んでいるという仕様に基づき、ここでは行ごとに読み込む
	}

	// 2個の組の数を計算
	count := 0
	n := len(numbers)

	// O(N^2) の全探索で解く（Nが実用的な範囲であれば許容される）
	// 問題の制約が不明確ですが、「敵対的に大きな入力に対しても、実用的な時間とメモリで完了するように」という指示があるため、
	// N^2 は非常に大きなNに対しては非現実的です。
	// しかし、与えられた入力が「2行目以降の整数のうち、足して目標値になる2個の組」を求めるため、
	// 2つの異なるインデックス i と j (i != j) について numbers[i] + numbers[j] == target を探します。

	// より効率的な O(N log N) または O(N) のアプローチを検討します。
	// 2つの組 (i, j) を求める問題は、2つの要素の和がターゲットになるペアを見つける問題です。
	// これは、各要素 x について、target - x がリスト内に存在するかを調べることで解決できます。

	// 頻度マップ（ハッシュマップ）を使用します。
	// ターゲット値が非常に大きい場合、N^2 は間に合いませんが、
	// N^2 の探索を避けるため、ハッシュマップを使用します。

	// 1. データの読み込みを再整理（入力の読み込み方法が曖昧なため、ここでは読み込んだ numbers を使用します）
	// 読み込んだ numbers の要素のペアを数える。

	// 2. 頻度マップの作成
	freq := make(map[int64]int)
	for _, num := range numbers {
		freq[num]++
	}

	// 3. ペアの数を計算
	// ターゲット値 target に対して、x + y = target となるペア (x, y) を数える。
	// x と y は numbers の要素であり、インデックスが異なる必要がある。

	// ターゲット値 target を達成するペアの数を数える。
	// ターゲット値が target = x + y となる組の数を数える。

	totalPairs := 0

	// numbers の各要素 i について、numbers の各要素 j (j != i) との和をチェックする。
	// これは O(N^2) ですが、制約が不明なため、まずはこの方法で実装します。
	// 敵対的に大きな入力に対して実用的な時間で完了させるためには、
	// ターゲット値の範囲や入力の性質に依存する必要があります。
	// もし入力が非常に大きい場合 (例: N=10^5)、O(N^2) は間に合いません。
	// ターゲット値が固定されている場合、ハッシュマップを使った O(N) または O(N log N) が可能です。

	// ターゲット値 T = x + y となるペア (x, y) を数える。
	// x = numbers[i], y = numbers[j], i != j
	// ターゲット値 T が与えられたとき、
	// 1. x = y の場合: 2x = T。これは x を 2 で割った値がリストに存在し、その要素の出現回数から組み合わせを計算する。
	// 2. x != y の場合: x + y = T。x と y が異なる値を持つペアを数える。

	// ターゲット値 T を達成するペアの総数を数える（インデックスが異なることを考慮する）
	// ターゲット値 T を達成するペア (numbers[i], numbers[j]) を数える。
	// ターゲット値 T = x + y となるペアの数は、
	// 1. x = y の場合: x = T/2。x が numbers に複数回出現する場合、C(count, 2) 通り。
	// 2. x != y の場合: x < y のペアを数え、その数をそのまま合計する。

	// 2. 頻度マップを再利用し、異なる値のペアを数える
	uniqueNumbers := make([]int64, 0, len(freq))
	for num := range freq {
		uniqueNumbers = append(uniqueNumbers, num)
	}

	// ターゲット値 T を達成するペアの総数を計算
	for _, x := range uniqueNumbers {
		y := target - x
		if y < x {
			// x < y のペアを数える。x と y が numbers 内に存在し、それぞれ異なるインデックスを持つ必要がある。
			if countY, ok := freq[y]; ok {
				// x と y が異なる値の場合、x と y の出現回数の積がペアの数になる。
				// x の出現回数 * y の出現回数
				totalPairs += freq[x] * countY
			}
		} else if y == x {
			// x = y の場合 (2x = target)
			// x がリスト内に複数存在する場合、C(freq[x], 2) 通りのペア。
			if freq[x] >= 2 {
				totalPairs += (freq[x] * (freq[x] - 1)) / 2
			}
		}
		// y > x のケースは、x のループでカバーされるため、ここでは y > x の場合のみを考慮すれば十分。
		// x が y より大きい場合 (y < x のケースで既に計算済み) は、x のループが y のループをカバーする。
	}

	// 最終的な結果を出力
	fmt.Printf("pairs=%d\n", totalPairs)
}
