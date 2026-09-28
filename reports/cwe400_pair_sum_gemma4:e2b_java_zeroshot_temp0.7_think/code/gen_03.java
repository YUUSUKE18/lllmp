import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 1. 標準入力の 1 行目：目標値 T を読み込む
        if (!scanner.hasNextLong()) {
            // 入力が空の場合
            System.out.println("pairs=0");
            return;
        }
        long target = scanner.nextLong();

        // 2. 2行目以降の整数を読み込み、出現頻度を記録する
        Map<Long, Long> frequencyMap = new HashMap<>();
        
        // 読み込み中に、残りの入力が整数であるか確認し、整数でない行を無視する
        while (scanner.hasNextLong()) {
            long number = scanner.nextLong();
            // 64bit整数として扱われるため、Long型を使用
            frequencyMap.put(number, frequencyMap.getOrDefault(number, 0L) + 1);
        }

        // 3. ペアの個数を計算する
        long pairCount = 0;

        // 頻度マップのキー（数値）を走査する
        for (Map.Entry<Long, Long> entry : frequencyMap.entrySet()) {
            long x = entry.getKey();
            long countX = entry.getValue();
            long y = target - x;

            // ターゲット値 T が偶数で、x = y の場合 (x + x = T)
            if (x == y) {
                // x の出現回数が k の場合、組の数は k * (k - 1) / 2
                if (countX >= 2) {
                    pairCount += countX * (countX - 1) / 2;
                }
            } 
            // x != y の場合 (x + y = T)
            else if (x < y) {
                // x と y のペアを数える。x < y とすることで、(x, y) と (y, x) の重複を避ける
                if (frequencyMap.containsKey(y)) {
                    long countY = frequencyMap.get(y);
                    // x の出現回数 * y の出現回数
                    pairCount += countX * countY;
                }
            }
        }

        // 4. 結果を出力
        System.out.println("pairs=" + pairCount);
        
        scanner.close();
    }
}
