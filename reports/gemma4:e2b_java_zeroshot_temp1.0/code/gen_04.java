import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        java.util.Scanner scanner = new java.util.Scanner(System.in);
        if (!scanner.hasNextLine()) {
            System.out.println("count=0 sum=0");
            return;
        }

        String line = scanner.nextLine();
        // カンマで分割し、前後の空白を考慮して整数に変換を試みる
        String[] parts = line.split(",");

        // 重複を除いた整数を格納するためのセット
        Set<Integer> uniqueNumbers = new java.util.HashSet<>();

        for (String part : parts) {
            // 前後の空白を除去
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }

            try {
                // 整数としてパースを試みる
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
    }
}
