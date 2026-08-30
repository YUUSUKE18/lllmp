import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;

        String line;
        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視
            String trimmedLine = line.trim();
            
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマを考慮して分割
            // 末尾のカンマがあっても、数字の列が存在すれば妥当とする
            // 例えば "1,2," は "1", "2" という少なくとも2つの数字列を持つ
            
            // 末尾のカンマを削除してから分割する
            String processedLine = trimmedLine;
            if (processedLine.endsWith(",")) {
                processedLine = processedLine.substring(0, processedLine.length() - 1);
            }

            // カンマで分割
            String[] parts = processedLine.split(",");
            
            // 妥当性の判定: 1個以上の数字列がカンマで区切られて並んでいること。
            // これは、分割された要素が空でないこと（つまり、数字列が存在すること）を意味する。
            // ただし、元の行が "1," のような場合は、split(",")の結果が {"1"} となり、要素数は1。
            // 空行チェックは既に実施済み。
            
            // 妥当なのは、分割された要素の中に数字列が含まれている場合。
            // ここでの「妥当」の定義は、「1個以上の数字列がカンマで区切られている」ため、
            // 少なくとも1つ以上の要素が生成され、それらが数字で構成されている必要がある。
            // 仕様の曖昧さを解消するため、今回は「カンマで区切られた要素が一つ以上存在する」ことを主な基準とする。
            // また、"数字とカンマ以外を含む行は妥当ではない"という制約があるため、
            // 全ての要素が整数としてパース可能であるかを確認する必要がある。
            
            boolean isValid = true;
            if (parts.length == 0) {
                // これは既にtrimmedLine.isEmpty()でカバーされているはずだが、念のため
                isValid = false;
            } else {
                for (String part : parts) {
                    if (part.isEmpty()) {
                        // カンマが連続する場合や、前後にカンマがある場合（ただし末尾のカンマは除去済み）
                        // 例: "1,,2" -> splitの結果は {"1", "", "2"}
                        // 空の要素は許容されない（数字列が連続していない）
                        isValid = false;
                        break;
                    }
                    try {
                        // 数字列としてパースできるか確認
                        Integer.parseInt(part.trim());
                    } catch (NumberFormatException e) {
                        // 数字とカンマ以外を含む行は妥当ではない
                        isValid = false;
                        break;
                    }
                }
            }

            if (isValid) {
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
