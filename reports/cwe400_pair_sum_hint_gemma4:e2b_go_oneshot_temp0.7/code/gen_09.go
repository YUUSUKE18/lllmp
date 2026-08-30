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
	
	// 1行目を目標値として読み込む
	if !scanner.Scan() {
		return
	}
	targetStr := strings.TrimSpace(scanner.Text())
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		// 目標値の読み込みに失敗した場合は終了
		return
	}

	// 2行目以降の整数を読み込む
	var numbers []int64
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}
		num, err := strconv.ParseInt(line, 10, 64)
		if err == nil {
			numbers = append(numbers, num)
		}
	}

	// 2個の組の個数を求める
	count := int64(0)
	n := len(numbers)

	// 2つの要素 a と b が存在し、a + b = target となるペアを探す
	// 2つの組 (i, j) が異なる位置にある必要がある (i != j)

	// 2つの要素を格納するためのマップ（出現回数を保持）
	// ターゲット値からの差分をキーとして、その差分が何回出現したかを数える
	// ここでは、2つの要素 a と b が target - a = b となるように探す。
	// ターゲット値から引いた値 (target - x) が、リスト内の他の要素として存在するかを効率的に調べるため、
	// 要素の出現回数をマップに格納する。

	freq := make(map[int64]int64)
	for _, num := range numbers {
		freq[num]++
	}

	// 2つの異なる要素 a, b について a + b = target となるペアを探す
	// 探索は、リストを走査しながら、現在の要素 x に対して target - x が存在するかを確認することで行う。
	// ただし、リスト内の要素が重複している場合、その重複を考慮する必要がある。

	// より直接的なアプローチ: 2つの要素 i と j が存在し i + j = target となるペアを探す。
	// i と j は numbers の異なるインデックスに対応する必要がある。

	// 2つの異なる要素 a と b を探す。
	// i < j を仮定して、numbers[i] + numbers[j] == target を満たすペアを探す。
	// これは O(N^2) になりすぎる可能性があるため、マップを使った O(N) または O(N log N) の方法を考える。

	// 2つの異なる要素 a と b が target - a = b となるペアを探す。
	// ターゲット値から引いた値 (target - x) が、リスト内の他の要素として存在するかを数える。

	// ターゲット値から引いた値の出現回数を格納するマップ
	diffFreq := make(map[int64]int64)
	for _, x := range numbers {
		diff := target - x
		diffFreq[diff]++
	}

	totalPairs := int64(0)

	for _, x := range numbers {
		// x + y = target となる y を探す。 y = target - x
		y := target - x
		
		// y がリスト内に存在するか確認
		if countY, exists := diffFreq[y]; exists {
			// x と y が同じ値の場合 (x == y, つまり 2x = target)
			if x == y {
				// x + x = target のペアを探している。
				// x がリスト内に k 回出現する場合、これらは k * (k - 1) / 2 個の組を形成する。
				// ただし、問題文は「位置が異なる 2 個の組」を求めているため、
				// これは「異なるインデックス i, j について numbers[i] + numbers[j] = target」を数える問題と解釈する。
				// 2つの異なるインデックス i, j について numbers[i] + numbers[j] = target は、
				// 2 * (xの出現回数 - 1) / 2 = xの出現回数 - 1 ではない。
				// 2つの異なるインデックス i, j について numbers[i] + numbers[j] = target の数は、
				// 2つの要素 x が存在するとき、その x の出現回数 * (xの出現回数 - 1) / 2 ではない。
				// 2つの異なるインデックス i, j について numbers[i] + numbers[j] = target は、
				// x の出現回数 * (x の出現回数 - 1) / 2 ではない。
				
				// x がリスト内に k 個存在する場合、それらのペアの数は k * (k - 1) / 2。
				// ただし、x + x = target のペアを数える場合、x が2つ以上存在するとき、
				// 2つの異なるインデックス i, j について numbers[i] + numbers[j] = target を満たすのは、
				// x の出現回数 * (x の出現回数 - 1) / 2 のペアの数。
				
				// 2つの異なるインデックス i, j について numbers[i] + numbers[j] = target
				// x == y の場合、numbers[i] = numbers[j] = x。
				// この x の出現回数を k とする。
				// 異なる位置のペアの数は k * (k - 1) / 2。
				
				k := freq[x]
				if k >= 2 {
					totalPairs += k * (k - 1) / 2
				}
			} else {
				// x != y の場合
				// x と y が異なる値であり、x + y = target。
				// x の出現回数 freq[x] と y の出現回数 freq[y] の積が、
				// (x, y) と (y, x) の順序を考慮したペアの数になる。
				// ここでは、x を走査するとき、y = target - x を見る。
				// x が y とペアを作る場合の数は freq[x] * freq[y]。
				// すでに x のループで処理されるのを避けるため、x < y の順に数えることにする。
				
				// x が y よりも小さい場合のみカウントする (x < y)
				if x < y {
					totalPairs += freq[x] * freq[y]
				}
			}
		}
	}

	// 補足：上記の方法は、x != y の場合 x < y の制約を課しているため、
	// 単純に全てのペア (i, j) を数える方が安全。
	// 全ての要素のペア (i, j) (i != j) を数えるには、以下の方法が最も確実。

	// 再計算：全ペアの総和 (O(N^2)を避けるため、マップを使う)
	// ターゲット値から引いた値の出現回数を使う方法が、重複を考慮したペアの数を数えるのに最適。

	finalCount := int64(0)
	
	// ターゲット値の半分を探す (x + y = target)
	// x と y はリスト内の異なる要素である必要がある。
	
	// ターゲット値 x に対して、y = target - x を探す。
	// x がリスト内の要素であるとき、y がリスト内の要素であるペアを数える。
	
	// ターゲット値から引いた値の出現回数を再利用し、対称性を考慮する。
	// ターゲット値の半分 x = target / 2 の場合 (x + x = target) の処理は上記でOK。
	// x != y の場合、x と y がリストに存在すれば (x, y) のペアがカウントされる。
	
	// ターゲット値の全要素 x について、x + (target - x) = target を考える。
	// x の出現回数 freq[x] と target - x の出現回数 freq[target - x] を掛け合わせる。
	
	// ターゲット値の半分をチェックするループ
	for x, countX := range freq {
		y := target - x
		
		if y == x {
			// x + x = target のケース (x = target / 2)
			if x*2 == target {
				// x の値がターゲットのちょうど半分の場合
				if countX >= 2 {
					// x の出現回数 k に対し、k * (k - 1) / 2
					finalCount += countX * (countX - 1) / 2
				}
			}
		} else if y > x {
			// x + y = target のケース (x != y)
			// x と y がリストに存在する場合、x の出現回数と y の出現回数の積がペアの数になる。
			if countY, exists := freq[y]; exists {
				finalCount += countX * countY
			}
		}
	}

	fmt.Printf("pairs=%d\n", finalCount)
}
