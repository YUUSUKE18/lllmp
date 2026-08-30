import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            // 正規表現:
            // - ^ : 始点
            // - \s* : 空白の任意数（前後を無視）
            // - (\d+,)+|\d+ : カンマ区切りの整数列（1 個以上）。
            //   (-\d+(,\d+)*)? (負数を許容) | \d+ (正数のみの簡易版)。
            // 仕様より"数字列"とあるので負号付き整数も含むと安全です。
            // しかし、例2の文脈や一般的な「整数」というときは -1, 2 なども可と想定します。
            // さらに末尾のカンマ許容を含めるためパターンを調整します。
            // (\d+(,\d+)*|\d+,*) の拡張。
            // 最も堅牢な表現: ^\s*(\d+(,\d+)*)?(\,)?$\s*$
            // これは：空白開始 -> 正の整数列（カンマで連結）が0回以上出現 -> 最後にオプションのカンマ -> 空白終了 -> 空終了
            
            if (line.trim().isEmpty()) {
                continue; // 空行は妥当ではないと仕様にあるので、数を増やさない処理。ただし問題文「1個以上の数字列」とあり、「空行...妥当ではありません」なのでカウントしない。
            }

            boolean isValid = line.trim().matches("(\\s*(\\d+(,\\d+)*)?,?)\\s*$"); 
            // 上記の regular expression は少し複雑なので、より直接的なロジックで書き換えるか、
            // \s*([\d,]+) の形式でもよさそうだが「数字とカンマ以外を含んでいないこと」を厳密にする。
            // 「数字とカンマ以外を含む行は妥当ではありません」=> 文字は全て '0'-'9' または ',' でよい。
            // 1 個以上の数字列 => [\d]+ (最低 1 数字)。
            // 正規表現: ^[\s,\d]*([0-9][\d,]*)$ ? -> いや、先頭に空白も良いので \s* ([0-9][0-9,]*) \s*
            // しかし末尾のカンマ許容 => [0-9,]+ の連続ではなく、[0-9] が存在する必要がある。
            // 条件：行の文字が全て '0'-'9',',' で構成され、かつ '数字' の数が1以上である。
            
            boolean allNumAndComma = true;
            String trimmed = line.trim();
            for (char c : trimmed.toCharArray()) {
                if (!Character.isDigit(c) && c != ',') {
                    allNumAndComma = false;
                    break;
                }
            }
            
            // 1個以上の数字列が存在するかどうか
            boolean hasNumber = false;
            for (int i = 0; i < trimmed.length(); i++) {
                if (Character.isDigit(trimmed.charAt(i))) {
                    hasNumber = true;
                    break;
                }
            }

            if (allNumAndComma && hasNumber) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
