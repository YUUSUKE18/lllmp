import java.util.Arrays;
import java.util.HashSet;
import java.util.Scanner;
import java.util.Set;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            // 入力が空の場合は終了
            return;
        }

        String line = scanner.nextLine();
        
        // カンマで分割し、各要素を整数に変換しようと試みる
        String[] parts = line.split(",");

        Set<Long> uniqueNumbers = new HashSet<>();
        long sum = 0;

        for (String part : parts) {
            // 前後の空白を除去
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                // Long型として解釈を試みる（64bit範囲を考慮）
                long number = Long.parseLong(trimmedPart);
                uniqueNumbers.add(number);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 重複を除いた個数と合計を計算
        long count = uniqueNumbers.size();
        for (long num : uniqueNumbers) {
            sum += num;
        }

        // 結果を出力
        System.out.println("count=" + count + " sum=" + sum);
    }
}
