import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long max = Long.MIN_VALUE;

        if (line != null) {
            String[] parts = line.split(",");
            for (String part : parts) {
                try {
                    // 空白を除去して整数に変換
                    String trimmedPart = part.trim();
                    if (!trimmedPart.isEmpty()) {
                        long n = Long.parseLong(trimmedPart);
                        count++;
                        if (n > max) {
                            max = n;
                        }
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
        }

        // もし数値が一つもなかった場合、maxの初期値（Long.MIN_VALUE）が出力される。
        // この仕様では「空要素・前後の空白は無視し...」とあるため、有効な整数が0個の場合、count=0, max=?となる。
        // 整数が1つ以上あれば正しく計算される。ここではmaxの初期値設定で対応する。
        if (count == 0) {
            // 要素がない場合は最大値をどうするか？問題文に従い、もし要素がないなら max は意味を持たないが、
            // 計算結果として count=0, max=最小値となる。ここでは入力された値に基づき計算を続行する。
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
