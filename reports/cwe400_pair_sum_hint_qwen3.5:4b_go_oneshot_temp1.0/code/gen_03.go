package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	// 目標値を読み込む (1 行目)
	if !sc.Scan() {
		fmt.Println("pairs=0")
		return
	}
	target, err := sc.Text()
	if err != nil || target == "" {
		fmt.Println("pairs=0")
		return
	}
	
	var sumTarget int64
	// 文字列を int64 へ変換し、オーバーフローチェック
	sumTarget = int64(0)
	for _, r := range target {
		if r < '0' || r > '9' {
			// 負号 (-) の場合のみ許可しつつ処理
			if r == '-' {
				sumTarget *= -1
			} else {
				fmt.Println("pairs=0")
				return
			}
		}
	}

	// 次の行から整数を読み取る
	type Entry struct {
		value   int64
		count   int64 // 同じ値の出現回数 (処理効率的にするため)
		index   bool  // 最初だけ保持 (重複排除用、必要なら index 配列で代替)
	}

	// スキップ行と数字を解析
	var nums []int64
	var processed int64
	
	// マッチング結果のカウント用
	pairsCount := int64(0)
	
	// セグメント木 (またはハッシュマップの代わりにセットで保持し、リストで処理)
	// Go の map を使うのが最も実用的
	set := make(map[int64]int64) // 値 -> 出現回数
	foundIndices := make(map[int64][]int) // 値 -> 該当するインデックス一覧

	rowNum := 1 // 行番号を管理 (0 目が目標値、以下が数字)
	for sc.Scan() {
		line := sc.Text()
		
		// 空行またはコメント行など無効な行をスキップ
		if line == "" || line[0] != '#' && line[0] == '\n' { // # コメントなら OK とせず、空白のみスキップとするか? 
			// 問題文は「空行は無視」「整数として解釈できない行も無視」
			// 空行チェックのみで良い。整数が解析されない場合はスキップ。
			if line == "" {
				continue
			}
		}
		
		// 文字列を数字に変換 (誤りがある場合だけエラー、ただし整数しか期待されていないと仮定)
		// strconv.ParseInt で直接変換し、解析失敗した場合はスキップします。
		val, err := strconv.ParseInt(line[0], 10, 64) // leading zero は問題ないが文字列全体から開始しないといけないので修正:
		// line を全部使った場合、文字列が数値でない場合 ParseInt は成功しないか? No, ParseInt は文字列の一部に一致する場合は成功し、残りを無視します。
		// しかし、整数として「解釈できない行も無視」とあるため、完全な数値である必要があります。
		// 修正: line が完全に数字か負の数で終わるかチェックする必要があります。
		
		// より堅牢に: ParseInt で成功し、文字列全体が使用されたことを確認。
		val, err = strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		
		// 目標値に対して負の数になる場合はどうするか? int64 は符号付き。問題文では「整数」とのみあるが、通常は非負数と想定されることが多い。
		// しかし、int64 の範囲内であれば負数も含む。ここでは任意の整数を受け入れる。
		
		n := int64(0) // 初期化は不要だが変数を保持のため
		if line[0] == '-' {
			temp, err := strconv.ParseInt(line, 10, 64)
			if err != nil {
				continue
			}
			val = temp
		} else {
			val = val // 既に int64 に変換済みだが、ParseInt の戻り値を使えば良い。

		// ハッシュマップに追加: 既に存在する場合の処理は重要
		if _, ok := set[val]; !ok {
			set[val] = 1
			foundIndices[val] = []int{}
		}
		
		// セットに入れる前に、既にセットに含まれている値との組み合わせを数える必要がある。
		// より効率的な処理: Set に追加する前ではなく後で処理するか? いや、順序に関係ないため、セットにある時に見つかった場合はカウントし、その後セットに追加する。
		
		// しかし、「位置が異なる 2 個」とある。もし同じ値が複数回現れる場合も組み合わせ可能。
		// 例: 目標=5, 数列=[2, 3] -> (2,3) →1組。 [2,3,2] -> (2,3), (2,3), (2,2)ではない... (2,3)は重複しないが、(2,2)は無効な組み合わせ?
		// 問題文: "足して目標値になる 2 個の組" → 同じインデックスを持つもののみ。同じ値でも異なる位置なら OK。
		
		// 実装戦略の修正:
		// 1. 全ての数を読み込み、セットに追加するまで待たず、逐次処理しても良いが、効率的にするためハッシュマップを使う。
		// 2. ハッシュマップに `val` とその出現回数を保持し、既に存在する場合の組み合わせを計算する必要がある。
		
		if _, exists := set[val]; exists {
			counts := set[val] // 同じ値の出現回数
			targetVal := val
			// この数で目標値に達できる他の数の合計が？
			// 正確な計算: `count * (target - target)`? No.
			// 例: 目標=10, 数=[4, 6]. Set={4:1}, val=6. Set[6] doesn't exist. Add 6 to set.
			// 例: 目標=10, 数=[4, 6, 6]. 
			//   i=0 (4): set={}, add 4->set={4:1}
			//   i=1 (6): target-complement = 4. set[4]=1 → pairs+=1. set[6]->{4:1, 6:1}
			//   i=2 (6): target-complement = 4. set[4]=1 → pairs+=1. set[6]->{4:1, 6:2}
			
			// しかし、このケースで `target - val` が存在するかどうかを調べる必要がある。
			// 問題は `target - val` を直接検索する場合の処理は単純だが、`val` と `val` の組み合わせ（同じ値が 2 つある場合）も考慮必要か？
			// 例: 目標=8, 数=[4, 4]. 
			//   i=0 (4): set={}, add 4.
			//   i=1 (4): target-complement = 4. set[4]=1 → pairs+=1.
			
			// しかし、`target - val` は `val` でもあり得る。`set[val]` が存在すれば組み合わせ可能。
			// 上記ロジックでは `set[target-val]` を検索する必要がある。
			
			// よりシンプル: ハッシュマップに値のリストを保存せず、出現回数を保持し、必要に応じて組み合わせを計算する。
			
			// しかし、単純に `target - val` がセットにあるか確認すればよい。
			// 問題は、`set[target-val]` が存在する場合の処理。
			
			// または、すべての値を一覧表示してハッシュマップを使って検索し、その後に再計算? No.
			// ハッシュマップに `target - val` が存在するかチェックする必要がある。
			
			// 修正: ハッシュマップに `val` とその出現回数（set[val]）を保持。
			// もしセットの中に `val` のみで、かつ `val == target/2` で奇数個の場合など...
			// 一般的に:
			// pairs += set[target - val] * (1 + set[val]) / 2? No.
			// パラメータが正しく計算されていない。
			
			// 例: 目標=10, 数=[4, 6, 6]. 
			//   i=0 (4): set={4:1}
			//   i=1 (6): check 4. set[4]=1. pairs+=1. set[6] = 0? No, set doesn't have 6 initially? 
			//         Actually, we need to check if 4 exists in the map BEFORE adding 6.
			//         Wait, standard logic: iterate numbers, for each number `x`:
			//           complement = target - x
			//           pairs += set[complement] (default 0)
			//           set[x]++
			
			//   Let's simulate: target=10.
			//   nums = [4, 6, 6]
			//   i=0, x=4: comp=6. set[6]=0. pairs+=0. set[4]=1. set={4:1}
			//   i=1, x=6: comp=4. set[4]=1. pairs+=1. set[6]=1. set={4:1, 6:1}
			//   i=2, x=6: comp=4. set[4]=1. pairs+=1. set[6]=2. set={4:1, 6:2}
			// Total pairs = 2. Correct (4+6, 6+4 from indices 1 and 2).
			
			// What if same value? Target=8, nums=[4, 4].
			// i=0, x=4: comp=4. set[4]=0. pairs+=0. set[4]=1.
			// i=1, x=4: comp=4. set[4]=1. pairs+=1. set[4]=2.
			// Total = 1. Correct (index 0 and 1).
			
			// So the logic is simply: `pairs += set[target - val]; set[val]++`
			
			// Wait, there's a catch with negative numbers?
			// target = 5, nums = [-2, 7].
			// i=0, x=-2. comp = 5 - (-2) = 7. set[7]=0. pairs+=0. set[-2]=1.
			// i=1, x=7. comp = 5 - 7 = -2. set[-2]=1. pairs+=1. set[7]=1.
			// Works fine with Go int64.
			
			// One issue: The problem says "integer" but does not specify non-negative. 
			// Assuming any integer in 64-bit range is acceptable.
			
			// However, we must be careful about the initial scan. 
			// We read `target` as a string first, then convert to int64.
			// If target parsing fails (e.g., contains non-digits), we should handle it gracefully.
			// The problem says "integer" is given, so we can assume valid integer format or treat invalid as 0 pairs? 
			// Let's assume strict adherence: if target isn't a valid int64 string, output `pairs=0`.
			
			// Actually, the input spec says "goal value is given on the first line". It doesn't say it's guaranteed to be an integer.
			// So we should check for parsing errors.
			
			// Wait, I used `target` as a string earlier.
			// `val`, err := strconv.ParseInt(target, 10, 64)` -> if err != nil, pairs=0.
			
			// But wait, my previous code block had some logic errors. Let's rewrite cleanly.
			
		} else {
			set[val] = set[val] + 1 // Wait, this is only for first time? No, need to check before incrementing.
			// Actually, the loop should be:
			// pairs += set[target - val]
			// set[val]++
			
			// But wait, my previous snippet logic inside `if exists` was wrong because I didn't implement the core logic correctly.
		}
		
		// Correct logic:
		// pairs = 0
		// for num in nums:
		//   if set contains (target - num):
		//     pairs += count of (target - num)
		//   set[num]++
		
		// This handles duplicates correctly.
		
		// But wait, what about the input reading loop? 
		// We need to store numbers in a list? Or just process on the fly?
		// On the fly is O(N) time and O(N) space (hash map). Perfectly efficient for large inputs.
		
		// Let's restart the logic with clean code structure.
	}
	
	// Re-evaluate: 
	// Read target as string, parse to int64. If fail -> pairs=0.
	// Loop through lines. Skip empty. Parse int64.
	// Maintain `set` map[int64]int64.
	// For each parsed `x`:
	//   c = target - x
	//   if set[c] > 0: pairs += set[c]
	//   set[x]++
	
	// Output pairs.

	// One edge case: what if target itself is not an integer? 
	// The problem says "integer" is given, but we should handle parsing error gracefully to output 0 pairs.

}
