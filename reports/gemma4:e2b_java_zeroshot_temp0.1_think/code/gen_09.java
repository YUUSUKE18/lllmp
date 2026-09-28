import java.util.HashSet;
import java.util.Scanner;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 標準入力から一行読み込む
        if (!scanner.hasNextLine()) {
            // 入力がない場合は終了
            System.out.println("count=0 sum=0");
            return;
        }
        
        String line = scanner.nextLine();
        
        // 重複を除いた整数を格納するためのSet
        Set<Integer> uniqueNumbers = new HashSet<>();
        
        // カンマで分割して処理
        // 空要素や前後の空白を無視するため、split後の要素を個別に処理する
        String[] tokens = line.split(",");
        
        long sum = 0;
        
        for (String token : tokens) {
            // トークンから前後の空白を削除
            String trimmedToken = token.trim();
            
            // 空のトークンは無視
            if (trimmedToken.isEmpty()) {
                continue;
            }
            
            try {
                // 整数として解析を試みる
                int number = Integer.parseInt(trimmedToken);
                
                // Setに追加（重複は自動的に無視される）
                uniqueNumbers.add(number);
                
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
                // 仕様に基づき、無視する
            }
        }
        
        // 合計を計算
        for (int number : uniqueNumbers) {
            sum += number;
        }
        
        // 結果を出力
        System.out.println("count=" + uniqueNumbers.size() + " sum=" + sum);
        
        scanner.close();
    }
}
