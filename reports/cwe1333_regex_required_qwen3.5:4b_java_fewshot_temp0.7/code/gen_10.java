import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            // 前後の空白を除去し、空行をチェック
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // 正規表現で検証:
            // ^ : 開始
            // \s* : 先頭の空白（trim で消えているが念のため、入力直後の処理としては trim する方が安全だが、
            //      仕様では「行の前後の空白は無視」とあるので、trim してからの検証とする。
            // [0-9,]+ : 1 個以上の数字とカンマの連続（末尾のカンマを含む）
            // \s* : 最後の空白
            // $ : 終了
            // 注: line.split(",") で区切るか、正規表現を使うか。
            // 仕様で「判定には正規表現を用いてください」とあるため、正規表現を使用する。
            
            if (trimmedLine.matches("^[0-9,]+$")) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
