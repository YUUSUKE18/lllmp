package main

import (
	"bufio"
	"fmt"
	"math/big"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin) // 注意：os は stdlib に含まれる
	var target big.Int
	if scanner.Scan() {
		target.SetString(scanner.Text())
	} else {
		fmt.Println("pairs=0")
		return
	}

	// マップに整数を格納。値が同じものがあれば重複対応する必要があるか？
// 問題文「足して目標値になる 2 個の組」なので、(A, B) と (B, A) は同じ組と解釈するか、あるいは位置を区別するか。
// "位置が異なる 2 個の組"という表現は (index1, index2) で決まるペアと考えるのが自然だが、通常「組」というのは集合 {A, B} を指すことが多い。
// しかし、Go の標準問題（Two Sum II など）や一般的なコンペティションでは、同じ値を 2 つ持った場合のペア数は 1 とする必要があるかそれ以外の組み合わせがあるか？
// 例：目標=4, データ=[2,2] -> パア数=1 (2+2)
// 例：目標=5, データ=[2,3] -> パイ数=1
// 例：目標=5, データ=[2,2,1] -> 2+2=4(no), 2+1=3(no), 2+1=3(no) -> 0? いや、2(位置0)+2(位置1)は4なので違う。
// 正しい例：目標=4, データ=[2,1,1] -> 1+1=2,no; 2+1=3,no. -> 0
// 目標=5, データ=[2,3,2] -> 2(0)+3(1)=5(ok), 2(0)+2(2)=4(no), 3(1)+2(2)=5(ok). なので2組ある。
// しかし、もしデータが [2,3,2] で 目標=4 の場合：
// 2+3=5, 2+2=4 (ok), 3+2=5. -> 1組。(2と2)
// この問題文の「位置が異なる2個の組」は、単純に異なるインデックス i,j における a[i]+a[j]=target のペア数を数えるか、それとも値を区別しない集合を区別するか？
// 「2個の組（位置が異なる2個）」という表現は、(i,j) と (j,i) が同一の組であるとするか、それとも異なる組とみるかで答えが変わる。
// 通常「ペアの個数」を問う場合、{A,B} と {B,A} を同じペアとみなすことが多いが、「順序付き組」という表現は (i,j) で区別する場合が多い。
// しかし、標準的な Two Sum 問題は「2つの異なる要素の和」で、同じ値を持つ要素は複数存在する場合はそれぞれの組み合わせがカウントされるか？
// 例えば data = [1, 4, 1, 5], target = 6
// 1(0)+5(3)=6, 1(2)+5(3)=6. -> 2組。
// または 4+? no.
// もし同じ値を持つ要素を使う場合は？ data=[3,3,3], target=6 -> 3+3=6. (0,1), (0,2), (1,2) -> 3組。
// 問題文の「足して目標値になる 2 個の組（位置が異なる 2 個）」は、(i,j) で i!=j の組み合わせを数えるという解釈が最も合理的だ。

	// マップ：値->出現回数
	// しかし、「(3,3)」の場合、同じ値でも異なる位置だから「出現回数」として計算する必要があるのか？
// 単純に「2 つの異なるインデックス i,j」を持つような組み合わせの数え上げなら：
// data[i] + data[j] == target, where i != j.
// これは組合せ C(n,k) の一般化。
// 効率的なアルゴリズム: マップで値->出現回数を保持。
// 計算: 各値 v と (target - v) を持つ要素の総数 n_v, n_w.
// パイ数 = n_v * n_w. ただし v == target - v の場合は n_v choose 2.

	maps := make(map[int]int64) // int64 で計算するが、値は 64bit integer. big.Int を使うべきか？
	// 「値と個数はいずれも 64bit 整数の範囲に収まる」ので、int64 または uint64 で十分。
	// 念のため int64 を用いる。

	nums := make([]int64, 0) // スキャン時に蓄積する必要あり？いや、1 つ読み込みずつ処理できるか？
	// スキャンでは「空行は無視し、整数として解釈できない行も無視します」なので、一度に全て読むとよいが、巨大なファイルかもしれない。
	// しかし Go の標準入力（Scanner）はバッファを管理する。
	// 念のため、先読みして全データを保持するか？メモリ制限なしなら OK.

	var values []int64
	// スキャン処理で整数のみをフィルタリングしつつ値を保持。
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		val, err := big.NewInt(0).SetString(line)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}
		valInt64, ok := val.Int64()
		if !ok {
			continue // overflow の場合、int64 に代入できないが、値自体は big.Int で持つべきか？
			// 「値と個数はいずれも 64bit 整数の範囲に収まる」なので int64 で OK.
			// しかし line が "9007199254740993" (int64 max + 1) のような場合？
			// その場合は int64 に設定できない。しかし仕様で「収まる」とある。
			continue
		}
		values = append(values, valInt64)
	}

	if len(values) == 0 {
		fmt.Println("pairs=0")
		return
	}

	m := make(map[int]int) // 値 -> 出現回数
	for _, v := range values {
		m[v]++
	}

	totalPairs := int64(0)

	for val, count := range m {
		complement := target - val
		if count == 0 || complement < 0 || complement > 1e9 { // 補足条件などなし。map で検索するだけ。
			continue
		}
		if complementInMap, ok := m[complement]; ok {
			if complement == val {
				// 同じ値の場合、C(count, 2) = count*(count-1)/2
				totalPairs += (count * int64(count - 1)) / 2
			} else if complement > val { // v < w の場合のみ一度計算する。v > w の場合は後で処理されるが、map と条件で重複計算を防ぐ。
				// v + w = target. v < w かつ w in map.
				totalPairs += int64(count) * complementInMap
			}
		}
	}

	fmt.Printf("pairs=%d\n", totalPairs)
}
