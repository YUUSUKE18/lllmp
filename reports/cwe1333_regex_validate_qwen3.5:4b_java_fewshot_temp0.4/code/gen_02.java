import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

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

            // カンマ区切りの整数列として判定する
            // 1. 数字とカンマ以外が含まれていないか確認
            // 2. 末尾のカンマは許容されるが、それ以外の文字は禁止
            
            boolean isValid = true;
            
            // 空白を区切り文字として使用し、各要素をチェック
            StringTokenizer st = new StringTokenizer(trimmedLine);
            
            while (st.hasMoreTokens()) {
                String token = st.nextToken();
                
                // トークンに数字が含まれていないか（カンマ以外が混在している場合）
                // 数字とカンマ以外を含む行は妥当ではないため、トークン内部に非数字が含まれていたら NG
                for (int i = 0; i < token.length(); i++) {
                    char c = token.charAt(i);
                    if (!Character.isDigit(c) && c != ',') {
                        isValid = false;
                        break;
                    }
                }
                
                // さらに、トークンが単にカンマのみの場合（例：",," の要素）は数字がないので NG
                // あるいは、最初のトークンがカンマの場合も NG（数字列がないため）
                if (token.isEmpty() || token.equals(",")) {
                    isValid = false;
                    break;
                }
                
                // トークンにカンマが含まれている場合、それは区切り文字として扱われるべきだが
                // StringTokenizer はデフォルトで空白を区切りとするため、",1,2" は "1,2" と ",1" のように分割されず
                // 正確には、ユーザー入力が "1,2" の場合はトークンが "1,2" になる。
                // しかし、仕様は「数字列がカンマで区切られて並んでいる」とある。
                // つまり、"1,2" は OK、",1,2" は NG（最初の要素が数字ではない）、"1,," は NG（最後の要素が空またはカンマのみ）
                
                // より厳密に：文字列をカンマで分割し、各部分を確認する方が安全。
            }
            
            // 上記のロジックを再考: StringTokenizer は空白区切りなので "1,2" はそのままトークンになる。
            // そのトークンをさらに処理する必要がある。
            // 仕様: 「数字列がカンマで区切られて並んでいる」
            // 例: "1,2", "1,2,", "1,3,4" -> OK
            //      ",1", "1,,2", "a,b" -> NG
            
            // 再実装: 文字列をカンマで分割し、各要素が「数字のみの文字列」か確認する。
            String[] parts = trimmedLine.split(",");
            
            for (String part : parts) {
                if (part.isEmpty()) {
                    isValid = false; // 空の要素がある（例: "1,,2" の中間のカンマ）
                    break;
                }
                // 数字のみか確認 (カンマは許容されない、すでに分割済みなので内部にカンマはないはずだが、安全のため)
                for (int i = 0; i < part.length(); i++) {
                    if (!Character.isDigit(part.charAt(i))) {
                        isValid = false;
                        break;
                    }
                }
                if (!isValid) break;
            }
            
            // さらに、最初の要素が数字でない場合も NG (例: ",1,2")
            // 上記のループで part が空または非数字なら catch されるが、",1" の場合は parts[0] は "" になる。
            // しかし "1," の場合は parts[0]="1", parts[1]="" -> isValid=false で OK.
            
            if (isValid) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
