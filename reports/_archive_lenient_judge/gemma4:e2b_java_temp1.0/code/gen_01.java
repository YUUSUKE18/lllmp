import java.util.Scanner;
import java.util.Set;
import java.util.HashSet;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            // 入力が空の場合は終了
            System.out.println("count=0 sum=0");
            return;
        }

        String line = scanner.nextLine();
        
        // カンマで分割し、各要素を処理する
        String[] parts = line.split(",");

        Set<Integer> uniqueNumbers = new HashSet<>();
        long sum = 0;

        for (String part : parts) {
            // 前後の空白を無視して整数として解釈できるか試みる
            try {
                // トリムして空文字列でないことを確認
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    int number = Integer.parseInt(trimmedPart);
                    uniqueNumbers.add(number);
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない場合は無視する
                continue;
            }
        }

        // 重複を除いた個数と合計を計算する
        long count = uniqueNumbers.size();
        for (int num : uniqueNumbers) {
            sum += num;
        }

        // 結果を出力する
        System.out.println("count=" + count + " sum=" + sum);
    }
}
