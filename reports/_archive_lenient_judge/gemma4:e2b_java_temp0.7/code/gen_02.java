import java.util.Arrays;
import java.util.HashSet;
import java.util.Scanner;
import java.util.Set;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            // カンマで分割し、各要素を整数に変換しようとする
            String[] parts = line.split(",");

            // 重複を除いた整数を格納するセット
            Set<Integer> uniqueNumbers = new HashSet<>();
            long sum = 0;

            for (String part : parts) {
                // 前後の空白を削除
                String trimmedPart = part.trim();
                if (trimmedPart.isEmpty()) {
                    continue;
                }

                try {
                    // 整数として解釈を試みる
                    int number = Integer.parseInt(trimmedPart);
                    uniqueNumbers.add(number);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                    continue;
                }
            }

            // 重複を除いた整数の個数を計算
            int count = uniqueNumbers.size();

            // 合計を計算
            for (int num : uniqueNumbers) {
                sum += num;
            }

            // 結果を出力
            System.out.println("count=" + count + " sum=" + sum);
        }
        scanner.close();
    }
}
