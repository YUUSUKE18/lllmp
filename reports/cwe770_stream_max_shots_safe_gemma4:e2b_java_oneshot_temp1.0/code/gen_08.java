import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        StringTokenizer st = new StringTokenizer(line);
        long count = 0;
        long maxVal = Long.MIN_VALUE;
        boolean foundNumber = false;

        while (st.hasMoreTokens()) {
            try {
                // カンマ区切りの整数を読み込むため、トークンを処理する。
                // 仕様は「カンマ区切り」なので、ここではカンマで分割するのではなく、
                // トークンとして読み取れたものを数値として扱う。
                String token = st.nextToken();
                long num = Long.parseLong(token);

                count++;
                if (num > maxVal) {
                    maxVal = num;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
				// この問題の入力形式が「カンマ区切りの整数列」であるため、
                // StringTokenizerで分割された各トークンを試行的に数値変換するのが適切。
                // ただし、もし入力が "1,2,a,3" のような形式の場合、st.nextToken()は "1", "2", "a", "3" を返す。
                // 'a' は NumberFormatException を発生させるため、これを無視する。
			}
        }

        if (!foundNumber) {
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + maxVal);
        }
    }
}
