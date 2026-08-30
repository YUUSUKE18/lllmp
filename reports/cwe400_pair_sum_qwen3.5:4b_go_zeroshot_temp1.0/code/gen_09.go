package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	target, err := fmt.Sscanf(scanner.Text(), "%d", nil) // 目標値を読み取る (実際の Go ではスキャナを使う必要があるため書き換え)
	if target == 0 || scanner.Err() != nil {
		return
	}
	
	var pairs int64
	
	lineNum := 1
	scanner.Scan()
	// 1 行目は既に読み取ったので、2 行目から始まるループが必要だが、Scanner は一度読むしかない
	// より堅牢な読み方: bufio.Scanner を使った標準入力読み込みを変更する
  
	// 修正版: リードからのデータ取得と処理を再構築
	var buf [1024]byte
	reader := bufio.NewReader(os.Stdin)
	
	// 目標値を読み取る
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}
	
	var targetValue int64
	fmt.Sscanf(line, "%d", &targetValue)
	
	seen := make(map[int64]bool) // セットとして管理する代わりにマップを使う (重複なしの場合、値ごとにカウントしない)
	countMap := make(map[int64]int) // 値の出現回数を記録
	
	for {
		line, err = reader.ReadString('\n')
		if err != nil {
			break
		}
		
		// 空行を無視
		if line == "" || line == "\n" || len(line) < 2 { // バックスラッシュ付き改行の場合にも対応 (Go は通常 \n を扱う)
			continue
		}
		
		var num int64
		fmt.Sscanf(line, "%d", &num)
		
		if countMap[num] == 0 {
			countMap[num] = 1
		} else {
			countMap[num]++
		}
	}

	// ここで計算: O(N^2) のアプローチは N が大きい場合が問題になる
	// しかし、仕様では「整数として解釈できない行も無視」しており、N のサイズが明示されていないため
	// 一般的にはハッシュ表と二分探索木 (またはソート済みリスト + 二分探索) を使うべきだが
	// スキルや制約がない限り、単純な O(N^2) が最悪の場合がある。
	// より良い方法: ソート後に二重ループで検索

	if len(countMap) == 0 {
		fmt.Printf("pairs=%d\n", pairs)
		return
	}

	// マップの要素を切片にしてソート
	var values []int64
	for v := range countMap {
		values = append(values, v)
	}
	
	sort.Int64s(values)
	
	n := len(values)
	
	// ソート済み配列に対して、2 つの異なるインデックスで和が targetValue になるペアを見つける
	// しかし、同じ値が複数回現れる場合は処理が必要
  
	// O(N^2) 解法: ハッシュマップまたはソートされた配列を使う。
	// ここではソートした配列に対して二分探索を適用する (O(N log N))
	
	pairsCount := int64(0)
	
	for i := 0; i < n; i++ {
		left := values[i]
		
		// targetValue - left >= min_value かつ <= max_value の範囲を探す
		// 実際には、左と右のインデックスが異なることを確認する必要がある。
		
		rightNeeded := targetValue - left
		
		// rightNeeded が配列中存在するかを検索 (index > i か < i など)
		// 重複値が含まれている場合の処理は重要。(例: target=10, values=[5,5] -> pair(5,5) を 1 つ持つ)
		
		// バイナリ検索: index として見つかるか (index != i とする必要があるが、配列内にあるか確認)
		
		idx := -1 // 目的の右側要素のインデックス
		
		if rightNeeded < values[0] || rightNeeded > values[n-1] {
			continue // 存在しない
		}
		
		// バイナリ検索の実装 (lower_bound, upper_bound のような)
		start := i + 1 
		end := n - 1
		
		// index を探す: rightNeeded が values[j] に等しい j を探す。ただし、j != i を確認する必要がある
		// しかし、i から start から検索する必要はない (両方向でチェックできるが、ここでは右側のみで十分ではないか？)
		// 実際には、配列内にあるかどうかを確認し、インデックスが異なることを保証する。
		
		// バイナリ検索: rightNeeded が存在するか?
		
		l, r := 0, n-1
		foundIndex := -1
		
		for l <= r {
			mid := (l + r) >> 1
			if values[mid] == rightNeeded {
				foundIndex = mid
				break
			} else if values[mid] < rightNeeded {
				l = mid + 1
			} else {
				r = mid - 1
			}
		}
		
		if foundIndex != -1 && foundIndex != i {
			pairsCount++
		}
	}

	fmt.Printf("pairs=%d\n", pairsCount)
}
