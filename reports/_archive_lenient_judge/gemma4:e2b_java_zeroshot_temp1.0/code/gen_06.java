import java.util.Arrays;
import java.util.HashSet;
import java.util.Scanner;
import java.util.Set;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            // 入力がない場合は終了
            return;
        }

        String line = scanner.nextLine();
        
        // カンマで分割し、各要素を整数として処理する
        String[] parts = line.split(",");
        
        long count = 0;
        long sum = 0;
        Set<Long> uniqueNumbers = new HashSet<>();

        for (String part : parts) {
            // 前後の空白を削除
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                // 整数として解釈を試みる
                long number = Long.parseLong(trimmedPart);
                uniqueNumbers.add(number);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 重複を除いた整数について個数と合計を計算する
        count = uniqueNumbers.size();
        for (long num : uniqueNumbers) {
            sum += num;
        }

        // 結果を出力する
        System.out.println("count=" + count + " sum=" + sum);
    }
}
