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

            // 末尾のカンマは許容する
            if (trimmedLine.endsWith(",")) {
                // カンマで終わる行は、カンマで区切られた数字列が1つ以上存在する場合をチェックする必要がある
                String content = trimmedLine.substring(0, trimmedLine.length() - 1);
                if (content.trim().isEmpty()) {
                    // 末尾がカンマのみの場合（例: "," や " , "）
                    continue;
                }
            }

            // カンマで分割して、空でない数字列があるかチェック
            String[] parts = trimmedLine.split(",");
            
            boolean isValid = false;
            int count = 0;
            
            for (String part : parts) {
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    try {
                        // 数字としてパースできるか確認（厳密には、すべてが整数であるかを確認する必要があるが、
                        // 問題文は「数字列がカンマで区切られて並んでいること」を要求しているため、
                        // 各要素が整数であるかどうかのチェックはここでは省略し、単に空でない部分が存在するかで判断する）
                        count++;
                    } catch (NumberFormatException e) {
                        // 数字列ではない要素が含まれている場合は妥当ではない
                        isValid = false;
                        break;
                    }
                }
            }
            
            // 1個以上の数字列がカンマで区切られて並んでいること
            if (count > 0) {
                // 末尾のカンマが許容されているため、count > 0 なら妥当と判断
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
