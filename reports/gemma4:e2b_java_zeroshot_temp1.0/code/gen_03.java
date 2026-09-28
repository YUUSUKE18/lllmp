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
        
        // カンマで分割し、各要素を整数としてフィルタリングしてSetに格納する
        Set<Integer> uniqueNumbers = new HashSet<>();
        
        String[] parts = line.split(",");
        for (String part : parts) {
            try {
                // 前後の空白はstripで処理し、整数に変換する
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    int number = Integer.parseInt(trimmedPart);
                    uniqueNumbers.add(number);
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
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
    }
}
