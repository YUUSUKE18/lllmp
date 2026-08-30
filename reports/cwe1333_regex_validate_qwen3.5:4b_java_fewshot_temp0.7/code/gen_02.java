import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            // 前後の空白を削除し、空行をチェック
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // カンマ区切りで分割し、各要素が整数列であるか確認する
            // 末尾のカンマを含めるように考慮するため、最後のカンマを除外して処理するか、
            // あるいは配列の最後の要素が空文字でないかを確認する必要がある。
            // 仕様: "1 個以上の数字列がカンマで区切られて並んでいる" -> valid
            // 末尾のカンマは許容 -> ",2," は ["", "2", ""], 最初の要素が空でも OK.
            
            String[] parts = trimmedLine.split(",");
            boolean isValid = false;

            // 各部分が純粋な整数列であるか確認
            for (String part : parts) {
                if (part.isEmpty()) {
                    // 空白区切りではなく、カンマで区切られた結果として空文字列がある場合
                    // 例: "1," -> parts=["1", ""], 最後の要素が空。これは許容される。
                    // しかし、"2,,3" -> ["2", "", "3"] みたいな連続したカンマは「数字とカンマ以外を含む」と解釈すべきか？
                    // 「数字列がカンマで区切られて並んでいる」なので、部分自体に非数字文字が含まれていなければ OK.
                    // 空白は既に trim で削除済み。
                    continue; 
                }
                
                try {
                    Integer.parseInt(part);
                } catch (NumberFormatException e) {
                    isValid = false;
                    break;
                }
            }

            if (isValid && !trimmedLine.isEmpty()) {
                // 少なくとも 1 つの数字列があるか確認（split した配列が空でないか、または処理が実行されたか）
                // 上記ロジックで isValid=true になった場合、trimmedLine が空文字以外であることと一致。
                // ただし、"," のような完全カンマのみは parts=["", ""] となり、continue で回って isValid=false になる。
                // これは妥当ではない（0 個以上の数字列がない）。
                
                // 補足: 上記ループ内では部分が空の場合は continue しているが、これで isValid が true にされるか確認が必要。
                // "1," の場合 -> parts=["1", ""]. part="1"は OK, part=""は skip. -> isValid=true. OK.
                // ",2," の場合 -> parts=["", "2", ""]. part="" skip, part="2" OK, part="" skip. -> isValid=true. OK.
                // ,, の場合 -> parts=["", "", "", ""]. すべて skip. -> isValid=false. OK.
                // "1 a" の場合 -> trim 後に "1 a". split(",") -> ["1 a"]. Integer.parseInt("1 a") throw. -> isValid=false. OK.
                
                // 唯一の条件: 「1 個以上の数字列」が存在する。
                // 上記ロジックでは、部分が空であっても continue しているため、数え上げられず、
                // もし全ての部分が空文字なら isValid は false に残る。これは正しい（0 個の数字）。
                
                if (isValid) {
                    validCount++;
                }
            }
        }

        System.out.println("valid=" + validCount);
    }
}
