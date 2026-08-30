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

        // 2行目以降の読み込みとフィルタリング
        while (scanner.hasNextLong()) {
            long number = scanner.nextLong();
            numbers.add(number);
        }
        scanner.close();

        // 整数として解釈できない行の無視、空行の無視は Scanner の nextLong() の動作で概ねカバーされますが、
        // ここでは読み込んだ数値をリストに格納した後の処理を行います。
        
        int count = 0;
        int n = numbers.size();

        // 2個の組 (i, j) で numbers[i] + numbers[j] = target となるものの数を数える
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
