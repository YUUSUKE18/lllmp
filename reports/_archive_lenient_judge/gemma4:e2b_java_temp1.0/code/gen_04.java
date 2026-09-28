import java.util.Arrays;
import java.util.HashSet;
import java.util.Scanner;
import java.util.Set;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            System.out.println("count=0 sum=0");
            return;
        }

        String line = scanner.nextLine();
        
        // カンマで分割し、各要素を整数として処理
        String[] parts = line.split(",");
        
        Set<Integer> uniqueNumbers = new HashSet<>();
        long sum = 0;

        for (String part : parts) {
            try {
                // 前後の空白を除去してから整数に変換
                String trimmedPart = part.trim();
                if (trimmedPart.isEmpty()) {
                    continue;
                }
                int number = Integer.parseInt(trimmedPart);
                uniqueNumbers.add(number);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 重複を除いた数の個数と合計を計算
        long count = uniqueNumbers.size();
        for (int num : uniqueNumbers) {
            sum += num;
        }

        // 結果を出力
        System.out.println("count=" + count + " sum=" + sum);
    }
}
