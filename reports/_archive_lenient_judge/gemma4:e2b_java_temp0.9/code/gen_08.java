import java.util.Scanner;
import java.util.Set;
import java.util.HashSet;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            System.out.println("count=0 sum=0");
            return;
        }

        String line = scanner.nextLine();
        String[] parts = line.split(",");

        Set<Integer> uniqueNumbers = new HashSet<>();
        long sum = 0;

        for (String part : parts) {
            // 空要素や前後の空白を無視し、整数として解釈できない要素も無視する
            if (!part.trim().isEmpty()) {
                try {
                    int number = Integer.parseInt(part.trim());
                    uniqueNumbers.add(number);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            }
        }

        // 重複を除いた数の個数と合計を計算
        int count = uniqueNumbers.size();
        for (int num : uniqueNumbers) {
            sum += num;
        }

        // 結果を出力
        System.out.println("count=" + count + " sum=" + sum);
    }
}
