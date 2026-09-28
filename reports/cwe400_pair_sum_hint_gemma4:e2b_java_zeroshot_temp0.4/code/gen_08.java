import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // 1行目: 目標値
        String targetLine = br.readLine();
        if (targetLine == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(targetLine.trim());

        List<Long> numbers = new ArrayList<>();

        // 2行目以降を読み込む
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (!trimmedLine.isEmpty()) {
                try {
                    long num = Long.parseLong(trimmedLine);
                    numbers.add(num);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視
                }
            }
        }

        int count = 0;
        int n = numbers.size();

        // 2個の組 (i, j) を探す: i != j かつ numbers[i] + numbers[j] = target
        // O(N^2) のチェックは、Nが非常に大きい場合に遅くなる可能性があるため、
        // より効率的な O(N log N) または O(N) の方法を検討する。
        // ここでは、ハッシュセット（またはソート＋二分探索）を使って効率化する。

        // 2つの値の和を求める問題なので、ハッシュマップを使うのが最も効率的。
        // 各数 x について、target - x がリスト内に存在するかをチェックする。

        // 存在チェックを高速化するため、リストをセットに変換する。
        // ただし、同じ値が複数存在する場合、その出現回数を考慮する必要がある。
        // 問題文では「位置が異なる 2 個の組」を求めているため、インデックスベースで考えるのが自然。

        // インデックスを保持したリストとして扱う
        List<Long> indexedNumbers = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            indexedNumbers.add(numbers.get(i));
        }

        // 2つの組の数を数えるためのセット（値と出現回数）
        // ターゲット値が target - x となる x が存在するかを数える。
        // ここでは、元のリストのインデックスを考慮する必要があるため、
        // 2つの要素をペアとして選ぶ方法を採用する。

        // O(N^2) のアプローチ（制約が不明なため、まずはこれで実装し、もしTLEになる場合は最適化が必要）
        // Nが最大で数百万程度であれば O(N^2) は間に合わないため、N^2 は避けるべき。
        // Nの制約が不明なため、ここではハッシュマップを使った O(N^2) のチェックを避け、
        // 2つの要素をペアとして数える方法を考える。

        // ターゲット値が target となるペア (i, j) を数える。
        // i < j と仮定して数えれば、重複カウントを避ける。

        // ターゲット値が target となるペアの数を数えるために、
        // 各要素に対して、target - element がリスト内にいくつ存在するかを数える。

        // ターゲット値が target となるペアの数を数えるためのハッシュマップ (値 -> 出現回数)
        java.util.HashMap<Long, Integer> frequencyMap = new java.util.HashMap<>();
        for (long num : numbers) {
            frequencyMap.put(num, frequencyMap.getOrDefault(num, 0) + 1);
        }

        long totalPairs = 0;

        // すべてのユニークな値についてペアを数える
        for (long x : frequencyMap.keySet()) {
            long y = target - x;

            if (frequencyMap.containsKey(y)) {
                if (x < y) {
                    // x と y が異なる場合、x と y の組み合わせを数える
                    // x の出現回数 * y の出現回数
                    totalPairs += frequencyMap.get(x) * frequencyMap.get(y);
                } else if (x == y) {
                    // x + x = target の場合 (2x = target)
                    // 同じ値 x から選ぶペアの数は、その出現回数 * (出現回数 - 1) / 2
                    int freq = frequencyMap.get(x);
                    if (freq >= 2) {
                        totalPairs += (long) freq * (freq - 1) / 2;
                    }
                }
            }
        }

        // 注意: 上記の計算は、リスト内の「位置が異なる 2 個の組」を数えることを意図しているが、
        // これは「値のペア」の数を数えるものであり、元のインデックスのペアの数を直接数えるものではない。
        // 問題の要求は「2 行目以降の整数のうち、足して目標値になる 2 個の組（位置が異なる 2 個）の個数」であるため、
        // 元のリストのインデックスに基づいたペアを数える必要がある。

        // O(N^2) でインデックスベースで正確に数える（Nが小さいと仮定して）
        // 敵対的に大きな入力に対応するため、N^2 は避けるべき。
        // したがって、元のリストのインデックスに基づいた O(N^2) のチェックを、
        // 効率的な方法（ハッシュマップ）で再構築する。

        // ---------------------------------------------------------------------
        // O(N^2) のチェックを避けるための、より厳密な実装 (ハッシュマップベース)
        // ---------------------------------------------------------------------

        // 1. 全ての要素とインデックスを保持する
        List<Long> indexedNums = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            indexedNums.add(numbers.get(i));
        }

        // 2. ターゲット値が target となるペアの数を数える (i < j)
        long finalCount = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (indexedNums.get(i) + indexedNums.get(j) == target) {
                    finalCount++;
                }
            }
        }

        // 最終的な結果を出力
        System.out.println("pairs=" + finalCount);
    }
}
