package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	targets, err := reader.ReadString('\n')
	if err != nil {
		fmt.Println("pairs=0")
		return
	}

	target, err := fmt.Sscanf(targets, "%d", nil)
	// 目標値を読み取る (Sscanfは関数ではなく関数を返す形式ではないが、単純な解析が必要なので string manipulation を使うか Sprintf で代入)
	// 上記の Sccanf は存在しないので、別の方法で整数に変換する。
	// スキャナーを使うのが安全。
	var targetVal int64
	fmt.Sscanf(targets, "%d", &targetVal)

	pairCount := 0
	seen := make(map[int64]int)

	for {
		line, err := reader.ReadString('\n')
		if len(line) == 0 && (err == nil || line == "") {
			// EOF または空行が到着し、かつデータがない場合の判定
			if err == io.EOF {
				break
			}
			// 空行は無視する
		} else if err != nil {
			break
		}

		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}

		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		needed := targetVal - val
		if count, ok := seen[needed]; ok {
			pairCount += count
		}
		seen[val]++
	}

	fmt.Printf("pairs=%d\n", pairCount)
}
