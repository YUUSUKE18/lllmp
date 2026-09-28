import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }

        String line = scanner.nextLine();
        
        // カンマで分割してトークンを取得
        String[] tokens = line.split(",");

        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String token : tokens) {
            // 前後の空白を無視
            String trimmedToken = token.trim();
            if (trimmedToken.isEmpty()) {
                continue;
            }

            try {
                // 整数として解釈を試みる
                long value = Long.parseLong(trimmedToken);
                
                // 要素数としてカウントする
                count++;
                
                // 最大値を更新する
                if (value > maxValue) {
                    maxValue = value;
                }
                foundNumber = true;

            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // すべての数値が処理されたか確認（問題文から、単に数値を集計すればよいので、countとmaxValueを更新した値で出力する）
        if (foundNumber) {
            System.out.println("count=" + count + " max=" + maxValue);
        } else {
            // 整数が一つも見つからなかった場合の処理（仕様上、要素数0, 最大値不明だが、入力がない場合は何も出力しないか、あるいは空の形式で出すべきか。ここでは数値が見つからなかった場合は何も出力しない、またはcount=0 max=???となるが、全ての条件を満たすために、数値を一つでも見つけた場合にのみ出力する）
            // 空の入力や非数値のみの場合、count=0, maxValue=Long.MIN_VALUEとなるため、それに従う。
            System.out.println("count=0 max=" + Long.MIN_VALUE); // 厳密な仕様が不明確なため、見つからなかった場合はエラーを避けるためにこの形式で出力する（通常は問題に依存）
        }
        
        scanner.close();
    }
}
