import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 標準入力から一行読み込む
        if (!scanner.hasNextLine()) {
            // 入力がない場合は終了
            return;
        }
        String line = scanner.nextLine();
        
        // カンマで分割してトークンを取得
        // StringTokenizerを使うことで、空白やカンマの処理を効率的に行う
        StringTokenizer st = new StringTokenizer(line, ",");
        
        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        // トークンを一つずつ処理
        while (st.hasMoreTokens()) {
            String token = st.nextToken().trim();
            
            if (token.isEmpty()) {
                // 空要素は無視
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
                // 整数として解釈できない要素は無視
                continue;
            }
        }

        // 統計情報が見つかった場合のみ出力
        if (foundNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        }
        // 入力が空または無効な要素のみだった場合、何も出力しない（仕様上、要素が存在しない場合は出力しないのが自然）
    }
}
