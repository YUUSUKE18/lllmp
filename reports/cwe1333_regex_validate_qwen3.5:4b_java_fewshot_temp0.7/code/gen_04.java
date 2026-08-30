import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        while ((line = br.readLine()) != null) {
            boolean isValid = true;
            // 前後の空白を切り取る (文字列操作は可能だが、念のため trim を通す)
            line = line.trim();
            
            if (line.isEmpty()) {
                isValid = false;
            } else {
                // 数字とカンマ以外が含まれていないかチェックするために、
                // まず有効なパターン（数字のカンマ連結）に一致するか正規表現で確認する。
                // 要件: "1 個以上の数字列がカンマで区切られて並んでいる" + "末尾のカンマ許容"
                // 正規表現: ^(?:\d+(?:,\d+)*)+$ は "0,1,2," のような末尾カンマは許さない（$ で終わる必要がある）。
                // 要件再確認: "末尾のカンマは許容します" -> "1,2," が OK.
                // なので、"(?:(\d+),?)+,?\d*" のような複雑なものがいいが、
                // シンプルに考えよう。
                // 妥当な形: "1", "1,2", "1,2,", "1,2,,3" (連続カンマは数値列ではないので NG か？)
                // 問題文: "数字列がカンマで区切られて並んでいる" -> 通常は連続カンマは NG.
                // "末尾のカンマは許容します" -> ",1,2," は OK? それとも "1,2," のみ?
                // 例として解釈: "1", "1,2", "1,2,", "2," (単独の数字 + 末尾カンマ), "1,2,3"
                // "空行、および数字とカンマ以外を含む行は妥当ではありません" -> '.' や 'a' が含まれて NG.
                
                // 正規表現で厳密にチェック:
                // ^(?:\d+(?:,\d+)*)+$ は "1," を許さない。
                // ^(\d+(?:,\d+)*)(?:,)?$ は "1," を許容するが、"1,,2" は NG.
                // 要件に基づき: 
                // 1. 空白なし (trim で済む)
                // 2. 数字とカンマのみ。
                // 3. 何らかの数字が存在し、カンマで区切られる形式。
                // "1,2," は OK. "1,,2" は NG (空の数字列がないため). "1 2" は NG.
                
                if (!line.matches("^\\d+(?:,\\d+)*(?:,)?$")) {
                    isValid = false;
                }
            }
            
            if (isValid) {
                validCount++;
            }
        }
        System.out.println("valid=" + validCount);
    }
}
