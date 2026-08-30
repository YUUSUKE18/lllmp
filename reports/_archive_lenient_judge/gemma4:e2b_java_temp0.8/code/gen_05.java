import java.util.Arrays;
import java.util.HashSet;
import java.util.Scanner;
import java.util.Set;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }

        String line = scanner.nextLine();
        
        // カンマで分割し、各要素を整数として処理
        String[] tokens = line.split(",");
        
        Set<Integer> uniqueNumbers = new HashSet<>();
        long sum = 0;

        for (String token : tokens) {
            try {
                // 前後の空白を無視して整数に変換
                int number = Integer.parseInt(token.trim());
                uniqueNumbers.add(number);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
                continue;
            }
        }

        // 重複を除いた整数の個数と合計を計算
        int count = uniqueNumbers.size();
        for (int number : uniqueNumbers) {
            sum += number;
        }

        // 結果を出力
        System.out.println("count=" + count + " sum=" + sum);
        
        scanner.close();
    }
}
