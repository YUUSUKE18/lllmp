import java.util.Scanner;
import java.util.Set;
import java.util.HashSet;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            // カンマで分割し、トリムして個々の文字列を取得
            String[] parts = line.split(",");

            Set<Integer> uniqueNumbers = new HashSet<>();
            long sum = 0;

            for (String part : parts) {
                // 前後の空白を無視して整数として解釈できるか試みる
                try {
                    // 空文字や空白のみの文字列はNumberFormatExceptionを発生させる可能性があるため、
                    // trim()して空でないことを確認してからparseする。
                    String trimmedPart = part.trim();
                    if (!trimmedPart.isEmpty()) {
                        int number = Integer.parseInt(trimmedPart);
                        uniqueNumbers.add(number);
                        sum += number;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                    continue;
                }
            }

            // 個数と合計を出力
            System.out.println("count=" + uniqueNumbers.size() + " sum=" + sum);
        }
        scanner.close();
    }
}
