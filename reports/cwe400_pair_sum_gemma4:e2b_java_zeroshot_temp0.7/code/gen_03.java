import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 1行目: 目標値の読み込み
        if (!scanner.hasNextLong()) {
            scanner.close();
            return;
        }
        long target = scanner.nextLong();

        List<Long> numbers = new ArrayList<>();

        // 2行目以降の数の読み込み
        while (scanner.hasNextLong()) {
            long num = scanner.nextLong();
            numbers.add(num);
        }

        scanner.close();

        int count = 0;
        int n = numbers.size();

        // 足して目標値になる2個の組の数を求める
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    count++;
                }
            }
        }

        // 結果の出力
        System.out.println("pairs=" + count);
    }
}
