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
            if (trimmed.isEmpty()) {
                continue;
            }
            
            // 空行はスキップしたが、本来の仕様では「空行」は妥当ではないとあるが、
            // 入力として空行を受け付けた場合は処理しない（有効カウントしない）とする。
            // しかし、問題文「空行...は妥当ではありません」とあるので、
            // 空行があったとしても validCount を増やさない。
            // ただし、標準入力の形式として空行が存在しても OK と見做し、
            // その行が「数字とカンマ以外を含む」かチェックする必要がある。
            
            boolean isCorrect = true;
            int commaCount = 0;
            int numberCount = 0;
            boolean hasNonDigitComma = false;
            
            for (int i = 0; i < trimmed.length(); i++) {
                char c = trimmed.charAt(i);
                if (c == ',') {
                    commaCount++;
                } else if (!Character.isDigit(c)) {
                    // 数字でもカンマでもない文字（空白含むが trim で除去済み）がある場合
                    hasNonDigitComma = true;
                    isCorrect = false;
                    break;
                }
            }
            
            // 条件: 1 個以上の数字列がカンマで区切られていること
            // つまり、カンマの数 >= 0 であれば数値が存在する可能性があるが、
            // ここでは「数字とカンマ以外を含む行は妥当ではありません」を基準とする。
            // さらに「1 個以上の数字列」とあるので、少なくとも 1 つの数字がある必要がある。
            // しかし、上のループで hasNonDigitComma=false の場合、数字のみまたは数字＋カンマのみ。
            // その場合、trimmed が空でない限り（先程 trim で空チェック済み）は、
            // 少なくとも 1 つの数字が含まれているはず。なぜなら「数字とカンマ以外」がないので、
            // キーボード入力が文字として存在しないため、数字しかない。
            
            if (isCorrect && trimmed.length() > 0) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
