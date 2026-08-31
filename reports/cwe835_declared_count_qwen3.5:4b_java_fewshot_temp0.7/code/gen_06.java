import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1 行目を読み取って整数の個数 n を取得（ただし、実際にはこの値を使わず、実際に読み込まれた数を数えるため）
        String firstLine = br.readLine();
        if (firstLine == null) {
            System.out.println("count=0 sum=0");
            return;
        }

        long count = 0;
        long sum = 0;
        
        // 残りの行を全て読み込む
        String line;
        while ((line = br.readLine()) != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) {
                try {
                    String token = st.nextToken();
                    long val = Long.parseLong(token);
                    count++;
                    sum += val;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視（仕様: 整数として解釈できない行も無視）
                    // ここではトークンが文字列として存在するだけで、数値解析に失敗した場合はそのトークンをスキップする処理とする。
                    // ただし、問題文の「整数として解釈できない行も無視」は、行全体を非整数と判断するか、トークン単位で処理するか曖昧だが、
                    // StringTokenizer で分けた後数値解析が fail するケース（例："abc"）をスキップするのが一般的。
                    // または、行ごとチェック（int.parseLong(line) が throw するか）も可能だが、複数整数がある場合の柔軟性からトークン単位の処理を採用。
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
