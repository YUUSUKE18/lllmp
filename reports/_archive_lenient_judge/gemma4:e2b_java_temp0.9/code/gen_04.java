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

        // カンマで分割し、各要素を処理する
        String[] parts = line.split(",");

        Set<Integer> uniqueNumbers = new HashSet<>();
        long sum = 0;

        for (String part : parts) {
            // 前後の空白を除去して整数に変換を試みる
            try {
                // trim() で前後の空白を除去
                String trimmedPart = part.trim();
                if (trimmedPart.isEmpty()) {
                    continue; // 空の文字列は無視
                }

                int number = Integer.parseInt(trimmedPart);
                uniqueNumbers.add(number);
                sum += number;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
                continue;
            }
        }

        // 重複を除いた個数と合計を出力
        System.out.println("count=" + uniqueNumbers.size() + " sum=" + sum);
    }
}
