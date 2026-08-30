import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 前後の空白を除去し、空行も処理として含む（ただし空行は「妥当ではない」）
            // ただし、仕様では「空行...は妥当ではありません」とあるので、空文字列の場合は false を返す
            if (line.isEmpty()) {
                continue; 
            }

            // 正規表現で判定
            // [0-9]+ は一つ以上の整数を表す（正の整数を想定し、0 も含める）
            // カンマ区切りなので '0,1' や '0,1,' が許容される
            // 「数字とカンマ以外を含む行は妥当ではありません」 => 文字が [0-9,] のみでなければならない
            // ただし、末尾のカンマは許容するため、最終的に空でないか確認する必要があるかもしれないが、
            // 正規表現 ^[\d,]*$ で「数字とカンマ以外なし」を判定すればよい。
            // さらに「1 個以上の数字列」とあるので、少なくとも一度 \d が出現していなければならない。
            
            String trimmed = line.trim();
            if (trimmed.isEmpty()) {
                continue; // 空行は処理ループでスキップ済みだが、ここでは安全のために再度チェック
            }

            if (trimmed.matches("[0-9,]+")) {
                // 数字とカンマ以外の文字がない場合、かつ「1 個以上の数字列」があるか確認
                // [0-9,]+ でマッチしたものはすべて数字またはカンマなので、\d が少なくとも 1 回出現すれば OK
                if (trimmed.matches("[0-9]+")) {
                    validCount++;
                }
            }
        }

        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
