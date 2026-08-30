import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視してチェックするために、トリムする
            String trimmedLine = line.trim();
            
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // カンマで分割する。末尾のカンマも許容しつつ、数字列が1つ以上あるか確認する
            // ただし、仕様では「1 個以上の数字列がカンマで区切られて並んでいる」こと、および「末尾のカンマは許容する」とある。
            // ここでは、カンマで分割した結果が空でない要素を含んでいるかをチェックする。
            
            // 末尾のカンマを削除してから分割を試みることで、末尾のカンマ許容の要件を満たすようにする。
            String processedLine = trimmedLine;
            if (processedLine.endsWith(",")) {
                processedLine = processedLine.substring(0, processedLine.length() - 1);
            }
            
            // さらに、数字とカンマ以外の文字が含まれていないかチェックする。
            // 正規表現を使って、数字とカンマのみで構成されているかを確認する。
            if (processedLine.matches("^[0-9,]*$")) {
                // カンマで分割する
                String[] parts = processedLine.split(",");
                
                // 妥当であるためには、少なくとも1個の数字列が存在する必要がある。
                // 空でない要素が存在すれば、それは数字列（カンマ区切り）であると見なす。
                boolean hasNumbers = false;
                for (String part : parts) {
                    if (!part.trim().isEmpty()) {
                        // 厳密には、各部分が整数である必要はないが、「数字列が並んでいる」ことを確認する。
                        // ここでは、非空のトークンがあれば、それは数字列としてカウントする。
                        hasNumbers = true;
                        break;
                    }
                }
                
                if (hasNumbers) {
                    validLines++;
                }
            }
        }

        System.out.println("valid=" + validLines);
    }
}
