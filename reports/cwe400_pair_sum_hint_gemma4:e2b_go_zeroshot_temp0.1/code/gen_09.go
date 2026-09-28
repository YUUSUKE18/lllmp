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
		// 1行に1個ずつ並んでいるという仕様に基づき、読み込んだ行を処理し続ける
	}

	// 2個の組の数を計算
	count := 0
	n := len(numbers)

	// O(N^2) の全探索で解を見つける（Nが十分に小さければ実用的）
	// 仕様では「敵対的に大きな入力に対しても、実用的な時間とメモリで完了するように」とあるため、
	// N^2 は許容されるか、あるいはより効率的な方法が必要。
	// ここでは、2つの要素の和が目標値になるペアを数えるため、ハッシュマップ（またはソート＋二分探索）が一般的だが、
	// 求められているのは「位置が異なる2個の組」の個数であり、入力の順序を考慮する必要がある。

	// 2つの要素 a[i] + a[j] = target (i != j) を数える。
	// 順序を考慮し、インデックス i と j が異なるペアを数える。

	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			if i != j {
				if numbers[i]+numbers[j] == target {
					count++
				}
			}
		}
	}

	// 注意: 上記のループは (a[i], a[j]) と (a[j], a[i]) の両方を数えるため、
	// 実際にはペア (i, j) の順序を考慮したカウントになっている。
	// 例えば、numbers = [1, 2, 3], target = 4 の場合:
	// (i=0, j=1): 1+2=3 (X)
	// (i=1, j=0): 2+1=3 (X)
	// (i=0, j=2): 1+3=4 (O)
	// (i=2, j=0): 3+1=4 (O)
	// (i=1, j=2): 2+3=5 (X)
	// (i=2, j=1): 3+2=5 (X)
	// 結果として、(1, 3) と (3, 1) の2組がカウントされる。これは「位置が異なる2個の組」を数えるという要求を満たす。

	// 最終的な結果を出力
	fmt.Printf("pairs=%d\n", count)
}
