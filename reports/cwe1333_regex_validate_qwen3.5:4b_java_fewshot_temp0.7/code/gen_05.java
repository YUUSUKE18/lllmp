import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        int validCount = 0;
        
        while ((line = br.readLine()) != null) {
            line = line.trim();
            
            if (line.isEmpty()) {
                continue;
            }
            
            // カンマ区切りで整数列になっているかチェック
            // 1. まずカンマがない場合、それが空白文字のみなら無視（例: "   " は trim で空になる）、数字があるなら OK
            // ただし仕様は「1 個以上の数字列がカンマで区切られて並んでいること」とあるので、
            // "123" -> OK, "123," -> OK, ",123" -> NG (最初のカンマは許容されていないため), " , 123 " -> NG
            
            // トークン化して検証
            StringTokenizer st = new StringTokenizer(line, ",");
            boolean possible = true;
            
            while (st.hasMoreTokens()) {
                String token = st.nextToken().trim();
                
                // ターミネータの直前の空白などが含まれるかもしれないので、
                // 各トークンが「数字のみ」であるか確認する必要がある。
                // ただし、カンマ区切りの場合、トークン同士のカンマ自体はスキップされるわけではないが、
                // StringTokenizer は指定文字列で分割するので、", " の場合は空白がつく可能性あり。
                // 仕様：'1, 2, 3' は NG と解釈すべきか？
                // 「数字とカンマ以外を含む行は妥当ではありません」とあるので、
                // '1, 2, 3' -> '1', ' 2', ' 3' のトークンになる。' 2' は文字列として空白を含むので NG。
                // しかし、通常のカンマ区切りでは「数字とカンマ」のみが許容されるため、
                // トークンが「数字のみ（空白なし）」である必要がある。
                
                if (!token.matches("\\d+")) {
                    possible = false;
                    break;
                }
            }
            
            // 少なくとも 1 つのトークンがあるか確認（カンマしかない空行など除外）
            // StringTokenizer は空文字列を返さないが、"," を分割すると 2 トークンになる。
            // "1,2" -> ["1", "2"] (OK)
            // "," -> ["", ""] (NG)
            // "" -> [] (OK - 上記の空行チェックで除外済み)
            
            if (!st.hasMoreTokens()) {
                continue; // 空白のみやカンマしかない場合（"," は empty string が生成されるが matches で NG にされる）
                        // しかし、もし "1,2" のように正しい場合は hasMoreTokens が真。
                        // ",," の場合、トークンは空文字列になる。matches("\\d+") で NG。
            } else {
                validCount++;
            }
            
            if (possible) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
