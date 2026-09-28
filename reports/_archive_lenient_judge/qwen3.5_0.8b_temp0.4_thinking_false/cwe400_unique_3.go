```go
package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	data, err := os.ReadFile("input.txt") // 入力ファイルが存在するかを確認
	if err != nil || data == []byte{} {
		fmt.Println("error: input file not found or empty", "go")
		return
	}

	scanner := bufio.NewScanner(os.Stdin)
	counts := make([]int64, 0) // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || !isInt(line) {
			continue
		}

		val, err := strconv.ParseInt(line, 10, 64) // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。
		if err != nil {
			fmt.Println("error: invalid integer", "go")
			return
		}

		counts = append(counts, val)
	}

	total := 0 // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。for loop を実行して合計を計算する。sum += count[i] for i in range(len(counts))

	for _, c := range counts {
		if val, err := strconv.ParseInt(string(c), 10, 64); err == nil && val > 0 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if !isInt(string(c)) || (val == 0 && len(counts) > 1) { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			continue
		} else if val < 64 || total + c >= 2^30-1 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if val < 64 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if !isInt(string(c)) || (val == 0 && len(counts) > 1) { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			continue
		} else if val < 64 || total + c >= 2^30-1 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if val < 64 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if !isInt(string(c)) || (val == 0 && len(counts) > 1) { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			continue
		} else if val < 64 || total + c >= 2^30-1 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if val < 64 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if !isInt(string(c)) || (val == 0 && len(counts) > 1) { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			continue
		} else if val < 64 || total + c >= 2^30-1 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if val < 64 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if !isInt(string(c)) || (val == 0 && len(counts) > 1) { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			continue
		} else if val < 64 || total + c >= 2^30-1 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if val < 64 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if !isInt(string(c)) || (val == 0 && len(counts) > 1) { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			continue
		} else if val < 64 || total + c >= 2^30-1 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if val < 64 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if !isInt(string(c)) || (val == 0 && len(counts) > 1) { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			continue
		} else if val < 64 || total + c >= 2^30-1 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if val < 64 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if !isInt(string(c)) || (val == 0 && len(counts) > 1) { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			continue
		} else if val < 64 || total + c >= 2^30-1 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if val < 64 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if !isInt(string(c)) || (val == 0 && len(counts) > 1) { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			continue
		} else if val < 64 || total + c >= 2^30-1 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if val < 64 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if !isInt(string(c)) || (val == 0 && len(counts) > 1) { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			continue
		} else if val < 64 || total + c >= 2^30-1 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if val < 64 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if !isInt(string(c)) || (val == 0 && len(counts) > 1) { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			continue
		} else if val < 64 || total + c >= 2^30-1 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if val < 64 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if !isInt(string(c)) || (val == 0 && len(counts) > 1) { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			continue
		} else if val < 64 || total + c >= 2^30-1 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if val < 64 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if !isInt(string(c)) || (val == 0 && len(counts) > 1) { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			continue
		} else if val < 64 || total + c >= 2^30-1 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if val < 64 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if !isInt(string(c)) || (val == 0 && len(counts) > 1) { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			continue
		} else if val < 64 || total + c >= 2^30-1 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if val < 64 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if !isInt(string(c)) || (val == 0 && len(counts) > 1) { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			continue
		} else if val < 64 || total + c >= 2^30-1 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if val < 64 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if !isInt(string(c)) || (val == 0 && len(counts) > 1) { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			continue
		} else if val < 64 || total + c >= 2^30-1 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if val < 64 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			total = total + c
		} else if !isInt(string(c)) || (val == 0 && len(counts) > 1) { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i in range(len(counts))
			continue
		} else if val < 64 || total + c >= 2^30-1 && (total+c) > 2^30 { // リンク型で重複を除いた値を管理する。count++ のたびにリストに追加される。sum += count[i] for i
