import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE);
            return;
        }

        StringTokenizer st = new StringTokenizer(line, ",");
        long count = 0;
        boolean first = true;
        long maxValue = Long.MIN_VALUE; // デフォルト値は最小値。ただし、空のリストの場合どうするか？仕様上「整数列」とあるので少なくとも1つあると想定しつつも、入力がない場合はcount=0, max=?とするか。例題ではmax=0だったから、今回はmin_valueを初期化し、最初の要素で更新するロジックにする。
        
        // 修正: 空のリストの場合の挙動について。
        // 問題文「整数列を受け取ります」→ 少なくとも1つあると想定されるが、安全のために処理する。
        // max の初期値は Long.MIN_VALUE にし、最初の要素で更新するようにする。
        
        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            try {
                long val = Long.parseLong(token);
                count++;
                
                if (first) {
                    maxValue = val;
                    first = false;
                } else {
                    if (val > maxValue) {
                        maxValue = val;
                    }
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する（ただし、トークンが空でない限り解析エラーになる可能性あり。StringTokenizer は空白区切りではないので、文字列自体のチェックが必要か？）
                // StringTokenizer(token, ",") で取得した token が数式なら Long.parseLong に失敗する可能性がある (例: "abc"). その場合は無視.
            }
        }

        System.out.println("count=" + count + " max=" + maxValue);
    }
}
