import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        
        while (true) {
            String line = br.readLine();
            if (line == null) break;
            
            // 空白区切りで文字列を分割（前後の空白を除去しつつ）
            line = line.trim();
            String[] parts = line.split(",");
            
            boolean valid = true;
            int currentPartIndex = -1;
            
            // 有効な数字が見つかるまで、またはすべてが空であることを探す
            while (currentPartIndex >= 0) {
                String part = parts[currentPartIndex];
                
                if (part.isEmpty()) {
                    currentPartIndex++;
                    continue;
                }
                
                // カンマ区切りなので、次は次の部分を探す必要があるか、最後の要素なのかを確認する
                // しかし、split によって trailing empty strings が削除されているはずだが、念のため
                // 実際にカンマが存在するかを考慮して、数字と非数字が混在しているかを確認
                
                if (part.matches("-?[0-9]+")) {
                    currentPartIndex++;
                    continue;
                }
                
                valid = false;
                break;
            }
            
            // 上記のロジックは少し直近で再考が必要。もっとシンプルに:
            // カンマ区切りの要素がすべて空か数字のみであること。
            // または、空白を無視して、数字とカンマ以外が含まれていないこと。
            
            valid = true;
            // 再度リセット
            currentPartIndex = -1;
            
            // パーティの数を取得し、すべてが空または数であるかを確認
            for (String part : parts) {
                if (!part.isEmpty() && !part.matches("-?[0-9]+")) {
                    valid = false;
                    break;
                }
            }
            
            // 特殊ケース: 空白のみが入っている行は妥当ではないと指定されている。
            // trim() で空なら、数字がないので妥当ではないはずだが、 split(".*") を使うのが正確な方法か？
            // spec: "1 個以上の数字列がカンマで区切られて並んでいる" -> empty は無効、空白のみも無効。
            // しかし、split(",") で空配列になる場合どうするか？spec says "末尾のカンマは許容します", 
            // "1 個以上の数字列"が存在すること。
            
            // より堅牢なアプローチ:
            valid = true;
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                valid = false;
            } else {
                // 空白のみも含まれる場合は無効とする（ spec: "数字とカンマ以外を含む行は妥当ではありません"）
                // つまり、[0-9,\-, ] のみが許されるか？あるいは文字レベルのチェック。
                // spec: "1 個以上の数字列がカンマで区切られて並んでいる"
                // なので、要素が空白のみで構成されている場合も無効とする。
                
                boolean hasNonEmpty = false;
                int partCount = 0;
                
                // カンマ分割をより厳密に制御するか？split(",", "") は trailing empty string を保持しないはずか？
                // Java の split: "a,,b" -> ["a", "", "b"]
                // "," -> ["", ""] 
                // "" -> [""]? いや、"" であれば [""] になるはずだが。
                
                // spec に従い: "1 個以上の数字列"が存在し、他の文字・空白（空行を除く？）が許容されるか？
                // spec: "空行...は妥当ではありません" -> valid=false
                // "数字とカンマ以外を含む行は無効" -> valid=false
                
                if (trimmedLine.isEmpty()) {
                    valid = false;
                } else {
                    String[] rawParts = trimmedLine.split(",");
                    for (String part : rawParts) {
                        if (!part.isEmpty()) {
                            // 空白が混在する可能性があるか？split で " 1,2" -> ["", "1", "2"] が起きないはず。
                            // ただし、前後の空白は trim 済みなので問題ない。
                            // しかし、内部の空白がある場合: " 1" は trim 済だが、 " 1, " -> split -> ["", "", "1", ""]? いや、split は leading に空を伴わないが trailing にいると空になる。
                            // spec: "空白区切りで数字列が並ぶ"ではなく"カンマ区切り".
                            // spec: "行の前後の空白は無視します". -> つまり、trim 済み。
                            // さらに"数字とカンマ以外を含む行は妥当ではありません"
                            // なので、各要素に空白が含まれるか確認する必要がある。
                            
                            if (part.matches("\\s+")) {
                                // 空白のみが要素になっている場合？例えば ", ,," 
                                // split(",") -> ["", "", ""]?
                                // spec: "1 個以上の数字列"が存在しないので無効。
                                valid = false;
                                break;
                            }
                        }
                        partCount++;
                    }
                    
                    // さらに、各要素が単一の数字のみであるか確認する必要がある（小数点なし）。
                    // regex: -?[0-9]+
                    for (String part : rawParts) {
                        if (part.matches("-?[0-9]+")) continue;
                        valid = false;
                        break;
                    }
                }
            }

            // 再確認: spec says "1 個以上の数字列がカンマで区切られて並んでいる".
            // 空行は無効。空白のみが要素なら無効（数字がない）。数字とカンマ以外が含まれるなら無効。
            
            if (valid) validCount++;
        }
        
        System.out.println("valid=" + validCount);
    }
}
