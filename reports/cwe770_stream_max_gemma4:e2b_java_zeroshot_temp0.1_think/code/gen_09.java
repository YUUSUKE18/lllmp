import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 標準入力から一行全体を読み込む
        if (!scanner.hasNextLine()) {
            // 入力が空の場合は終了
            System.out.println("count=0 max=0");
            return;
        }
        
        String line = scanner.nextLine();
        
        // カンマで分割してトークンを取得
        // StringTokenizerを使うことで、空白やカンマの処理をより柔軟に行う
        StringTokenizer st = new StringTokenizer(line, ",");
        
        long count = 0;
        // 最大値を初期化。負の数も考慮するため、非常に小さな値で初期化する。
        // ただし、入力が一つもない場合は、最大値の出力が意味を持たないため、
        // 0または適切なデフォルト値で処理する。ここでは、入力された値が存在する場合のみ最大値を更新する。
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        while (st.hasMoreTokens()) {
            String token = st.nextToken().trim();
            
            if (token.isEmpty()) {
                // 空のトークンは無視
                continue;
            }
            
            try {
                // 整数として解析を試みる
                long value = Long.parseLong(token);
                
                // 有効な整数としてカウントと最大値を更新
                count++;
                if (value > maxValue) {
                    maxValue = value;
                }
                foundNumber = true;
                
            } catch (NumberFormatException e) {
                // 整数として解釈できない場合は無視
                continue;
            }
        }

        // 処理結果を出力
        if (foundNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            // 有効な整数が一つもなかった場合
            System.out.println("count=0 max=0");
        }
        
        scanner.close();
    }
}
