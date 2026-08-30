import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            // 前後の空白をトリミング
            line = line.trim();
            
            // 空行の場合は不成立（ただし、仕様「空行...は妥当ではありません」とあるので空文字列も除く）
            if (line.isEmpty()) {
                continue; 
            }

            // 数式とカンマ以外が含まれているか確認し、含まれていないかチェック
            String cleaned = line.replaceAll("[^0-9,]", "");
            if (!cleaned.equals(line)) {
                continue; // 数字とカンマ以外が含まれている行
            }

            // カンマ区切りの整数列として妥当か判定
            try {
                String[] parts = cleaned.split(",");
                for (String part : parts) {
                    if (part.isEmpty()) {
                        // 空部分が発生した場合（連続するカンマ、末尾のカンマが処理で空文字になるケース）
                        // 仕様「末尾のカンマは許容します」なので、splitの結果に空文字が含まれる場合は不成立？
                        // "1,2," は split(",") で ["1", "2", ""] を返す。これは妥当か？
                        // Java の split が末尾の区切りで空文字列を除外するわけではないが、デフォルトは空文字列を含む。
                        // 厳密に「整数列」として捉えるなら、各要素が数値である必要がある。
                        // "1,,2" は ["1", "", "2"] → "" が存在する
                        if ("".equals(part)) {
                            continue; // 不成立
                        }
                    }
                }
                
                // ここまで来れば全ての要素が整数列
                validCount++;
            } catch (Exception e) {
                continue;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
