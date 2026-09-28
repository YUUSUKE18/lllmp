import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String firstLine = sc.nextLine();
            int countInput = 0;
            try {
                if (firstLine.trim().isEmpty() || !Integer.TryParse(firstLine, null)) {
                    // 最初の行が整数でない場合はcount=0
                    System.out.println("count=" + 0 + " sum=0");
                    return;
                } else {
                    countInput = Integer.parseInt(firstLine);
                }
            } catch (Exception e) {
                countInput = 0;
            }
        }
        
        int actualCount = 0;
        long sum = 0L;
        
        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            if (line.trim().isEmpty()) {
                continue;
            }
            
            try {
                // 行をパースし、整数の数を数える
                int tokenCount = 0;
                long currentTokenSum = 0L;
                
                // 空文字列や空白のみが含まれる行
                if (line.matches("\\s*")) {
                    continue; 
                }
                
                String[] tokens = line.trim().split("\\s+");
                for (String token : tokens) {
                    try {
                        long val = Long.parseLong(token);
                        currentTokenSum += val;
                        tokenCount++;
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない場合、そのトークンは無視する
                        continue;
                    }
                }
                
                // 実際に見つかった個数を合計し、合計値も合計する必要があるか？
                // 仕様: "実際に読み取れた整数だけを対象とします"
                // これは単一の整数の連続列ではなく、各行独立として解釈すべきか？
                // または全体の整数列として？
                // 通常此类问题是按行处理整数，并将所有找到的整数相加。
                // "実際に存在する整数の個数" と "合計" を指すので、全てをまとめて計算します。
                
                if (tokenCount > actualCount) {
                    actualCount = tokenCount;
                }
                
            } catch (Exception e) {
                // 行全体が処理できない場合は無視？
                // ここでは各トークンごと解析しており、エラー分のみ無視される。
            }
        }
        
        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
