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

	// 1行目を読み込み、目標値を設定
	if !scanner.Scan() {
		return
	}
	targetStr := strings.TrimSpace(scanner.Text())
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		// 目標値の読み取りに失敗した場合は終了
		return
	}

	count := 0
	// 2行目以降を読み込み、整数を処理
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}

		// 行に含まれるすべての整数を抽出
		fields := strings.Fields(line)
		for _, field := range fields {
			num, err := strconv.ParseInt(field, 10, 64)
			if err != nil {
				continue // 整数として解釈できないものは無視
			}

			// 読み込んだ整数が目標値とペアになるかどうかをチェックする
			// 読み込んだ整数が target と異なる場合、target - num が別の整数として存在するか確認する
			if num != target {
				required := target - num
				// 読み込んだ整数リスト全体を再走査して、required が存在するか確認する
				// このアプローチは効率的ではないため、より効率的な方法を採用する。
				// 実際には、すべての数を一度リストに格納してからペアを探す方が効率的だが、
				// 標準入力の構造上、行ごとに処理する必要があるため、ここでは入力全体を保持する。

				// 課題の解釈を再確認:
				// 「2行目以降の整数のうち、足して目標値になる2個の組（位置が異なる2個）の個数を求めます。」
				// これは、入力された全ての整数集合 $S$ について、$\exists a, b \in S$ s.t. $a + b = \text{target}$ かつ $a \neq b$ の組の数を求める、と解釈するのが最も自然。
				// ただし、「2行目以降の整数のうち」という表現から、入力された各行が個別の数として扱われるのか、それとも全ての数からペアを探すのかが曖昧。
				// 例1の形式に倣うと、入力全体が1つのデータセットと見なされる。

				// ここでは、入力された全ての整数を収集し、その中からペアを探す方式を採用する。
			}
		}
	}

	// 再度、入力全体を読み込み直して、すべての整数を収集する方式に変更する。
	// 標準入力全体を一度に読み込む必要があるため、ストリーム処理ではなくバッファリングが必要となる。
	// Goの標準的な競技プログラミングの入力処理では、通常、全ての入力を一度に読み込む。

	// ----------------------------------------------------------------------
	// 修正されたロジック: 全ての整数を収集し、ペアを数える
	// ----------------------------------------------------------------------

	// 再度、標準入力全体を読み込む
	inputData, err := os.ReadFile(0) // 標準入力全体を読み込む
	if err != nil {
		return
	}
	input := string(inputData)
	lines := strings.Split(strings.TrimSpace(input), "\n")

	if len(lines) < 2 {
		fmt.Println("pairs=0")
		return
	}

	// 1行目（目標値）は既に読み取ったので、2行目以降を整数として収集
	numbers := make([]int64, 0)
	// lines[0] は目標値。lines[1] から整数を収集
	for i := 1; i < len(lines); i++ {
		line := strings.TrimSpace(lines[i])
		if line == "" {
			continue
		}
		fields := strings.Fields(line)
		for _, field := range fields {
			num, err := strconv.ParseInt(field, 10, 64)
			if err == nil {
				numbers = append(numbers, num)
			}
		}
	}

	// 収集した整数リストからペアの数を数える
	pairCount := 0
	n := len(numbers)

	// 2つのポインタを使って、リスト内の要素を走査し、ペアを探す
	// O(N^2)ではなく、ハッシュマップやソートを使うのが効率的だが、
	// ここでは「位置が異なる2個の組」を数えるため、リスト内のインデックスを比較する。

	// 効率的な方法: 各要素に対して、ターゲット値からの差分をセットで管理する。
	// ターゲット値 T に対して、T-x が存在するかをチェックする。
	
	// 集合として全ての数を格納
	numSet := make(map[int64]bool)
	for _, num := range numbers {
		numSet[num] = true
	}

	// ペアの数を数える
	for _, a := range numbers {
		b := target - a
		// a + b = target かつ a != b (位置が異なる2個の組)
		// a がリスト内の要素であり、b もリスト内の要素である必要がある。
		if numSet[b] {
			// a + b = target が成立。aとbが異なるかチェックする。
			if a != b {
				// aとbが異なる場合、(a, b)の組を数える。
				// 順序を考慮しないように、a < b の場合のみカウントする。
				if a < b {
					pairCount++
				}
			}
		}
	}

	// 注意: 上記のロジックでは、リスト内の同じ値が複数ある場合、重複カウントが発生する可能性がある。
	// 「位置が異なる2個の組」を数えるには、元のリストのインデックスを保持する必要がある。

	// ----------------------------------------------------------------------
	// 最終的な、インデックスを考慮した解法 (O(N^2)だが、制約が不明なため一旦採用)
	// ----------------------------------------------------------------------
	
	finalCount := 0
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if numbers[i]+numbers[j] == target {
				finalCount++
			}
		}
	}

	fmt.Printf("pairs=%d\n", finalCount)
}
