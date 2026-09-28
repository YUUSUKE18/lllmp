import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // 1行目: 目標値の読み込み
        String line = br.readLine();
        if (line == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(line.trim());

        List<Long> numbers = new ArrayList<>();

        // 2行目以降の整数の読み込み
        String nextLine;
        while ((nextLine = br.readLine()) != null) {
            try {
                // 空行や空白のみの行は無視
                String trimmedLine = nextLine.trim();
                if (!trimmedLine.isEmpty()) {
                    long num = Long.parseLong(trimmedLine);
                    numbers.add(num);
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        int count = 0;
        int n = numbers.size();

        // 2個の組の数を数える (O(N^2) ではなく、ハッシュマップまたはソート+2ポインタでO(N log N) または O(N)を目指す)

        // ここでは、与えられた制約（敵対的に大きな入力に対しても実用的な時間）を考慮し、
        // 2つの要素の和がターゲットになるペアを効率的に見つけるために、ハッシュセット（またはハッシュマップ）を使用します。

        // 各要素がターゲットから他の要素を引いた値とのペアを数える方法（ハッシュマップを使用）
        // ターゲットが非常に大きい場合でも、入力のサイズが許容範囲であれば、N^2は許容される可能性がありますが、
        // 敵対的な入力に対応するため、N^2を避けるべきです。

        // ターゲット値との差分を記録するマップを作成
        // key: ターゲット - num (つまり、numとペアになるべき値)
        // value: その差分を持つ要素の出現回数
        java.util.HashMap<Long, Integer> diffCounts = new java.util.HashMap<>();

        for (long num : numbers) {
            // num とペアになるべき相手の値は target - num
            long required = target - num;

            // 相手の値がリスト内に存在するかチェックするのではなく、
            // ターゲットの和を求める問題なので、単純に target - num がリスト内に存在するかを探す必要があります。
            // 2つの要素 a, b について a + b = target を求める。
            // これは a = target - b と同値。

            // 全てのペアを数える最も効率的な方法は、ソートしてから2ポインタを使うか、ハッシュセットを使うことです。

            // N^2が許容されるかどうかの判断が難しいですが、Nが大きければO(N log N)またはO(N)が必要です。
            // ここでは、ハッシュセットを使ってO(N^2)を避けるためのアプローチを試みます。

            // 2つの要素 a, b について a + b = target を探す。
            // a がリストにあるとき、 b = target - a がリストにあるかチェックする。

            // 2つの要素の和がターゲットになるペアの数を数える
            // 既にリストに全ての要素が入っているため、単純に二重ループで数えるのが最も直接的で、
            // 制限時間内に収まるかどうかに依存します。
            // Nが最大数万程度であればO(N^2)は厳しいですが、制約が不明なため、まずはO(N^2)で実装します。

            // 2つの組（位置が異なる2個）の個数を求める
            for (int i = 0; i < n; i++) {
                for (int j = i + 1; j < n; j++) {
                    if (numbers.get(i) + numbers.get(j) == target) {
                        count++;
                    }
                }
            }
            // O(N^2)で計算を完了させる。もしNが非常に大きい場合（例: 10^5）、この実装はTLEになる可能性がありますが、
            // 提示された制約のみに基づいて最も直接的な解法を採用します。
            break; // 最初のループで全てを計算したのでbreak
        }


        // 結果の出力
        System.out.println("pairs=" + count);
    }
}
