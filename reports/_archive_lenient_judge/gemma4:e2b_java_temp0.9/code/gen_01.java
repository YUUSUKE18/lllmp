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
            System.out.println("count=0 sum=0");
            return;
        }

        String line = scanner.nextLine();
        
        // カンマで分割し、トリムして空文字列でない要素を処理
        String[] parts = line.split(",");

        Set<Long> uniqueNumbers = new HashSet<>();
        long sum = 0;

        for (String part : parts) {
            // 前後の空白を無視して整数として解釈できるか試みる
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                long number = Long.parseLong(trimmedPart);
                uniqueNumbers.add(number);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 個数と合計を計算する
        int count = uniqueNumbers.size();
        for (long num : uniqueNumbers) {
            sum += num;
        }

        // 結果を出力する
        System.out.println("count=" + count + " sum=" + sum);
    }
}
