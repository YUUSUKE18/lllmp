import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int count = 0;
        String line;

        while (scanner.hasNextLine()) {
            line = scanner.nextLine();
            
            // 空行は無効
            if (line.isEmpty()) {
                continue;
            }

            // 前後の空白を除去した上で、数字とカンマ以外が含まれていないかチェック
            String trimmed = line.trim();
            if (!trimmed.matches("[0-9,]*")) {
                continue;
            }

            // 正規表現で整数列がカンマで区切られているか判定
            // ^[0-9]+(?:,[0-9]+)*$ あるいは [0-9]+$|[0-9]+,[0-9]+$ が有効
            if (trimmed.matches("^[0-9,]+$")) {
                int first = Character.isDigit(trimmed.charAt(0)) ? 1 : 0;
                int last = trimmed.length() > 0 && Character.isDigit(trimmed.charAt(trimmed.length() - 1)) ? 1 : 0;
                if (last == 0) {
                    // 末尾がカンマのみの場合（例: "1,," または ",," など、しかし数字がない場合は既に [0-9,]* のチェックで通過するか）
                    // ただし "1," は OK と仕様にある。
                    // 要件再確認："1 個以上の数字列"
                    if (trimmed.isEmpty()) {
                        continue;
                    }
                }
                
                // 具体的な数式として、最初の文字が数字か（[0-9]+）且つ末尾も数字か ([0-9]+$) を満たすか、
                // または "1," のような形でもOKとする必要がある。
                // 正規表現を以下のように定義: ^[0-9]+(?:,[0-9]+)*$ (複数) または^[0-9]+,$ (末尾カンマのみ許可)
                
                boolean isValid = true;
                // [0-9,]+ の中だけチェックするが、"1," は OK、",1" は NO, "1,,2" は NO, "1," は OK
                
                // より厳密な正規表現: ^[0-9]+(?:,[0-9]+)*$ なら末尾カンマは許可されない。
                // なので、正規表現を少し緩めるか、アルゴリズム的に検証する。
                
                if (trimmed.isEmpty()) {
                    isValid = false;
                } else {
                    // アルゴリズム的なチェック:
                    // "1," -> OK
                    // "1,2" -> OK
                    // "1,," -> NO (連続したカンマあり)
                    
                    boolean hasConsecutiveCommas = trimmed.contains(",");
                    if (!hasConsecutiveCommas) {
                        isValid = true;
                    } else {
                        // 連続しているカンマがないか確認
                        if (trimmed.matches("[0-9]+,[0-9]+(,[0-9]+)*$|[0-9]+$|[0-9]+,$")) {
                            isValid = true;
                        } else {
                            isValid = false;
                        }
                    }
                }

                // 正規表現の再確認: ^[0-9]+(?:,[0-9]+)*$ または ^[0-9]+,$
                // しかし "1,2,3" は OK, "1," は OK. "1,,2" は NO.
                // 正規表現式を直接記述する場合:
                String pattern = "^[0-9]+(?:,[0-9]+)*$|^[0-9]+,$";
                if (trimmed.matches(pattern)) {
                    count++;
                } else {
                    continue;
                }
            }
        }

        System.out.println("valid=" + count);
    }
}
