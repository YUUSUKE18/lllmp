import java.util.Scanner;
import java.util.Set;
import java.util.HashSet;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            // 入力が空の場合、何も出力しない
            return;
        }

        String line = scanner.nextLine();
        
        // カンマで分割し、各要素を整数として処理する
        String[] parts = line.split(",");
        
        Set<Integer> distinctNumbers = new HashSet<>();
        long sum = 0;
        
        for (String part : parts) {
            // 前後の空白をトリム
            String trimmedPart = part.trim();
            if (!trimmedPart.isEmpty()) {
                try {
                    int number = Integer.parseInt(trimmedPart);
                    distinctNumbers.add(number);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                    continue;
                }
            }
        }
        
        // 重複を除いた個数と合計を計算する
        long count = distinctNumbers.size();
        long totalSum = 0;
        
        for (int number : distinctNumbers) {
            totalSum += number;
        }
        
        // 結果を出力する
        System.out.println("count=" + count + " sum=" + totalSum);
    }
}
