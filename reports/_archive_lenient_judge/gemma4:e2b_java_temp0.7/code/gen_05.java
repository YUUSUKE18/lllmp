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
        
        // カンマで分割し、各要素を整数に変換しようと試みる
        String[] parts = line.split(",");
        
        Set<Integer> uniqueNumbers = new HashSet<>();
        long sum = 0;

        for (String part : parts) {
            // 前後の空白を除去して整数に変換を試みる
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }
            
            try {
                int number = Integer.parseInt(trimmedPart);
                uniqueNumbers.add(number);
                sum += number;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 個数と合計を計算して出力
        System.out.println("count=" + uniqueNumbers.size() + " sum=" + sum);
    }
}
