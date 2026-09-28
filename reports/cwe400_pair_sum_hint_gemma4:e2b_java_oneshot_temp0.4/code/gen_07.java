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
            // 目標値が不正な場合は処理を終了（問題の制約上、通常は発生しない想定）
            System.out.println("pairs=0");
            return;
        }

        List<Long> numbers = new ArrayList<>();
        
        // 2行目以降の読み込み
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue; // 空行は無視
            }
            try {
                long num = Long.parseLong(trimmedLine);
                numbers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        int count = 0;
        int n = numbers.size();

        // 2個の組の数を数える (O(N^2) または O(N log N) で解く)
        // ここでは、2つの要素 a と b が a + b = target となるペアの数を数える。
        // 2つの要素の位置が異なる必要がある。
        
        // 2つの要素 a[i] と a[j] (i != j) について a[i] + a[j] = target となる組を数える。
        // 2つの要素が同じ値を持つ場合、その値が target/2 に等しい場合に、その値の出現回数から組み合わせを計算する。
        
        // 頻度マップを作成する (O(N))
        java.util.HashMap<Long, Integer> frequency = new java.util.HashMap<>();
        for (long num : numbers) {
            frequency.put(num, frequency.getOrDefault(num, 0) + 1);
        }

        // ペアの数を数える (O(N) または O(Unique_N))
        for (long num1 : frequency.keySet()) {
            long num2 = target - num1;

            if (frequency.containsKey(num2)) {
                if (num1 < num2) {
                    // num1 と num2 が異なる場合 (i != j が保証される)
                    // num1 の出現回数 * num2 の出現回数 がペアの数になる
                    count += frequency.get(num1) * frequency.get(num2);
                } else if (num1 == num2) {
                    // num1 == num2 の場合 (2 * num1 = target)
                    // 同じ値の要素が複数存在する場合、組み合わせの数は nC2 = n * (n - 1) / 2
                    int freq = frequency.get(num1);
                    if (freq >= 2) {
                        count += (long) freq * (freq - 1) / 2;
                    }
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
