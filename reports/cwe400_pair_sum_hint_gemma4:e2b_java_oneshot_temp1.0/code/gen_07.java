import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // 1行目: 目標値の読み込み
        String targetLine = br.readLine();
        if (targetLine == null) {
            System.out.println("pairs=0");
            return;
        }
        long target;
        try {
            target = Long.parseLong(targetLine.trim());
        } catch (NumberFormatException e) {
            // 目標値が不正な場合は処理を終了（仕様上は入力は正しいと仮定されるが念のため）
            System.out.println("pairs=0");
            return;
        }

        List<Long> numbers = new ArrayList<>();
        String line;

        // 2行目以降の読み込み
        while ((line = br.readLine()) != null) {
            // 空行や空白のみの行を無視
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }
            try {
                long num = Long.parseLong(trimmedLine);
                numbers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        long pairCount = 0;
        int n = numbers.size();

        // 2つの組の個数を求める（O(N^2)を避けるため、ハッシュマップやソートを利用する）
        // ここでは、2つの異なるインデックス i と j について numbers[i] + numbers[j] == target を探す。
        // N^2は敵対的な入力に対して遅すぎる可能性があるため、より効率的な方法を検討する。
        // 2つの要素の和を求める問題なので、ハッシュマップ（またはソートと二分探索）が考えられる。
        
        // 最適化のため、要素の出現回数を数えるためにハッシュマップを使用する（O(N) + O(N) = O(N)）
        // ただし、インデックスが異なる2つの組を数える必要があるため、重複カウントに注意が必要。
        
        // 問題は「位置が異なる2個の組」なので、同じ値を持つ要素が複数ある場合は注意が必要。
        // 例: target=10, numbers={1, 9, 1, 9}
        // (numbers[0], numbers[1]) = (1, 9) -> OK (1組目)
        // (numbers[0], numbers[3]) = (1, 9) -> OK (2組目)
        // (numbers[2], numbers[1]) = (1, 9) -> OK (3組目)
        // (numbers[2], numbers[3]) = (1, 9) -> OK (4組目)
        
        // これは、各値 $x$ と $target - x$ のペアの出現回数を数える問題に帰着する。
        
        java.util.Map<Long, Integer> counts = new java.util.HashMap<>();
        for (long num : numbers) {
            counts.put(num, counts.getOrDefault(num, 0) + 1);
        }

        long totalPairs = 0;

        for (long num1 : numbers) {
            long num2 = target - num1;

            if (counts.containsKey(num2)) {
                if (num1 < num2) {
                    // num1 と num2 が異なる場合、(num1, num2) のペアを数える
                    // num1 の出現回数 * num2 の出現回数
                    totalPairs += counts.get(num1) * counts.get(num2);
                } else if (num1 == num2) {
                    // num1 == num2 の場合 (つまり 2 * num1 == target)
                    // この場合、同じ値を持つ要素のペアの数を計算する
                    // counts.get(num1) * (counts.get(num1) - 1) / 2
                    // ここで、`num1` に該当する要素が複数存在する場合、それらの組み合わせを数える。
                    // 求めるのは「位置が異なる2個の組」なので、組み合わせの数を使う。
                    long count = counts.get(num1);
                    if (count >= 2) {
                        totalPairs += count * (count - 1) / 2;
                    }
                }
            }
        }
        
        // 上記のループでは、(a, b) と (b, a) の両方を数えてしまうため、合計が2倍になる。
        // したがって、結果を2で割る。
        // ただし、`num1 < num2` の場合と `num1 == num2` の場合で計算方法が異なるため、慎重に行う必要がある。
        
        // 再計算：より単純に、全要素のペアを数える方法を採用する。
        
        long finalPairCount = 0;
        java.util.Set<Long> uniqueNumbers = new java.util.HashSet<>(numbers);
        
        for (long num1 : uniqueNumbers) {
            long num2 = target - num1;
            
            if (num1 > num2) {
                continue; // すでに (num2, num1) としてカウント済み
            }

            if (num1 == num2) {
                // 同じ値のペア: {x, x} = {target/2, target/2}
                if (target % 2 == 0) {
                    long count = counts.get(num1);
                    if (count >= 2) {
                        finalPairCount += count * (count - 1) / 2;
                    }
                }
            } else {
                // 異なる値のペア: {num1, num2}
                if (counts.containsKey(num2)) {
                    // num1 と num2 の組み合わせ
                    finalPairCount += counts.get(num1) * counts.get(num2);
                }
            }
        }


        System.out.println("pairs=" + finalPairCount);
    }
}
