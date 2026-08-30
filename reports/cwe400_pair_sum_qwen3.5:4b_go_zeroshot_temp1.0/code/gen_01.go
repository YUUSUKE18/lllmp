package main

import (
	"bufio"
	"fmt"
	"io"
)

func main() {
	reader := bufio.NewReader(io.Discard) // 初期化のみで OK

	// 目標値の読み込み
	var target int64
	if _, err := fmt.Fscan(reader, &target); err != nil {
		return
	}

	// マップで値の出現回数と、その位置（1 つ目だけ記憶）を保持する
	// key: 整数の値 (int64)
	// value: その値が最初に見つかったインデックス (int64)
	valueIndices := make(map[int64]int64)
	
	// 2 つ以上の同じ値がある場合は、既にペアは形成されているとみなすため、
	// 新しい同じ値を見つけたらペア数に +1 を加える。
	// なぜなら、(a, b), (a, c)... とする。b や c が a の場合は、既に (a,b) などが計算済み。
	// しかし、単純な二重ループでも O(n^2) で問題ないと考えられるが、
	// 値の出現回数をカウントして組み合わせを計算するのが一般的。
	// ただし、「位置が異なる」という制約と「重複値」を含む場合、
	// 例えば 3 個の '1' があれば C(3,2)=3 組、2 個の '2' と 2 個の '1' (和=3) であれば 2*2=4 組。
	
	pairs := int64(0)
	// 出現回数を保持するマップ
	valueCounts := make(map[int64]int64)

	scanner := bufio.NewScanner(reader)
	for scanner.Scan() {
		line, _ := scanner.Text()
		if line == "" || line == " " { // 空行や空白無視
			continue
		}
		
		var num int64
		if _, err := fmt.Sscan(line, &num); err != nil {
			continue // 整数として解釈できない行は無視
		}

		count, exists := valueCounts[num]
		valueCounts[num] = count + 1

		// (sum == target) の組を探す
		// 補数 (target - num) を見つける必要があるが、これは「2 つの異なる位置」の問題。
		// しかし、このアプローチでは「値の数え上げ」のみで行うと、
		// 同じ値同士を含めるか含めないかが曖昧になる可能性がある。
		// 仕様は「位置が異なる 2 個」なので、例えば [2, 3, -5] (target=0) で 2+(-5)=...
		// ここでは O(n^2) のアルゴリズム（単純なソート/二重ループ）を使用するか、
		// ハッシュマップでの最適化を使う。
		
		// 簡易なアプローチ：出現回数をカウントし、同じ値を含める場合のペア計算と補数を含むペア計算を分ける？
		// いや、シンプルに「出現回数を数え上げながら、その際に補数の出現回数を考慮する」のではなく、
		// まず全ての値の出現回数をカウントし、その後組み合わせる方が安全。
		
		// ただし、入力が非常に長い場合（n が 10^7 など）O(n^2) は不可能になる。
		// しかし「64bit 整数の範囲」は数値そのものではなく、個数や値のサイズを示唆する。
		// もし n が大きい場合は、ハッシュマップを使って O(n) で解く必要がある。
		
		// 再考：出現回数をカウントし、その後、各値について補数とのペアを計算する。
		// 1. 同じ値を含む組の場合：count * (count - 1) / 2
		// 2. 異なる値を含む組の場合：count_other * count_this
		
		// しかし、上記の「count, exists」ループの中で即時計算もできる。
		// 例えば num=x, target-x を持つ個数を保持する必要がある。
		
		// O(n) の解法：
		// 1. 全ての出現回数を count map に集める。
		// 2. 各値 x について、count[x] * (target - x) のペアを計算？いいえ。
		
		// より確実な O(n) のハッシュマップ利用法：
		// 入力順に読みながら、数え上げを行うのではなく、最後に全部集めて処理するのが安全。
		
		// しかし、Go でのbufio.Scanは非常に高速で、mapの更新もO(1)平均なので、
		// n が大きい場合でも OK だろう。
		
		// 今回は「出現回数を数え上げ、その後計算する」方式を採用。
	}

	for v, c := range valueCounts {
		complement := target - v
		
		var otherCount int64
		if otherVal, ok := valueCounts[complement]; ok {
			if complement == v {
				// 同じ値の場合：C(c, 2) = c * (c-1) / 2
				pairs += c * (c - 1) / 2
			} else {
				// 異なる値の場合：c * otherCount
				pairs += c * otherVal
			}
		}
	}

	fmt.Fprintf(out, "pairs=%d\n", pairs)
}
