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
		// 入力が空の場合
		return
	}
	targetStr := scanner.Text()
	target, err := strconv.ParseInt(strings.TrimSpace(targetStr), 10, 64)
	if err != nil {
		// 目標値が不正な場合
		return
	}

	// 2行目以降の整数の読み込みと処理
	count := 0
	
	// 2行目以降を読み込む
	for scanner.Scan() {
		line := scanner.Text()
		if strings.TrimSpace(line) == "" {
			continue // 空行は無視
		}
		
		num, err := strconv.ParseInt(strings.TrimSpace(line), 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}
		
		// 累積和の考え方を応用する。
		// 読み込んだ数の中から、目標値 - その数を引いた数（つまりペアになる数）が過去に出現した回数を数える。
		// ここでは、各要素を順番に処理し、過去の要素とのペアを数える必要があるため、
		// 累積和の考え方ではなく、ハッシュマップ（または配列）を使って出現回数を管理する。
		// 問題の「2個の組」の個数を求めるため、一度に全ての数を読み込んでからペアを数えるのが最も確実。
		// ただし、入力の制約を考慮すると、ここでは入力された数すべてを保持し、後でペアを数える実装を採用する。
		// しかし、標準入力の読み込みがストリーミングであるため、一度にすべての入力を読み込む必要がある。
		// 課題の仕様「2行目以降の整数のうち、足して目標値になる 2 個の組（位置が異なる 2 個）の個数を求めます」は、
		// 読み込んだ入力全体に対して適用される。

		// 読み込んだ整数を保存する（ここでは一時的にリストとして保持）
		// 実際には、次のループで次の整数を読み続けるため、ここでは一度に全て読み込む必要がある。
		// 読み込みの構造を修正し、入力全体を保持するように変更する。
		
		// 再度実装方針: 入力全体を保持する
	}

	// --- 再実装 ---
	
	// 入力全体を読み込むため、標準入力ストリーム全体を処理する必要がある。
	// 既に読み込んだ行がないため、入力全体をメモリに保持する必要がある。
	
	// ここでは、入力全体を読み込むために、一度リセットして再処理するのではなく、
	// すべての入力行を保持するように、入力全体を処理するロジックを再構築する。
	
	// 最初の入力 (target) は既に読み込まれている。
	
	// 2行目以降の数を格納するバッファ
	var numbers []int64
	
	// 2行目以降の入力を読み込む (targetが既に読み込まれているので、次に続く行をnumbersに格納する)
	for scanner.Scan() {
		line := scanner.Text()
		if strings.TrimSpace(line) == "" {
			continue
		}
		num, err := strconv.ParseInt(strings.TrimSpace(line), 10, 64)
		if err != nil {
			continue
		}
		numbers = append(numbers, num)
	}

	// numbers には2行目以降の整数が入っている。
	// 1行目 (target) と numbers の要素を合わせた全体で考える必要があるか？
	// 「2行目以降の整数のうち、足して目標値になる 2 個の組」という指示に基づき、numbers内のみを対象とする。
	
	// ペアの数を数えるためのカウンタ（マップを使用）
	counts := make(map[int64]int64)
	pairCount := int64(0)
	
	// numbers内の各要素に対して、そのペアとなる要素が既にカウントされているかを確認する。
	// これにより、重複カウント（(a, b)と(b, a)）を避けるため、小さい方を基準にする。
	for _, num := range numbers {
		complement := target - num
		
		// 補数が同じ値である場合 (x + x = target)
		if num == complement {
			// この数自身とペアになるのは、その数から2つ引いた場合のみ。
			// 例えば target=10 で num=5 の場合、5+5=10。
			// 5が複数回出現する場合、その出現回数から2つ選ぶ組み合わせを計算する。
			// 選択可能なペアの数は nC2 = n * (n - 1) / 2
			
			// このロジックは、読み込んだリスト全体からペアを見つけるため、
			// 各要素を処理するのではなく、リスト全体に対して2重ループでチェックするのが最もシンプルで安全。
			// ただし、制約によりO(N^2)は許容されるはずだが、敵対的に大きな入力には間に合わない可能性があるため、O(N)またはO(N log N)が必要。
			
			// O(N)で解くために、ハッシュマップで出現回数を数える方針に戻る。
			// 求めるのは「位置が異なる2個の組」なので、リスト内のインデックスではなく値に基づいて数える。
		}
	}
	
	// O(N)解法: 累積和の考え方を応用（ペアの出現回数を数える）
	
	// 2行目以降の数のみを対象とする。
	// counts に、各値が出現した回数を記録する。
	counts = make(map[int64]int64)
	
	// 2行目以降の数についてカウント
	for _, num := range numbers {
		counts[num]++
	}
	
	totalPairs := int64(0)
	
	// 各値についてペアを計算
	for num, freq := range counts {
		complement := target - num
		
		if complement == num {
			// x + x = target の場合 (2*x = target)
			// freq 個の要素から2つ選ぶ組み合わせ (n C 2)
			if freq >= 2 {
				totalPairs += freq * (freq - 1) / 2
			}
		} else if complement > num {
			// x + y = target の場合 (x < y)
			// complement が存在するなら、(num, complement) のペアを数える。
			if countComplement, ok := counts[complement]; ok {
				// num と complement のペアの総数は freq * countComplement
				totalPairs += freq * countComplement
			}
		}
	}
	
	// 注意: このO(N)解法は、入力されたリスト numbers 内でのペアを数えている。
	// 課題の指示は「2行目以降の整数のうち」とあるため、この結果が求める個数であると解釈する。
	
	fmt.Printf("pairs=%d\n", totalPairs)
}
