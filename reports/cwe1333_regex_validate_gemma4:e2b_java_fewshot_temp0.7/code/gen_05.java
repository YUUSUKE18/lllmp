import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
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

            // 末尾のカンマを許容して分割する
            // 末尾のカンマがある場合、split(",")の結果の最後の要素は空文字列になる可能性があるため、
            // 厳密には末尾のカンマを処理する必要があるが、ここでは「1個以上の数字列がカンマで区切られて並んでいること」をチェックする。
            
            // 末尾のカンマを削除して分割を試みる
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }

            // カンマで分割
            String[] parts = content.split(",");
            
            // 妥当性の判定: 1個以上の数字列がカンマで区切られて並んでいること。
            // これは、分割された要素の総数が1以上であり、かつ、その要素がすべて数字列（空白を除いた後）で構成されていることを意味する。
            // 仕様では「数字列」が区切られていることなので、空でない要素が1つ以上あれば妥当と見なす。
            
            boolean isValid = false;
            for (String part : parts) {
                if (!part.trim().isEmpty()) {
                    // 各部分が数字のみで構成されているか確認
                    try {
                        Integer.parseInt(part.trim());
                        // 数字としてパースできればOK
                        if (isValid) {
                            // 既に1つ以上見つかっていれば、この行は妥当
                            break;
                        }
                    } catch (NumberFormatException e) {
                        // 数字としてパースできなかった場合、この行は妥当ではない
                        // ただし、仕様は「数字列がカンマで区切られて並んでいること」なので、
                        // 実際には全ての要素が整数である必要はないかもしれないが、
                        // 「数字列」が区切られているという文脈から、要素が整数であると解釈するのが自然。
                        // ここでは、空でない部分が整数であるかどうかに焦点を当てる。
                    }
                }
            }

            // より厳密に「1個以上の数字列がカンマで区切られて並んでいること」をチェックする。
            // 1. カンマで分割された結果、空でない要素が1つ以上あるか。
            // 2. その要素がすべて数字列であるか（空でないものについて）。
            
            if (parts.length > 0) {
                // 末尾のカンマが存在する場合、parts.lengthは元の要素数 + 1 になる可能性があるが、
                // 上記で末尾のカンマを削除しているので、parts.lengthが1以上であればOKとする。
                // ただし、"1," のようなケースを考慮する。
                
                // 例: "1,2" -> parts=["1", "2"], length=2, OK
                // 例: "1," -> content="1", parts=["1"], length=1, OK
                // 例: "," -> content="", parts=[""], length=1, parts[0]="" (空文字列)
                // 例: "abc" -> content="abc", parts=["abc"], parts[0]は数字ではない
                
                boolean allPartsAreNumbers = true;
                for (String part : parts) {
                    if (!part.trim().isEmpty()) {
                        try {
                            Integer.parseInt(part.trim());
                        } catch (NumberFormatException e) {
                            allPartsAreNumbers = false;
                            break;
                        }
                    }
                }

                if (allPartsAreNumbers) {
                    validLines++;
                }
            }
        }

        System.out.println("valid=" + validLines);
    }
}
