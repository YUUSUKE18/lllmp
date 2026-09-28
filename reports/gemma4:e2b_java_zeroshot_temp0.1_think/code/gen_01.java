import java.util.Scanner;
import java.util.Set;
import java.util.HashSet;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 標準入力から一行全体を読み込む
        if (!scanner.hasNextLine()) {
            // 入力が空の場合は終了
            System.out.println("count=0 sum=0");
            return;
        }
        
        String line = scanner.nextLine();
        
        // カンマで分割し、各要素を処理する
        // 空白やカンマの後のスペースも考慮するため、split(",")を使用し、各要素をトリムする
        String[] tokens = line.split(",");
        
        Set<Integer> uniqueNumbers = new HashSet<>();
        
        for (String token : tokens) {
            // 前後の空白を削除
            String trimmedToken = token.trim();
            
            if (trimmedToken.isEmpty()) {
                // 空要素は無視
                continue;
            }
            
            try {
                // 整数としてパースを試みる
                int number = Integer.parseInt(trimmedToken);
                uniqueNumbers.add(number);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
                continue;
            }
        }
        
        // 個数と合計を計算する
        long count = uniqueNumbers.size();
        long sum = 0;
        
        for (int number : uniqueNumbers) {
            sum += number;
        }
        
        // 結果を標準出力に出力
        System.out.println("count=" + count + " sum=" + sum);
        
        scanner.close();
    }
}
