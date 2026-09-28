import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 1行目: 目標値
        if (!scanner.hasNextLong()) {
            scanner.close();
            return;
        }
        long target = scanner.nextLong();

        List<Long> numbers = new ArrayList<>();
        
        // 2行目以降の入力を読み込む
        while (scanner.hasNextLong()) {
            long num = scanner.nextLong();
            numbers.add(num);
        }

        int n = numbers.size();
        long pairCount = 0;

        // 2個の組 (i, j) で numbers[i] + numbers[j] == target を満たすものの数を数える
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    pairCount++;
                }
            }
        }

        // 結果を出力
        System.out.println("pairs=" + pairCount);

        scanner.close();
    }
}
