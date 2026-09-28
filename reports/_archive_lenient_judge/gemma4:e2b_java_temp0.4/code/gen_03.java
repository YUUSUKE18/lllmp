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
        
        // カンマで分割し、各要素を整数に変換しようと試みる
        String[] parts = line.split(",");
        
        Set<Integer> uniqueNumbers = new HashSet<>();
        long sum = 0;
        int count = 0;

        for (String part : parts) {
            // 前後の空白を除去
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

        // 重複を除いた要素の個数と合計を計算する
        count = uniqueNumbers.size();
        for (int num : uniqueNumbers) {
            sum += num;
        }

        // 結果を出力する
        System.out.println("count=" + count + " sum=" + sum);
    }
}
