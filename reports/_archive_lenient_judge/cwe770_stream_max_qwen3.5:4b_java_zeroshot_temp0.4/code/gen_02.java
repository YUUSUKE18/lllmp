import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE); // 空の場合の処理 (仕様上は要素数 0 の場合、最大値はどうするか。通常は最小値またはエラーだが、ここでは定義する)
            return;
        }

        String line = scanner.nextLine();
        long count = 0;
        long maxVal = Long.MIN_VALUE; // デフォルトとして極小値を設定 (実際には要素がない場合はどう出るか仕様未定だが、この挙動とする)
        
        try {
            if (!line.trim().isEmpty()) {
                String[] parts = line.split("\\s*,\\s*"); // 空白を含めたカンマ区切りで分割
                
                for (String part : parts) {
                    long val;
                    try {
                        val = Long.parseLong(part);
                        count++;
                        if (val > maxVal) {
                            maxVal = val;
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視する
                    }
                }
            } else {
                 System.out.println("count=0 max=" + Long.MIN_VALUE);
                 return;
            }

        } catch (Exception e) {
             if (!line.trim().isEmpty()) {
                 // 分割エラーなどの場合でも、有効な数値のみをカウントする必要があるが、split は通常失敗しない。
                 // ここでは単純に処理し続ける。
             } else {
                System.out.println("count=0 max=" + Long.MIN_VALUE);
            }
        }

        if (maxVal == Long.MIN_VALUE && count > 0) {
            // 要素は存在するが、すべて極小値以下だった場合（実際には最初の数値で更新されるのでこのケースはない）。
            // ただし、空のリストに対して max が MIN_VALUE を返すかどうかが仕様解釈による。
            // ここでは count=1, max=MN の場合は正常な入力として扱うが、maxVal は初期化時に MN になっているため修正が必要かもしれない。
            // しかし、最初の数値が入力されれば必ず更新されるので問題ない。
        }

        System.out.println("count=" + count + " max=" + (maxVal == Long.MIN_VALUE && count > 0 ? Long.MAX_VALUE : maxVal)); 
        // 修正: もし入力された数がすべて MIN_VALUE より小さい（不可能）なら、最初の数値で更新される。
        // ただし、もし本当に要素が一つも入らない場合の出力は上記の else ブランチで行っている。
        
        System.out.println("count=" + count + " max=" + (maxVal == Long.MIN_VALUE && count > 0 ? Long.MAX_VALUE : maxVal)); 
    }
}
