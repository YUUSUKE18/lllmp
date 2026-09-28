import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 行の前後の空白を無視する（trim()を使用）
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマが許容されるため、行全体をチェックする
            // 妥当な行は「1個以上の数字列がカンマで区切られて並んでいる」こと。
            // これは、カンマで区切られた文字列が、少なくとも1つ以上の数字列を含んでいることを意味する。
            
            // 1. 末尾のカンマを取り除く（もしあれば）
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }

            // 2. カンマで分割する
            String[] parts = content.split(",");

            // 3. 各部分が数字列であることを確認し、少なくとも1つ存在するか確認する
            boolean isValid = false;
            for (String part : parts) {
                // 空文字列でないことを確認
                if (!part.isEmpty()) {
                    // その部分がすべて数字のみで構成されているか確認
                    try {
                        Long.parseLong(part.trim());
                        isValid = true;
                        break; // 1つでも有効な数字列があればOK
                    } catch (NumberFormatException e) {
                        // 数字以外の文字が含まれている場合は無効
                        isValid = false; // この行全体が無効になる可能性があるが、ループを続ける
                    }
                }
            }

            // 妥当性の最終判定: 
            // 1. 少なくとも1つの非空の要素が存在し、
            // 2. その要素がすべて数字であること。
            
            // 仕様の解釈を再確認: 「1 個以上の数字列がカンマで区切られて並んでいること」
            // 例: "1,2,3" -> 3つの数字列。妥当。
            // 例: "1," -> 1つの数字列とカンマ。妥当。
            // 例: "," -> 空の要素。妥当ではない。
            // 例: "abc,1" -> 無効。

            // 再度、splitの結果に基づいて判定する。
            // 妥当な行は、カンマで区切られた要素の中に、少なくとも1つの有効な整数列が含まれていること。
            
            boolean finalIsValid = false;
            if (parts.length > 0) {
                for (String part : parts) {
                    String trimmedPart = part.trim();
                    if (!trimmedPart.isEmpty()) {
                        try {
                            // 数字としてパース可能か試みる
                            Long.parseLong(trimmedPart);
                            finalIsValid = true;
                            break; // 1つでもOK
                        } catch (NumberFormatException e) {
                            // 数字以外が含まれている場合は、その行全体は無効（ただし、後続の要素が数字であっても、
                            // 仕様は「数字列がカンマで区切られて並んでいる」ことを要求しているため、
                            // 混在する場合は厳しく判定すべき）
                            // ここでは、要素が数字でないものがあれば、その行は妥当ではないと判断する。
                            // ただし、末尾のカンマの処理を考慮する必要がある。
                        }
                    }
                }
            }
            
            // 最終的な妥当性の判定ロジックを簡略化し、仕様に厳密に従う。
            // 「1 個以上の数字列がカンマで区切られて並んでいる」
            // これは、カンマで区切られた要素が、すべて有効な整数列で構成されていることを意味する。
            
            boolean strictIsValid = true;
            if (parts.length == 0) {
                // これは空行で既に除外されているはずだが念のため
                strictIsValid = false;
            } else {
                for (String part : parts) {
                    String trimmedPart = part.trim();
                    if (trimmedPart.isEmpty()) {
                        // 空の要素（例: ",," や ",1" の後の空要素）は許容されない
                        strictIsValid = false;
                        break;
                    }
                    try {
                        Long.parseLong(trimmedPart);
                    } catch (NumberFormatException e) {
                        // 数字以外の文字が含まれている場合は無効
                        strictIsValid = false;
                        break;
                    }
                }
            }


            if (strictIsValid) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
