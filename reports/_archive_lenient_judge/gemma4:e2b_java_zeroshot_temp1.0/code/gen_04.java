import java.util.Scanner;
import java.util.Set;
import java.util.HashSet;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            // カンマで分割し、各要素を処理する
            String[] parts = line.split(",");

            // 重複を除いた整数を格納するためのセット
            Set<Integer> uniqueNumbers = new HashSet<>();
            long sum = 0;

            for (String part : parts) {
                // 前後の空白を除去
                String trimmedPart = part.trim();
                if (trimmedPart.isEmpty()) {
                    continue; // 空要素は無視
                }

                try {
                    // 整数に変換を試みる
                    int number = Integer.parseInt(trimmedPart);
                    uniqueNumbers.add(number);
                    sum += number;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                    continue;
                }
            }

            // 個数と合計を出力
            System.out.println("count=" + uniqueNumbers.size() + " sum=" + sum);
        }
        scanner.close();
    }
}
