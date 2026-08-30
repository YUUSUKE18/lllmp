import java.util.Scanner;
import java.util.Set;
import java.util.HashSet;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            // 入力が空の場合は何もせず終了
            return;
        }

        String line = scanner.nextLine();
        
        // カンマで分割し、各要素を整数として処理する
        String[] parts = line.split(",");

        // 重複を除いた整数を格納するための Set
        Set<Integer> uniqueNumbers = new HashSet<>();
        long sum = 0;

        for (String part : parts) {
            // 前後の空白を無視して、整数として解釈できるか試みる
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

        // 個数と合計を出力する
        System.out.println("count=" + uniqueNumbers.size() + " sum=" + sum);
    }
}
