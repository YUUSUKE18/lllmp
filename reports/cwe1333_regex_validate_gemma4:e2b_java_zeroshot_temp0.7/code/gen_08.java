import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 行の前後の空白を無視する（trim()を使用）
            String trimmedLine = line.trim();

            // 1. 空行の判定
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // 2. 数字とカンマ以外を含む行の判定
            // 数字(0-9)とカンマ(,)のみで構成されているかを確認する
            boolean isValidCharacters = true;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!((c >= '0' && c <= '9') || c == ',')) {
                    isValidCharacters = false;
                    break;
                }
            }

            if (!isValidCharacters) {
                continue;
            }

            // 3. 妥当性の判定 (1個以上の数字列がカンマで区切られているか)
            // 末尾のカンマは許容される。
            
            // 最後の文字がカンマの場合、その直前までが数字列で構成されているか、
            // またはカンマで区切られた数字列の集合であるかをチェックする。
            
            // 妥当な行は、少なくとも1つのカンマを含んでいるか、
            // またはカンマを含まずに数字のみで構成されていても（例: "123"）、
            // それが「1個以上の数字列がカンマで区切られて並んでいる」という条件を満たすか。
            
            // 仕様：「1 個以上の数字列がカンマで区切られて並んでいることです。末尾のカンマは許容します。」
            // これは、カンマで区切られた複数の数値が存在することを意味します。
            
            // 1. カンマが含まれている場合、カンマで分割した要素がすべて数字であるか確認する。
            String[] parts = trimmedLine.split(",");
            
            boolean hasMultipleNumbers = false;
            
            for (String part : parts) {
                // part.trim()は、カンマの前後にある空白（もしあれば）を考慮するが、
                // trim()で既に処理済みなので、ここでは数字のみのチェックを行う。
                if (!part.isEmpty()) {
                    // partがすべて数字（または空文字列だが、splitで空文字列は通常発生しない）であるか確認
                    if (part.matches("\\d+")) {
                        // 数字列が見つかった
                        hasMultipleNumbers = true;
                    } else {
                        // カンマで区切られた要素の中に数字以外のものが混入している場合
                        // 仕様の「数字列がカンマで区切られて並んでいる」を満たさない
                        // ただし、この判定は「数字とカンマ以外を含む行」のチェックで既に網羅されているため、
                        // ここでは「各部分が数字列である」ことを確認する。
                        // 既に isValidCharacters で数字とカンマ以外がないことが保証されているため、
                        // partが空でない限り、それは数字列であるか、あるいはカンマのみで構成されていることになる。
                        
                        // 例: "1,,2" -> parts = ["1", "", "2"]。空文字列は除外したい。
                        if (!part.isEmpty() && !part.matches("\\d+")) {
                             // このケースは、入力が "1,a,2" のようなケースを想定するが、
                             // 前のチェックで既に "a" は除外されているはず。
                             // ここでは、カンマで区切られた要素が「数字列」であることを確認する。
                             // 既にisValidCharactersで数字とカンマ以外がないため、partが空でなければ数字列である。
                        }
                    }
                }
            }

            // 妥当性の最終判定: 1個以上の数字列がカンマで区切られているか。
            // これは、少なくとも1つのカンマが存在し、かつ、そのカンマで区切られた部分が意味のある数値である必要がある。
            // または、カンマが存在しない場合（例: "123"）も、これは「1個の数字列」と解釈できるが、「1個以上の数字列がカンマで区切られて」という条件に厳密に従う。
            
            // 最もシンプルな解釈: カンマが存在し、その結果として少なくとも2つの要素（または1つの要素と末尾のカンマ）があること。
            // または、カンマで区切られた要素が全て数字であること。
            
            // 末尾のカンマは許容されるため、trimしてカンマを削除して再度チェックする。
            String content = trimmedLine.replaceAll(",", "");
            
            if (!content.isEmpty()) {
                // カンマで区切られた結果として、少なくとも2つの数値が存在する場合（カンマが含まれている場合）
                // または、カンマがなくても、それが数字列である場合。
                
                // 妥当性の定義を「カンマで区切られた複数の数字列が存在すること」と解釈する。
                // 複数の数字列が存在するためには、少なくとも1つのカンマが必要。
                if (trimmedLine.contains(",")) {
                    // カンマが含まれていて、かつ、そのカンマで区切られた要素が全て数字列であるかを確認する。
                    boolean allPartsAreDigits = true;
                    for (String part : parts) {
                        if (!part.isEmpty() && !part.matches("\\d+")) {
                            allPartsAreDigits = false;
                            break;
                        }
                    }
                    if (allPartsAreDigits) {
                        validCount++;
                    }
                } else {
                    // カンマが含まれていない場合（例: "123"）
                    // これは「1個の数字列」であり、「1個以上の数字列がカンマで区切られて」という条件を満たさないと解釈する。
                    // しかし、もし仕様が「数字列であること」のみを要求するなら、これは妥当とすべき。
                    // 厳密に「カンマで区切られて」を要求するため、カンマがない場合は不適と判断する。
                    // -> 妥当としない（区切りがないため）
                }
            }
        }

        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
