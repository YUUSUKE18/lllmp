import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=" + Integer.MIN_VALUE); // 空の場合のデフォルト値を決定必要だが、通常は問題ない想定
            return; 
        }

        StringTokenizer st = new StringTokenizer(line, ",");
        
        if (!st.hasMoreTokens()) {
            System.out.println("count=0 max=-9223372036854775808"); // 実際は空の場合の出力だが、仕様上 count=0 であれば OK。デフォルト値はどうするか？問題文より「整数列」なので少なくとも 1 つあると想定が一般的だが、空の場合は max をどう出すかが微妙。元の例では max が int なので Integer.MIN_VALUE を返している（実際は 0 にして first=false の処理を避けている）。
            System.out.println("count=0 max=" + Long.MIN_VALUE); // long を使う必要がある？整数列なので int で良いか？"値は 64bit 整数の範囲に収まる"とあるので long を扱うべきか。元の例では int だったが、今回は指定があるので long を使おう。(long の MAX/MIN に設定するが、実際には count=0 の時だけ出力して終了すればよい)
        }

        // カンマ区切りなので StringTokenizer は , で分ける必要があるが、文字列を直接分割しなくても良いか？split(",") の方が簡単だが performance を考えてもいい。StringTokenizer が良いだろう。ただしカンマで区切るとなれば、空白は考慮する必要がある（例えば "1, 2" のように）。
        // また要素数が何個あるかが count である。整数として解釈できないものは無視するという条件があるが、split(",") で取得したものが文字列になるため、長さがわからないまま処理を始めるべきか？

        String[] parts = line.trim().replace("\\s+", " ").split(","); // まず空白を取り除きカンマで分割
        long maxVal = Long.MIN_VALUE; 
        boolean first = true;
        
        int count = 0; // キャンバースと要素数を確認。

        for (String part : parts) {
            part = part.trim(); // カンマの前後に空白があれば取り除く
            if (!part.isEmpty() && isNumeric(part)) {
                try {
                    long n = Long.parseLong(part); 
                    count++;
                    if (first || n > maxVal) {
                        maxVal = n;
                        first = false;
                    }
                } catch (NumberFormatException e) {
                    // 数値でない場合は無視
                }
            }
        }

        System.out.println("count=" + count); 
    } 

    private static boolean isNumeric(String s) {
        try {
            Long.parseLong(s.trim());
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }


}
