import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        if (!scanner.hasNextLine()) {
            return;
        }
        
        String line = scanner.nextLine();
        
        long totalElements = 0;
        long totalSum = 0;
        
        // カンマで区切って各ペアを処理
        String[] pairs = line.split(",");
        
        for (String pair : pairs) {
            // 前後の空白を無視
            String trimmedPair = pair.trim();
            if (trimmedPair.isEmpty()) {
                continue;
            }
            
            // コロンで分割
            String[] parts = trimmedPair.split(":");
            
            // 値:回数の形式で2つの要素があるか確認
            if (parts.length == 2) {
                try {
                    // 値と回数をlong型としてパース
                    long value = Long.parseLong(parts[0].trim());
                    long count = Long.parseLong(parts[1].trim());
                    
                    // 要素数と合計を計算
                    totalElements += count;
                    totalSum += value * count;
                    
                } catch (NumberFormatException e) {
                    // パースエラーが発生した場合は無視
                    continue;
                }
            }
        }
        
        // 結果を出力
        System.out.println("count=" + totalElements + " sum=" + totalSum);
        
        scanner.close();
    }
}
