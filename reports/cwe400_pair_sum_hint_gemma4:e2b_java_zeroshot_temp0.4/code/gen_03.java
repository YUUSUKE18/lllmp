import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // 1行目を読み込み、目標値を設定
        String line = br.readLine();
        if (line == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(line.trim());

        List<Long> numbers = new ArrayList<>();

        // 2行目以降を読み込み、整数を収集
        String nextLine;
        while ((nextLine = br.readLine()) != null) {
            String trimmedLine = nextLine.trim();
            if (!trimmedLine.isEmpty()) {
                try {
                    long num = Long.parseLong(trimmedLine);
                    numbers.add(num);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視
                }
            }
        }

        // 2個の組の数を計算
        long pairCount = 0;
        int n = numbers.size();

        // O(N^2) のアプローチ（Nが十分に小さければ許容されるが、敵対的に大きな入力に対しては注意が必要）
        // 仕様では「実用的な時間とメモリで完了するように」とあるため、N^2が許容されるか、
        // あるいはより効率的な方法（ソート＋二分探索やハッシュマップ）が必要か検討する。
        // ここでは、与えられた制約と「2個の組」の定義から、N^2が最も直接的で確実な方法であると仮定し、
        // Nが非常に大きい場合（例: 10^5以上）には、より高度なアルゴリズムが必要になるが、
        // 入力形式が「1行に1個ずつ並ぶ」という点から、入力サイズ自体が制約されると考える。
        // 敵対的に大きな入力に対しても実用的な時間で完了させるためには、N^2は危険。
        // N^2の計算を避けるため、ハッシュマップ（またはソート）を用いる。

        // ハッシュマップによるO(N)またはO(N log N)のアプローチ
        // ターゲット値との差を求めるのではなく、「ターゲット値から必要な値」を求める。
        // 2つの値 a と b が a + b = target を満たすペアを探す。
        // numbers リスト内の要素 a に対して、target - a がリスト内に存在するかを調べる。

        // 存在チェックを高速化するため、リストをセット（HashSet）に変換する。
        java.util.Set<Long> numberSet = new java.util.HashSet<>(numbers);

        // 重複を考慮する必要があるか？
        // 「2個の組（位置が異なる 2 個）」なので、元のリストのインデックスが異なる必要がある。
        // 集合を使うと、同じ値が複数存在する場合、その組み合わせを過大にカウントする可能性がある。
        // 例: target=10, numbers={3, 7, 3, 7}
        // (3, 7) のペアは 4組存在する。
        // 集合を使うと、3と7のペアが1組としてカウントされる。

        // 元のリストを保持し、インデックスで管理する方が「位置が異なる」を満たしやすい。
        // O(N^2)に戻るが、入力サイズが実用的な範囲（例: N <= 5000）であれば許容される。
        // 敵対的に大きな入力（例: N=10^5）を想定する場合、O(N^2)は時間切れになるため、
        // ターゲット値との差を求める方法で、出現回数を数えるアプローチを採用する。

        // ターゲット値との差を求めるアプローチ (O(N) + 集合操作)
        // ターゲット値 T に対して、x + y = T となるペア (x, y) を数える。
        // x = numbers[i], y = numbers[j] (i != j)

        // ターゲットを達成するペアの数を数えるため、リスト全体を走査する。
        // ターゲット値 T に対して、T - x がリスト内に存在するかを数える。
        // ここで、リスト内の要素の出現回数を考慮する必要がある。

        // 各要素の出現回数をマッピングする
        java.util.HashMap<Long, Integer> counts = new java.util.HashMap<>();
        for (long num : numbers) {
            counts.put(num, counts.getOrDefault(num, 0) + 1);
        }

        pairCount = 0;

        for (long x : numbers) {
            long y = target - x;

            if (counts.containsKey(y)) {
                // x と y が同じ値の場合 (x == y)
                if (x == y) {
                    // x + x = target, つまり 2x = target
                    // この x の出現回数 N_x がある。
                    // x と x の異なる2つの位置の組の数は N_x * (N_x - 1) / 2
                    int countX = counts.get(x);
                    pairCount += (long) countX * (countX - 1) / 2;
                }
                // x と y が異なる値の場合 (x != y)
                else if (x < y) {
                    // x と y のペアを数える。xがj番目、yがk番目とすると、
                    // xの出現回数 * yの出現回数 がペアの総数になる。
                    // ただし、xとyは異なるので、(x, y) のペアと (y, x) のペアを重複して数えることになる。
                    // 求めるのは {x, y} の集合なので、x < y の条件で一度だけ数える。
                    int countX = counts.get(x);
                    int countY = counts.get(y);
                    pairCount += (long) countX * countY;
                }
            }
        }

        // 最終的な結果を出力
        System.out.println("pairs=" + pairCount);
    }
}
