import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            if (isValidLine(line)) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }

    private static boolean isValidLine(String line) {
        String trimmed = line.trim();
        if (trimmed.isEmpty()) {
            return false;
        }

        // 正規表現で「空白（または開始）から数字、カンマで区切られた文字列をすべて含み、空白（または終了）まで」と判定
        // データ部: [数]+[,][数]+ の配列。前後の空白は許容されるため、Trimしてから分割し、要素が空でないかチェックするのが直感的だが、
        // 仕様「数字とカンマ以外を含む行は妥当ではありません」を厳密に守るため、正規表現を使うのが確実。
        // パターン: ^\s*(\d+)\s*,\s*($|\d+)  -> これは必ず終わりに数値があることを要求しすぎるかもしれない。
        // より適切なのは：^[\s]*([0-9]+)[,][\s]*$ ではなく、全文字が数字とカンマのみであること + 少なくとも一つあること。
        
        // 方法1: 分割した結果、全て空でない要素があるか、または末尾カンマだけで始まる場合は有効だが、単なるカンマだけでは数字がないので無効。
        // 「1 個以上の数字列がカンマで区切られて並んでいる」=> 分割時に少なくとも 1 つの数字が含まれること。
        
        String[] parts = trimmed.split(",");
        for (String part : parts) {
            if (!part.matches("\\d+")) {
                return false; // 数字以外の文字が含まれている場合
            }
        }
        
        return true; // 全てが数字のみなら有効（空行は trim で除外済み、末尾カンマ含む場合は split で空配列は出ないか? 
                      // "1,2," -> split(",") は ["1", "2", ""] を出力する可能性あり。部分が""なら matches("\\d+") false になるため無効。
                      // 仕様「末尾のカンマは許容します」=> 例: "5," が OK. 分割結果 ["5", ""] の場合、"" が matches("\\\\d+") -> false => return false. これはダメ。
                      
          // 修正: split(",") で空文字列が生成される場合は無効とするべきか？
          // 仕様：『カンマ区切りの整数列』として妥当かどうか。末尾のカンマは許容します。
          // "5," -> 数字列は "5" が 1 個ある。末尾のカンマがあるから OK.
          // split(",") は java 実装依存で、 trailing delimiter を含む場合は空文字を含む場合としない場合がありますが、trim("1,2,") は "1","2","".
          // 仕様を正確に捉えるため:
          // 行の内容は { leadingSpaces } [ 数字列 [, 空白 ]* 数字列 ] { trailingSpaces } という形式。
          // あるいは単純に：行全体（trim 後）が、少なくとも 1 つの整数から成り立っており、余白以外に他文字はないこと。
          
        // もう一度考え直す:
        // "1,2," -> OK.
        // "1,2" -> OK.
        // "1" -> OK.
        // ",," -> NG (数字がない)
        // " 1 , 2 " -> OK
        // "a,1" -> NG
        
        // 実装: trim 後、全ての文字が '0'-'9' または ',' であれば OK。かつ長さ > 0 でなければ OK.
        
        if (!trimmed.isEmpty()) {
            for (int i = 0; i < trimmed.length(); i++) {
                char c = trimmed.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    return false;
                }
            }
            // まだ、'1,,' のような場合? "1,,2" -> OK. "1," -> OK.
            // 上記のチェックだけで OK だとすると "1,,," も OK. これは「1 個以上の数字列」を満たす。
            // 問題点: 「数字とカンマ以外を含む行」は NG.
            // しかし、「1,,」は数字列が一つだけ（"1"）で、それ以外の空白なしの文字はない。OK.
            // さらに「空行」は無視する（または NG? 仕様「空行...は妥当ではありません」とある。しかし出力時は count+0 なので自然に OK）。
            
            return true;
        }
        
        return false;
    }
}
