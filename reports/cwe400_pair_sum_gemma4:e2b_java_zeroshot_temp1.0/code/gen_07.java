import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 1行目を目標値として読み込む
        if (!scanner.hasNextLong()) {
            return;
        }
        long target = scanner.nextLong();

        List<Long> numbers = new ArrayList<>();

        // 2行目以降を読み込む
        while (scanner.hasNextLong()) {
            long num = scanner.nextLong();
            numbers.add(num);
        }

        // 足して目標値になる2個の組の数を数える
        long count = 0;
        int n = numbers.size();

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    count++;
                }
            }
        }

        // 結果を出力
        System.out.println("pairs=" + count);
    }
}
