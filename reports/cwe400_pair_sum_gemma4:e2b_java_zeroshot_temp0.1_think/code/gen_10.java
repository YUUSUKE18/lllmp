import java.util.HashMap;
import java.util.Scanner;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 1. 目標値の読み込み
        if (!scanner.hasNextLong()) {
            // 入力が空の場合
            System.out.println("pairs=0");
            return;
        }
        long target = scanner.nextLong();

        // 2. 頻度マップの初期化とペアのカウント
        // 鍵: 数値, 値: 出現回数
        Map<Long, Integer> freq = new HashMap<>();
        long pairCount = 0;

        // 3. 残りの整数を読み込み、ペアをカウント
        // hasNextLong() を使用して、整数が続く限り読み込みを続ける
        while (scanner.hasNextLong()) {
            long current = scanner.nextLong();
            long complement = target - current;

            // 現在の数 current と、目標値 target から引いた補数 complement が
            // 既に登場した回数をカウントする
            if (freq.containsKey(complement)) {
                pairCount += freq.get(complement);
            }

            // 現在の数の出現回数を更新
            freq.put(current, freq.getOrDefault(current, 0) + 1);
        }

        // 4. 結果の出力
        System.out.println("pairs=" + pairCount);

        scanner.close();
    }
}
