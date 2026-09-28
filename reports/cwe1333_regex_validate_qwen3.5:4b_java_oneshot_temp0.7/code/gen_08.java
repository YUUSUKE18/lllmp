import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            String trimmed = line.trim();
            
            // 空行は妥当ではない
            if (trimmed.isEmpty()) {
                continue;
            }
            
            boolean isValid = false;
            StringBuilder sb = new StringBuilder();
            int start = 0;
            int end = trimmed.length();
            
            // 数字とカンマ以外が含まれていないか確認するために、文字列を分解して処理
            // 前後の空白は trim() で既に消しているので、内部に他の文字がないかチェック
            
            // 単純化のため：trim() 後の文字列が "数字[カンマ数字]*" という形か判定
            // 正規表現を使用するか、手動で解析する
                
            // 手動解析:
            // 1. まず最初の数字の位置を見つける (start)
            // 2. キャンマと数字が交互に続くかチェック
            // 3. 最後に数字があるか確認 (末尾カンマは OK)
            
            if (!trimmed.isEmpty()) {
                int i = 0;
                boolean hasNumber = false;
                
                while (i < trimmed.length()) {
                    char c = trimmed.charAt(i);
                    
                    if (Character.isDigit(c)) {
                        hasNumber = true;
                        // 数字が続く場合、それらを進める
                        int j = i;
                        while (j < trimmed.length() && Character.isDigit(trimmed.charAt(j))) {
                            j++;
                        }
                        i = j;
                    } else if (c == ',') {
                        // キャンマが来たら、次の数字があるかチェック (ただし末尾カンマ OK)
                        // 直前に数字があったことを保証する必要がある
                        // あるいは、単純に "カンマ" の前後に数字があるか厳密チェック
                        // 仕様: "1 個以上の数字列がカンマで区切られて並んでいる"
                        // 末尾カンマは OK なので、カンマの次が文字列終端でも OK
                        // しかし、カンマの前には必ず数字がある必要がある (数字列との定義から)
                        
                        // より厳密なロジック:
                        // 有効なパターン: "1,2" or "1," or "1,2," etc.
                        // 無効なパターン: ",2", "1," (ここは OK), "a", "1,a", "1,,2"
                        
                        // キャンマの前が数字だったか確認する必要がある
                        // しかし、上記のループで i が数字からジャンプしているため、i は常に文字列開始または数字直後
                        // キャンマが来たら、その前に数字があったことを保証するには、i が数字の位置にあるかを確認
                        // しかし、単純に "カンマ" 自体が有効なトークンではないので、前後をチェック
                        
                        // より安全なアプローチ: 正規表現を使うか、状態機で解析
                        // 状態機:
                        // STATE_NUM: 数字を読んでいる
                        // STATE_COMMA: キャンマを読んでいる (数字列の終了)
                        // 有効なのは STATE_NUM -> STATE_COMMA -> STATE_NUM ... -> STATE_COMMA (最終的に数字列が少なくとも 1 つある)
                        
                        // i は現在の文字位置。c == ',' のとき:
                        // このカンマは、前回の数字読み取りで到達した位置から来たはず
                        // しかし、i は数字の次に来ているので、i < j となるはず (j は数字の最後の位置)
                        // キャンマが c であるなら、j が i に戻る必要があるか？
                        
                        // 簡易ロジック: trim 後の文字列が ^[0-9]+(?:,[0-9]+)*,?$ で一致するかチェック
                        // Java には Regex があるから使おう。ただし問題文では "言語・形式" に特定のリミットはないので標準ライブラリ OK
                        if (!isValid) {
                            try {
                                java.util.regex.Pattern p = java.util.regex.Pattern.compile("^[0-9]+(?:,[0-9]+)*,?$");
                                if (p.matcher(trimmed).matches()) {
                                    validCount++;
                                    isValid = true;
                                } else {
                                    // 無効な行だが、空行以外は処理済みなので continue
                                    continue; 
                                }
                            } catch (Exception e) {
                                // 正規化エラーの可能性
                            }
                        } else {
                            // すでに validCount を増やした場合でも、ループを続ける必要はないが、
                            // ここでは構造上 continue しているためそのまま。
                            break; 
                        }
                    } else {
                        // 数字もカンマでもない文字がある -> 無効
                        isValid = false;
                        break;
                    }
                }
                
                if (!isValid) {
                    // 無効行だが、空行以外なのでそのまま放置 (validCount に含めない)
                    continue;
                }
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
