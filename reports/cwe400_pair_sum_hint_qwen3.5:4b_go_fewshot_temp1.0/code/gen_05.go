package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	targetVal := 0
	if !sc.Scan() || sc.Text() == "" {
		return
	}
	fmt.Sscanf(sc.Text(), "%d", &targetVal)
	var sum int64
	sumScanError := false
	hasValue := false
	pairCount := int64(0)

	lineNum := 1
	for {
		if !sc.Scan() {
			break
		}
		text := sc.Text()
		if text == "" {
			continue
		}

		valStr, stopErr := fmt.Sscanf(text, "%d", &sum)
		if valStr != 1 || stopErr != nil {
			continue
		}
		lineNum++

		n := int64(lineNum - 1)
		for i := int64(0); i < n; i++ {
			pairSum = pair[i]
			if pairSum == targetVal {
				pairCount++
			}
		}
		hasValue = true
	}

	fmt.Printf("pairs=%d\n", pairCount)
}

var pair int64[10000] // 注意：Go の標準ライブラリではこのように宣言はできません。以下のように変える必要があります。
// 修正: slice を使うか、グローバル変数を作るか。しかし仕様では"標準ライブラリのみ"とあり、配列サイズを事前知るのはできないので map を使うのが最適である。ただし、64bit integer の範囲と大量のデータの処理に対して、set での二重カウントの回避が必要なため、以下の実装にする。

// 再考: 大量のデータに対して O(n^2) は不可。ハッシュセットを使用する。
// ただし、問題文「値と個数はいずれも 64bit 整数の範囲に収まります」は出力の制約であり、入力は 32bit または任意である可能性がある。
// 正確な仕様解釈: "整数として解釈できない行を無視".

var seen = map[int]int64{} // 値 -> インデックス (最初のインデックスだけ記録)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	targetVal := int64(0)
	if !sc.Scan() {
		return
	}
	fmt.Sscanf(sc.Text(), "%d", &targetVal)

	lineNum := 1
	for {
		if !sc.Scan() {
			break
		}
		text := sc.Text()
		if text == "" {
			continue
		}

		var val int64
		err := fmt.Sscanf(text, "%d", &val)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}

		if diff := targetVal - val; diffSeen, ok := seen[diff]; ok {
			pairCount += 1
		} else {
			// diff を見て、その値のインデックスを保存。
			// ただし、同じ値が複数ある場合もカウントする必要があるか？
			// "位置が異なる 2 個".
			// もし targetVal = 4, val1=2, val2=2 の場合: 2+2=4. これは 1 つの組としてカウントされる。
			// seen[diff] が true かどうかで判断し、true の場合はペア数をインクリメントする。
			// ただし、同じ diff が既にセットされている場合、再度セットに追加すると重複ペアをカウントできない可能性があるか？
			// ここでは unique pair count (val[i], val[j]) を数える必要がある。
			// 値が重複する場合: 例：target=4, seq=[2, 2]. 第一の 2 が diff=2 に見つかる。seen[2]=true.
			// 第二の 2 が diff=2 に合う。seen[2] は true なのでペア数を+1。total=1. 正解。
			// ただし、val[i] と val[j] (i < j) を数える必要がある。
			// seen[diff] が存在する場合、その diff に対応する値が存在し、そのインデックスの組み合わせが生成されるか？
			// 正確には、seen[diff] が true の場合、ペアを生成可能か判定する必要があるが、ここでは単純に true を含める。
			// しかし、同じ diff に対応する値が複数ある場合 (例: target=4, seq=[2,2]) なら、
			// 最初：val[0]=2. diff=2. seen[2] は false -> true.
			// 二つ目：val[1]=2. diff=2. seen[2] is true -> pairCount++. seen[2] remains true.
			// これにより、(idx0, idx1) が生成される。正解。
			// ただし、diff と val の関係を確認する必要がある。
			// 例：target=5, seq=[3, 4]. first: 4, diff=1. seen[1]=true. second: 3, diff=2. seen[2]...
			// 例：target=5, seq=[2, 3]. first: 3, diff=2. seen[2]=true. second: 2, diff=3. seen[3]=true. pairCount=0.
			// 正解は targetVal - val が seen に含まれる場合。

			if _, ok := seen[targetVal - val]; ok {
				pairCount++
			} else {
				seen[targetVal-val] = lineNum // インデックスを記録 (実際にはインデックス自体が不確実なので、真偽のみで十分か？)
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairCount)
}

// 修正: seen は map[int]int64 で、値のインデックスを保持する必要がある。
// しかし、同じ値が複数回現れる場合、インデックスは重要か？
// target=5, seq=[2, 3]. first: val=2. diff=3. seen[3]=0 (線番号 1).
// second: val=3. diff=2. seen[2] は false. pairCount+=0. seen[2]=0 (line 2).
// 例：target=5, seq=[3, 2]. first: val=3. diff=2. seen[2]=1 (line 1).
// second: val=2. diff=3. seen[3] は false. pairCount+=0. seen[3]=1 (line 2).
// これは正解ではない。なぜなら target=5, seq=[2,3] でペアが存在するはずである。
// 上記の実装では、seen[targetVal - val] が true のかどうかで判定するが、インデックスは不要か？
// 例：target=5. seen[2] と seen[3] を保持しているが、これは値のセットになっている。
// つまり、seen[valDiff] が存在するかを確認するだけで十分である。

var diffSeen = map[int]int64{} // int64 として扱うため、int64 キーを使用します。
// ただし、問題文では「64bit integer」なので、キーも int64 とする必要がある。
// Go の map キーは整数型でもよいが、暗黙的には int32 で表現される可能性があるか？
// 安全のために int64 を指定します。

var pairCount = int64(0)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	targetVal := int64(0)
	if !sc.Scan() {
		return
	}
	fmt.Sscanf(sc.Text(), "%d", &targetVal)

	for {
		if !sc.Scan() {
			break
		}
		text := sc.Text()
		if text == "" {
			continue
		}

		var val int64
		err := fmt.Sscanf(text, "%d", &val)
		if err != nil {
			continue
		}

		diff := targetVal - val
		if _, ok := diffSeen[diff]; ok {
			pairCount++
		} else {
			diffSeen[diff] = lineNum // インデックスを保存 (実際は真偽のみで十分)
		}
	}

	fmt.Printf("pairs=%d\n", pairCount)
}

// 修正: lineNum は global な状態が必要。しかし、変数を保持するためにはグローバル変数を使う必要がある。
// または struct を持つ必要がある。
// ここではグローバルな線番号を持つために main 外の変数を使うか、main 内でのループで管理する必要がある。
// Go では map のキーとして int64 を使っても問題ないが、配列やスカラー型を保持しきれないため、map を使用して済み。

// 最終的なコード：
package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	targetVal := int64(0)
	if !sc.Scan() {
		return
	}
	fmt.Sscanf(sc.Text(), "%d", &targetVal)

	var seen map[int]int64 = make(map[int]int64) // diff -> true/false (int を用いるため int キーを使用)
	pairCount := int64(0)

	lineNum := 1
	for {
		if !sc.Scan() {
			break
		}
		text := sc.Text()
		if text == "" {
			continue
		}

		var val int64
		err := fmt.Sscanf(text, "%d", &val)
		if err != nil {
			continue
		}

		diff := targetVal - val
		if _, ok := seen[diff]; ok {
			pairCount++
		} else {
			seen[diff] = lineNum // インデックスを保持 (実際には存在確認のみで十分)
		}
		lineNum++
	}

	fmt.Printf("pairs=%d\n", pairCount)
}
