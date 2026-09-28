import java.util.Scanner;
import java.util.Set;
import java.util.HashSet;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            // 入力が空の場合は何もしない
            return;
        }

        String line = scanner.nextLine();
        
        // カンマで分割し、各要素を試行的に整数に変換してセットに追加する
        Set<Integer> uniqueNumbers = new HashSet<>();
        
        // カンマで分割
        String[] parts = line.split(",");
        
        for (String part : parts) {
            // 前後の空白を削除
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }
            
            try {
                int number = Integer.parseInt(trimmedPart);
                uniqueNumbers.add(number);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 個数と合計を計算
        long count = uniqueNumbers.size();
        long sum = 0;

        for (int number : uniqueNumbers) {
            sum += number;
        }

        // 結果を出力
        System.out.println("count=" + count + " sum=" + sum);
        
        scanner.close();
    }
}
