import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {

    public static void main(String[] args) {
        // 妥当な行数をカウントする
        int validCount = 0;

        // 標準入力から読み込む
        try (BufferedReader br = new BufferedReader(new InputStreamReader(System.in))) {
            String line;
            
            // 各行を読み込み、検証する
            while ((line = br.readLine()) != null) {
                // 行の前後の空白を無視する
                String trimmedLine = line.trim();

                // 1. 空行の判定
                if (trimmedLine.isEmpty()) {
                    continue;
                }

                // 2. 正規表現による妥当性の判定
                // 妥当な行の定義: 1個以上の数字列がカンマで区切られて並んでいること。
                // 許容される文字: 数字(\d)、カンマ(,)、空白(\s)。
                // 構造: 数字とカンマが混在し、少なくとも1つの数字が存在する。
                
                // パターン解説:
                // ^                  : 行の開始
                // [\d\s,]*           : 0個以上の数字、空白、カンマの組み合わせ
                // (?=\d)             : 後読みアサーション。少なくとも1つの数字が後に続くことを要求する。
                // [\d,]*             : 0個以上の数字、カンマの組み合わせ
                // $                  : 行の終了
                
                // よりシンプルかつ厳密に、行全体が数字とカンマのみで構成され、かつ数字が含まれていることを確認する。
                // この正規表現は、行がカンマ区切りの整数列（空白を含む）で構成されていることを確認します。
                // 1. 行全体が数字、カンマ、空白のみで構成されていること。
                // 2. 少なくとも1つの数字が含まれていること。
                
                // 厳密な検証のため、行をトリムしてからパターンを適用します。
                // パターン: 少なくとも1つの数字(\d)が含まれ、それ以外の文字（カンマ、空白）のみで構成されている。
                String validationPattern = "^[\d,]*\\s*\\d[\d,]*$";
                
                // 注意: 上記のパターンは、行全体が数字とカンマのみで構成されていることを保証しません。
                // 以下のパターンは、行がカンマ区切りの整数列（空白を含む）で構成されていることを確認します。
                // 1. 少なくとも1つの数字が含まれていること。
                // 2. その他の文字はカンマ、数字、空白のみであること。
                
                // 妥当な行の判定には、行を分割して各要素が整数であるかを確認する方がより確実ですが、
                // 仕様に従い正規表現のみを使用します。
                
                // 妥当な行の判定のための正規表現（行全体がカンマ区切りの整数列であること）
                // 1. 少なくとも1つの数字が含まれていること。
                // 2. カンマと数字、空白のみで構成されていること。
                
                // 妥当な行の判定を、行を分割して各要素が整数であるか確認するロジックに置き換えます。
                // 正規表現のみでこの複雑な構造を完全にカバーするのは困難なため、ここでは行を分割して検証します。
                
                // 仕様の要求「判定には正規表現を用いてください」を厳守するため、
                // 妥当な行の定義を「カンマで区切られた要素がすべて整数であること」と解釈し、
                // 以下の正規表現で、行がカンマ区切りの整数列の形式を満たしているかを検証します。
                
                // 妥当な行のパターン: 
                // 少なくとも1つの数字が、カンマと空白で区切られている。
                // 例: 1,2,3 または 1, 2, 3
                String fullValidationPattern = "^[\\s]*(\\d+([\\s,]*\\d+)*)[\\s]*$";
                
                // このパターンは、行が数字とカンマ、空白のみで構成され、少なくとも1つの数字を含むことを確認します。
                // ただし、末尾のカンマが許容されるため、行末のカンマを考慮する必要があります。
                
                // 最終的な判定ロジックとして、行を分割し、各要素が整数であるかを確認するロジックを正規表現で代替します。
                // 以下のパターンは、行がカンマ区切りの整数列（空白を含む）で構成されていることを確認します。
                // 末尾のカンマを許容するため、行末にカンマが続くことを許容します。
                String finalRegex = "^[\\s]*(\\d+[\\s,]*)+[\\s]*$";


                if (Pattern.compile(finalRegex).matcher(line).matches()) {
                    // 厳密な検証のため、行を分割して各要素が整数であることを確認する（正規表現の限界を補う）
                    String[] parts = line.split(",");
                    boolean allAreIntegers = true;
                    
                    for (String part : parts) {
                        String trimmedPart = part.trim();
                        if (trimmedPart.isEmpty()) {
                            // 空の要素は許容される（例: 1,,2 の中間）
                            continue;
                        }
                        try {
                            // 数字としてパースを試みる
                            Integer.parseInt(trimmedPart);
                        } catch (NumberFormatException e) {
                            // 数字以外の要素が含まれていた場合、妥当ではない
                            allAreIntegers = false;
                            break;
                        }
                    }
                    
                    // 正規表現が形式をチェックし、分割後の要素が整数であることを確認した
                    if (allAreIntegers) {
                        validCount++;
                    }
                }
            }
        } catch (Exception e) {
            // 入力処理中にエラーが発生した場合
            // System.err.println("Error reading input: " + e.getMessage());
        }

        // 結果を出力
        System.out.println("valid=" + validCount);
    }
}
