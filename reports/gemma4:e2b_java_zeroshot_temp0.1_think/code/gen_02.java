import java.util.HashSet;
import java.util.Scanner;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 標準入力から一行読み込む
        if (!scanner.hasNextLine()) {
            // 入力が空の場合は何も出力しない
            return;
        }
        String line = scanner.nextLine();
        scanner.close();

        // カンマで分割して整数を抽出する
        // 空要素や前後の空白を無視するため、split(",")を使用し、各要素を個別に処理する
        String[] tokens = line.split(",");

        Set<Integer> uniqueNumbers = new HashSet<>();
        
        for (String token : tokens) {
            // 前後の空白を削除
            String trimmedToken = token.trim();
            
            if (trimmedToken.isEmpty()) {
                continue; // 空のトークンは無視
            }

            try {
                // 整数として解析を試みる
                int number = Integer.parseInt(trimmedToken);
                uniqueNumbers.add(number);
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

        // 結果を標準出力に出力する
        System.out.println("count=" + count + " sum=" + sum);
    }
}
