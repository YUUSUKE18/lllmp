import java.util.Scanner;
import java.util.Set;
import java.util.HashSet;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            System.out.println("count=0 sum=0");
            return;
        }

        String line = scanner.nextLine();
        
        // カンマで分割し、各要素を整数としてフィルタリングしてセットに格納する
        Set<Integer> uniqueNumbers = new HashSet<>();
        
        // カンマで区切られた文字列を処理
        String[] parts = line.split(",");
        
        for (String part : parts) {
            // 前後の空白を除去
            String trimmedPart = part.trim();
            if (!trimmedPart.isEmpty()) {
                try {
                    int number = Integer.parseInt(trimmedPart);
                    uniqueNumbers.add(number);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
        }

        // 個数と合計を計算する
        long count = uniqueNumbers.size();
        long sum = 0;
        for (int number : uniqueNumbers) {
            sum += number;
        }

        // 結果を出力する
        System.out.println("count=" + count + " sum=" + sum);
        
        scanner.close();
    }
}
