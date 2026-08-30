import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視するため、trim()を使用
            String trimmedLine = line.trim();
            
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない (1個以上の数字列がカンマで区切られている必要がある)
                continue;
            }

            // 末尾のカンマを許容するため、末尾のカンマを取り除く
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }

            // カンマで分割して、各要素が整数のみで構成されているか確認する
            String[] parts = content.split(",");
            
            boolean isValid = true;
            for (String part : parts) {
                if (part.isEmpty()) {
                    // カンマが連続している場合や、空の要素が生じた場合（例: ",1,2" の後の空文字列）
                    // この仕様では「1個以上の数字列がカンマで区切られて並んでいること」が重要。
                    // 空の要素が区切りとして許容されるかどうかの解釈が必要だが、
                    // 単にカンマ区切りの整数列として扱うため、各部分が空でないことを確認する。
                    // ただし、入力が "1," や ",1" のような形式の場合、splitで空文字列が生じる。
                    // "1," の場合、contentは"1"，partsは{"1"}: OK
                    // "," の場合、contentは""、これは先にチェックで除外される。
                    // "" が生じた場合は、それは数字列ではないため不正とする。
                    if (part.isEmpty()) {
                        isValid = false;
                        break;
                    }
                } else {
                    try {
                        // 数字としてパースできるか確認
                        Integer.parseInt(part);
                    } catch (NumberFormatException e) {
                        // 数字以外の文字が含まれていた場合
                        isValid = false;
                        break;
                    }
                }
            }

            if (isValid) {
                // 1個以上の数字列がカンマで区切られていることが保証される。
                // (空行チェック、数字とカンマ以外を含むチェック、分割後の要素チェックでカバー)
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
