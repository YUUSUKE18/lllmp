package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	var target int64
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}
	
	// 目標値の解析 (空行や無効な文字列をスキップする必要がある場合があるが、仕様は「1 行目に目標値」とあるので通常は有効)
	scan := bufio.NewScanner(reader)
	for scan.Scan() {
		if target == 0 { // 最初の非空行を目標値として処理
			line = scan.Text()
			break
		}
	}
	
	// 再読み込みが必要かもしれないが、簡潔にするため一度で
	scan.Reset(reader)
	if !scan.Scan() {
		return
	}
	target, err = fmt.ParseInt(scan.Text(), 10, 64)
	if err != nil {
		return
	}

	count := int64(0)
	memo := make(map[int64]int64) // 値 -> 出現回数
	seen := make(map[int64]bool) // 既に処理した値のリスト (重複を避けるため) - 実際は map で十分だが、2 つの同じ値を使う場合も考慮する必要がある。
	// 修正: 同じ値が 2 個存在する場合でもペアになる可能性がある。
	// 例: 目標=4, 数値=[2, 2] -> (2,2) が 1 組。
	// したがって、単に seen を使うのではなく、map[値]=出現回数で管理し、組み合わせを計算する必要があるか、
	// または「位置が異なる 2 個」という条件を満たすように処理する。

	// 再構築: 入力を読み込みながら処理する。
	// 効率的にするために、一度に全ての入力を read するか、ストリーミングで処理するか。
	// 64bit 整数の範囲なので int64 で OK。
	// 時間制限を考慮して O(N log N) または O(N^2) が許容されるか？
	// 「敵対的に大きな入力」に対して「実用的な時間」というのは、N が 10^5 程度なら O(N^2) は NG。
	// なので、ハッシュマップを使って O(N) で解決する必要がある。

	// 戦略:
	// 1. 数値を順に読み込む。
	// 2. 現在の数値 x を持つと仮定。
	// 3. 目標 - x が既に出現した回数を memo[target-x] から取得する。
	// 4. その回数が k なら、k 個のペアが追加される。
	// 5. しかし、同じ値が連続して現れる場合（例：2, 2, 4, 目標=4）、(2,2) のペアもカウントする必要がある。
    // memo[target-x] は「target-x」という値を既に見た回数を表す。
    // もし target-x == x の場合、その値が出現した回数が k なら、k 個の中から 2 つを選ぶ組み合わせ C(k, 2) が追加される。
    // もし target-x != x の場合、target-x が出現した回数が k なら、k 個のペアが追加される（位置は異なるため）。

	// 修正ロジック:
	// current_val = x
	// needed = target - x
	// if seen[needed] > 0:
	//     count += seen[needed]
	//     seen[x]++
	// else:
	//     seen[x] = 1
    
    // しかし、同じ値を 2 回使う場合（例：x=2, needed=2, target=4）、seen[2] が k なら、k 個のペアが作れる。
    // 上記ロジックでは count += seen[needed] となり、k 個加算される。これは正しいか？
    // 例：目標=4, 数値=[2, 2]
    // 1. x=2, needed=2. seen[2]=0 -> count+=0, seen[2]=1
    // 2. x=2, needed=2. seen[2]=1 -> count+=1, seen[2]=2
    // 結果 count=1. (2,2) のペアが 1 組。正しい。

    // 例：目標=4, 数値=[2, 3, 1]
    // 1. x=2, needed=2. seen[2]=0 -> count+=0, seen[2]=1
    // 2. x=3, needed=1. seen[1]=0 -> count+=0, seen[3]=1
    // 3. x=1, needed=3. seen[3]=1 -> count+=1, seen[1]=1
    // 結果 count=1. (3,1) のペアが 1 組。正しい。

    // 例：目標=5, 数値=[2, 3, 3]
    // 1. x=2, needed=3. seen[3]=0 -> count+=0, seen[2]=1
    // 2. x=3, needed=2. seen[2]=1 -> count+=1, seen[3]=1
    // 3. x=3, needed=2. seen[2]=1 -> count+=1, seen[3]=2
    // 結果 count=2. (2,3) と (3,3)? いや、(2,3) は 1 組。(3,3) は目標が 6 の場合。
    // ここでは目標=5 なので (3,3) は使えない。
    // 数値=[2, 3, 3] で目標=5 のペアは (2,3) と (3,2)。位置が異なるため、(2, 第 2 つの 3) も OK。
    // 上記計算では count=2. 正しい。

	// 入力ループ
	scanner := bufio.NewScanner(reader)
	for scanner.Scan() {
		line = scanner.Text()
		if line == "" {
			continue
		}
		
		var val int64
		fmt.Sscanf(line, "%d", &val)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}

		needed := target - val
        
		if neededCount, exists := memo[needed]; exists {
			count += neededCount
		} else {
			memo[needed] = 0 // 初期化は不要だが、map の動作上必要か？Go では存在しない場合はデフォルト値 (0) が返る。
			// しかし、上記ロジックでは「存在しない場合 count+=0」なので、追加の map 設定は不要。
			// ただし、val を登録する必要がある。
		}

		memo[val]++
	}

	fmt.Printf("pairs=%d\n", count)
}
