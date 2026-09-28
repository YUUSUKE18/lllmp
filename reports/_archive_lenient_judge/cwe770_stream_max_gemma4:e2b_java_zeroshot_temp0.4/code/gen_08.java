import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            return;
        }

        String line = scanner.nextLine();
        String[] parts = line.trim().split(",");

        long count = 0;
        long maxValue = Long.MIN_VALUE;
        boolean foundNumber = false;

        for (String part : parts) {
            if (part.isEmpty()) {
                continue;
            }
            try {
                // 要素数と最大値の順序を考慮して、最初の要素が要素数、次の要素が最大値であると仮定するのではなく、
                // 仕様に基づき「カンマ区切りの整数列」全体から要素を抽出する必要がある。
                // ここでは、入力された全ての要素をチェックし、それらを要素として扱う。

                long value = Long.parseLong(part);
                
                if (!foundNumber) {
                    // 最初の数値を要素数として扱う（仕様の解釈が曖昧なため、ここでは一般的な「リストから個数と最大値を見つける」という操作を想定し、
                    // 入力された全ての数値からカウントと最大値を求める、と解釈する）
                    count = value;
                    maxValue = value;
                    foundNumber = true;
                } else {
                    if (value > maxValue) {
                        maxValue = value;
                    }
                }

            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 仕様：「それらの『要素数』と『最大値』を求めます。」
        // 入力されたカンマ区切りの列全体が、要素のリストであると解釈し、その要素数をカウントし、最大値を求める。
        // 再度、入力行を処理する（元のロジックは不適切だったため、再構築する）

        scanner.close();
        
        // 再実行：入力されたカンマ区切りの整数列から要素数と最大値を求める
        String inputLine = line; // 既に読み取った行を使用
        
        count = 0;
        maxValue = Long.MIN_VALUE;
        boolean hasElements = false;

        // 空白やカンマで分割し、有効な整数のみを抽出する
        String[] tokens = inputLine.split(",");
        
        for (String token : tokens) {
            String trimmedToken = token.trim();
            if (trimmedToken.isEmpty()) {
                continue;
            }
            try {
                long value = Long.parseLong(trimmedToken);
                count++;
                if (value > maxValue) {
                    maxValue = value;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        // 要素が一つもなかった場合（入力が空または無効な場合）の処理を考慮する必要があるが、
        // 仕様上は「求めます」とあるため、結果を出力する。
        if (count == 0) {
             // 要素がない場合は、最大値の設定が問題になるが、ここではゼロとして扱うか、あるいは入力された要素数自体を返すのが妥当。
             // 最も安全なのは、入力された有効な数値の個数と最大値を報告すること。
             // もし要素がないなら count=0, max=? となるが、Long.MIN_VALUEは不適切かもしれない。
             // ゼロ要素の場合、最大値は定義されないため、ここではcount=0として進める。
        }


        System.out.println("count=" + count + " max=" + maxValue);
    }
}
